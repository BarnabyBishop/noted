import express from 'express';
import jwt from 'jsonwebtoken';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
const router = express.Router();

const tokenLength = 10000; // in ms

// Calling as a function so the GraphQL schema is available
export default (data, jwtOptions) => {
    router.get('/', (req, res) => {
        res.send(200);
    });

    router.post('/api/login', async (req, res) => {
        const { email, password } = req.body;

        const user = await data.User.findOne({ where: { email, password } });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password hash with password (to do)..
        if (user.password === password) {
            const payload = { id: user.id };
            const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 10 });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });

    // Dev tools for GQL debug, only available on development due to lack of security
    if (process.env.NODE_ENV === 'development') {
        router.get('/graphiql', graphiqlExpress({ endpointURL: '/api/graphiql' }));
        router.use('/api/graphiql', graphqlExpress({ schema: data.schema }));
    }

    return router;
};

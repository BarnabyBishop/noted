import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import createToken from '../utils/create-token';

const router = express.Router();

// Calling as a function so the GraphQL schema is available
export default (data, jwtOptions) => {
    router.get('/', (req, res) => {
        res.send(200);
    });

    router.post('/api/login', async (req, res) => {
        const { email, password } = req.body;

        const user = await data.User.findOne({ where: { email, password } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password hash with password (to do)..
        if (user.password === password) {
            const token = createToken(user, jwtOptions);
            res.set('auth-token', token);
            return res.status(200).send();
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });

    // Dev tools for GQL debug, only available on development due to lack of security
    if (process.env.NODE_ENV === 'development') {
        router.get('/graphiql', graphiqlExpress({ endpointURL: '/api/graphiql' }));
        router.use('/api/graphiql', graphqlExpress({ schema: data.schema }));
    }

    return router;
};

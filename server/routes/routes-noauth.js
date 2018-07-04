import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { graphiqlExpress } from 'apollo-server-express';
const router = express.Router();

// Calling as a function so the GraphQL schema is available
export default (data, jwtOptions) => {
    router.get('/', (req, res) => {
        res.send(200);
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        const user = await data.User.findOne({ where: { email, password } });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
        }

        // Will hash eventually..
        if (user.password === password) {
            const payload = { id: user.id };
            console.log(payload);
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });

    router.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({ message: 'Success! You can not see this without a token' });
    });

    router.get('/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }));

    return router;
};

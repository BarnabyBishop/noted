import express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import passport from 'passport';
import saveListItemRoute from './save-list-item-route';
import createToken from '../utils/create-token';

const router = express.Router();

// Calling as a function so the GraphQL schema is available
export default (data, jwtOptions) => {
    // All API routes require auth.
    // Auth middleware first
    router.use(passport.authenticate('jwt', { session: false }));

    // After auth add a token to headers with updated expiry
    router.use((req, res, next) => {
        const token = createToken(req.user, jwtOptions);
        res.set('auth-token', token);
        next();
    });

    // This needs to be removed and converted to gql mutations
    router.post('/api/save-list-item', (req, res) => saveListItemRoute(req, res, data));
    router.use('/api/graphql', graphqlExpress({ schema: data.schema }));

    router.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({ message: 'Success! You can not see this without a token' });
    });

    return router;
};

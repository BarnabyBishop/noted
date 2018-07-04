import express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import passport from 'passport';
import saveListItemRoute from './save-list-item-route';

const router = express.Router();

// Calling as a function so the GraphQL schema is available
export default data => {
    // All API routes require auth
    router.use(passport.authenticate('jwt', { session: false }));

    // This needs to be removed and converted to gql mutations
    router.post('/api/save-list-item', saveListItemRoute);
    router.use('/api/graphql', graphqlExpress({ schema: data.schema }));

    return router;
};

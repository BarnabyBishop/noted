import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import saveListItemRoute from './save-list-item-route';

const router = express.Router();

// Calling as a function so the GraphQL schema is available
export default data => {
    router.get('/', (req, res) => {
        res.send(200);
    });

    router.post('/api/save-list-item', saveListItemRoute);

    router.use('/api/graphql', bodyParser.json(), graphqlExpress({ schema: data.schema }));
    router.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' })); // if you want GraphiQL enabled

    return router;
};

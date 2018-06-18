import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

const router = express.Router();

// import bodyParser from 'koa-bodyparser';
// import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import getListRoute from './get-list-route';
import getTagsRoute from './get-tags-route';
import saveListItemRoute from './save-list-item-route';

// const router = require('koa-router')();

// Calling as a function so the GraphQL schema is available
export default data => {
    // middleware that is specific to this router
    // router.use(function timeLog(req, res, next) {
    //     console.log('Time: ', Date.now());
    //     next();
    // });
    // // define the home page route
    // router.get('/', function(req, res) {
    //     res.send('Birds home page');
    // });
    // // define the about route
    // router.get('/about', function(req, res) {
    //     res.send('About birds');
    // });

    router.get('/', (req, res) => {
        res.send(200);
    });
    // router.get('/api/get-list', getListRoute);
    // router.get('/api/get-tags', getTagsRoute);
    router.post('/api/save-list-item', saveListItemRoute);
    // // koaBody is needed just for POST.
    // router.post('/api/graphql', bodyParser(), graphqlKoa({ schema: data.schema }));
    // router.get('/api/graphql', graphqlKoa({ schema: data.schema }));

    // router.get('/api/graphiql', graphiqlKoa({ endpointURL: '/api/graphql' }));

    router.use('/api/graphql', bodyParser.json(), graphqlExpress({ schema: data.schema }));
    router.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' })); // if you want GraphiQL enabled

    return router;
};

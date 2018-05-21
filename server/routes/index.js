import bodyParser from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import getListRoute from './get-list-route';
import getTagsRoute from './get-tags-route';
import saveListItemRoute from './save-list-item-route';

const router = require('koa-router')();

export default data => {
    router.get('/', (ctx, next) => {
        ctx.send(200);
    });
    router.get('/api/get-list', getListRoute);
    router.get('/api/get-tags', getTagsRoute);
    router.post('/api/save-list-item', saveListItemRoute);
    // koaBody is needed just for POST.
    router.post('/graphql', bodyParser(), graphqlKoa({ schema: data.schema }));
    router.get('/graphql', graphqlKoa({ schema: data.schema }));

    router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

    return router;
};

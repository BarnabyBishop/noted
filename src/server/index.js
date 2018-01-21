/*************************/
/*** Initialise server ***/
/*************************/
require('dotenv').config({ silent: true });
import Koa from 'koa';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import chalk from 'chalk';
import { assign } from 'lodash';
import router from './routes';
import initData from './data';
import error from './middleware/error';
import auth from './middleware/auth';

module.exports = () => {
    const DEFAULT_NODE_PORT = process.env.NODE_PORT || 4000;
    const data = initData();

    const app = new Koa();

    assign(app.context, { data });

    // body parser
    app.use(bodyParser());

    // Setup views
    app.use(views('./public'));

    // basic error handling
    app.use(error);

    app.use(auth);

    app.use(router.routes());

    app.listen(DEFAULT_NODE_PORT, () => {
        console.log(chalk.green(`API server listening on ${DEFAULT_NODE_PORT}.`));
    });
};

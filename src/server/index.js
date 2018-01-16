/*************************/
/*** Initialise server ***/
/*************************/
import Koa from 'koa';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import chalk from 'chalk';
import { assign } from 'lodash';
import router from './routes';
import initData from './data';

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
    app.use(async (ctx, next) => {
        try {
            await next(); // next is now a function
        } catch (err) {
            console.log(chalk.red('Koa reported error:'));
            ctx.body = err.name + ': ' + err.message;
            ctx.status = err.status || 500;
            console.log(err);
            console.error(chalk.red(err));
        }
    });

    app.use(router.routes());

    app.listen(DEFAULT_NODE_PORT, () => {
        console.log(chalk.green(`API server listening on ${DEFAULT_NODE_PORT}.`));
        // startClient();
    });
};

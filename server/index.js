/*************************/
/*** Initialise server ***/
/*************************/
require('dotenv').config({ silent: true });
import Koa from 'koa';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import chalk from 'chalk';
import buildRouter from './routes';
import initData from './data';
import error from './middleware/error';
import auth from './middleware/auth';

const DEFAULT_NODE_PORT = process.env.NODE_PORT || 4321;
const data = initData(process.env.DB_HOST);

const app = new Koa();

const router = buildRouter(data);

Object.assign(app.context, {
    data,
    authToken: process.env.AUTH_TOKEN
});

// body parser
app.use(bodyParser());

// Setup views
app.use(views('./public'));

// basic error handling
app.use(error);

app.use(auth);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(DEFAULT_NODE_PORT, () => {
    console.log(chalk.green(`API server listening on ${DEFAULT_NODE_PORT}.`));
});

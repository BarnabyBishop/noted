/*************************/
/*** Initialise server ***/
/*************************/
require('dotenv').config({ silent: true });
import express from 'express';

// import Koa from 'koa';
// import views from 'koa-views';
// import bodyParser from 'koa-bodyparser';
import chalk from 'chalk';
import getRouter from './routes';
import initData from './data';
// import error from './middleware/error';

const DEFAULT_NODE_PORT = process.env.NODE_PORT || 4321;
const data = initData(process.env.DB_HOST);

const app = express();

const router = getRouter(data);

app.set('data', data);
// Object.assign(app.context, {
//     data
// });

// body parser
// app.use(bodyParser());

// basic error handling
// app.use(error);

app.use(router);

app.listen(DEFAULT_NODE_PORT, () => console.log(chalk.green(`📡 API server listening on ${DEFAULT_NODE_PORT}.`)));

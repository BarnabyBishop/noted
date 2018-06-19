/*************************/
/*** Initialise server ***/
/*************************/
require('dotenv').config({ silent: true });
import express from 'express';
import chalk from 'chalk';
import getRouter from './routes';
import initData from './data';

const DEFAULT_NODE_PORT = process.env.NODE_PORT || 4321;
const data = initData(process.env.DB_HOST);

const app = express();

const router = getRouter(data);

app.set('data', data);

app.use(router);

app.listen(DEFAULT_NODE_PORT, () => console.log(chalk.green(`📡 API server listening on ${DEFAULT_NODE_PORT}.`)));

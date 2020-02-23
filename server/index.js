/*************************/
/*** Initialise server ***/
/*************************/
require('dotenv').config({ silent: true });
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import getAuthRouter from './routes/routes-auth';
import getUnAuthRouter from './routes/routes-unauth';
import initData from './data';

const DEFAULT_NODE_PORT = process.env.NODE_PORT || 4321;
const data = initData({ host: process.env.DB_HOST, username: process.env.DB_USERNAME, password: process.env.DB_PASSWORD, database: process.env.DATABASE });

const app = express();

app.use(bodyParser.json());

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.TOKEN_SECRET;

passport.use(
    new Strategy(jwtOptions, async (jwtPayload, next) => {
        const user = await data.User.findOne({ where: { id: jwtPayload.userId } });
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    })
);

app.use(passport.initialize());

const noAuthRouter = getUnAuthRouter(data, jwtOptions);
const authRouter = getAuthRouter(data, jwtOptions);

app.use(noAuthRouter);
app.use(authRouter);

app.set('data', data);

app.listen(DEFAULT_NODE_PORT, () => console.log(chalk.green(`📡 API server listening on ${DEFAULT_NODE_PORT}.`)));

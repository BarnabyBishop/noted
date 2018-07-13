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
import getNoAuthRouter from './routes/routes-noauth';
import initData from './data';

const DEFAULT_NODE_PORT = process.env.NODE_PORT || 4321;
const data = initData(process.env.DB_HOST);

const app = express();

app.use(bodyParser.json());

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// Get this from config and make real secret
jwtOptions.secretOrKey = process.env.TOKEN_SECRET;

passport.use(
    new Strategy(jwtOptions, async (jwtPayload, next) => {
        // going to database required? if JWT is valid should just check expiry..
        const user = await data.User.findOne({ where: { id: jwtPayload.id } });
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    })
);

app.use(passport.initialize());

const noAuthRouter = getNoAuthRouter(data, jwtOptions);
const authRouter = getAuthRouter(data);

app.use(noAuthRouter);
app.use(authRouter);

app.set('data', data);

app.listen(DEFAULT_NODE_PORT, () => console.log(chalk.green(`📡 API server listening on ${DEFAULT_NODE_PORT}.`)));

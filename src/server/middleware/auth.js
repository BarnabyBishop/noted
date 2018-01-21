require('dotenv').config({ silent: true });
const token = process.env.AUTH_TOKEN;

/* A poor man's authentication */
export default async (ctx, next) => {
    if (!ctx.request.query || !ctx.request.query.token || ctx.request.query.token !== token) {
        ctx.throw(403);
    } else {
        await next(); // next is now a function
    }
};
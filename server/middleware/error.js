import chalk from 'chalk';

export default async (ctx, next) => {
    try {
        await next(); // next is now a function
    } catch (err) {
        console.log(chalk.red('Koa reported error:'));
        ctx.body = err.name + ': ' + err.message;
        ctx.status = err.status || 500;
        console.log(err);
        console.error(chalk.red(err));
    }
};
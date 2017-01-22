import fs from 'fs';

const template = fs.readFileSync('public/index.html', 'utf8');

export default async function (ctx, next) {
    const { data } = ctx;
    const listItems = await data.ListItem.findAll();
    const dataModel = { list: listItems };
    const content = template.replace('{{initialState}}', JSON.stringify(dataModel));
    ctx.body = content;
};
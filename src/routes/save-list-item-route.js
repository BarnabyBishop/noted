export default async function (ctx, next) {
    const { id, text, height, sortOrder, created, completed } = ctx.request.body;
    console.log('body', ctx.request.body);
    console.log('saving...', { id, text, height, sortOrder, created, completed });
    if (typeof id === 'undefined') {
        throw new Error('You must provide an ID.');
    }

    const { data } = ctx;
    const listItem = await data.ListItem.upsert({ id, text, height, sortOrder, created, completed }, { where: { id }});
    console.log('saved!');
    ctx.body = listItem;
};
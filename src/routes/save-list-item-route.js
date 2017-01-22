export default async function (ctx, next) {
    const { id, text, height, sortOrder, created, completed } = ctx.request.body;

    console.log({ id, text, height, sortOrder, created, completed });
    if (typeof id === 'undefined') {
        throw new Error('You must provide an ID.');
    }

    const { data } = ctx;
    const listItem = await data.ListItem.update({ id, text, height, sortOrder, created, completed }, { where: { id }});
    ctx.body = listItem;
};
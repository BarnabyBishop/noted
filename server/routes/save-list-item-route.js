export default async function(ctx, next) {
    const { id, title, text, height, sortOrder, created, completed } = ctx.request.body;

    if (typeof id === 'undefined') {
        throw new Error('You must provide an ID.');
    }

    // Save ListItem
    const { data } = ctx;
    await data.ListItem.upsert({ id, title, text, height, sortOrder, created, completed }, { where: { id } });

    // Load updated/inserted ListItem
    const listItem = await data.ListItem.findById(id);
    ctx.body = listItem;
}

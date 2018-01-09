export default async function(ctx, next) {
    const { id, title, text, height, sortOrder, created, completed } = ctx.request.body;

    if (typeof id === 'undefined') {
        throw new Error('You must provide an ID.');
    }

    const { data } = ctx;
    const listItem = await data.ListItem.upsert(
        { id, title, text, height, sortOrder, created, completed },
        { where: { id } }
    );

    ctx.body = listItem;
}

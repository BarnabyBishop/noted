export default async function(ctx, next) {
    const { data } = ctx;
    const listItems = await data.ListItem.findAll();
    const dataModel = { list: listItems };
    ctx.body = dataModel;
}

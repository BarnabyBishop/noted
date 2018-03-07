export default async function (ctx, next) {
    const { data } = ctx;
    const tags = await data.sequelize.query('select distinct regexp_matches(text, \'\\#\\w+\', \'g\') as tags from list_items where text ~ \'\\#\\w+\' order by tags', { type: data.sequelize.QueryTypes.SELECT });

    // This regexp_matches returns a text array which gives us an unfriendly object of nested arrays. Flatten them out
    const flatTags = [];
    tags.forEach(item => {
        Array.prototype.push.apply(flatTags, item.tags);
    });

    const dataModel = { tags: flatTags };
    ctx.body = dataModel;
}

export default async function(req, res, data) {
    const { id, title, text, height, sortOrder, created, completed } = req.body;

    if (typeof id === 'undefined') {
        throw new Error('You must provide an ID.');
    }

    // Save ListItem
    await data.ListItem.upsert(
        { id, title, text, height, sortOrder, created, completed, userId: req.user.dataValues.id },
        { where: { id } }
    );

    // Load updated/inserted ListItem
    const listItem = await data.ListItem.findById(id);

    res.send(listItem);
}

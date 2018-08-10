export default async function(req, res) {
    const data = req.app.get('data');
    const listItems = await data.ListItem.findAll();
    const dataModel = { list: listItems };
    res.send(dataModel);
}

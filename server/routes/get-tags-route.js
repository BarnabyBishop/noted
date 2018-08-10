/*
\#(\w|\S)+

https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canPlayType#Return_value

#an-actual-one

#this should only have the first

#another/legit/one

#9press

#.something

this has a #tag in the middle

what about #one #tw0

https://jaredforsyth.com/posts/a-reason-react-tutorial/#10-defining-a-component
*/

export default async function(req, res) {
    const data = req.app.get('data');
    const tags = await data.sequelize.query(
        // So close, only match a word boundary, then # then not ^#. or whitespace then match a word, - or /
        // Overly matches https://url.com/#10-defining-a-component
        "select distinct regexp_matches(text, '\\Y\\#[^\\#\\s.\\][\\w\\-\\/]+', 'g') as tags from list_items where text ~ '\\Y\\#[^\\#\\s.\\][\\w\\-\\/]+' order by tags",
        { type: data.sequelize.QueryTypes.SELECT }
    );

    // This regexp_matches returns a text array which gives us an unfriendly object of nested arrays. Flatten them out
    const flatTags = [];
    tags.forEach(item => {
        Array.prototype.push.apply(flatTags, item.tags);
    });

    const dataModel = { tags: flatTags };
    res.send(dataModel);
}

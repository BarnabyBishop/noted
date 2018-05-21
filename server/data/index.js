import Sequelize from 'sequelize';
import moment from 'moment';
import { makeExecutableSchema } from 'graphql-tools';

export default dbHost => {
    const sequelize = new Sequelize(dbHost);
    const ListItem = sequelize.define('list_item', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        sortOrder: {
            type: Sequelize.INTEGER,
            field: 'sort_order'
        },
        created: {
            type: Sequelize.DATE
        },
        completed: {
            type: Sequelize.DATE
        },
        title: {
            type: Sequelize.TEXT
        },
        text: {
            type: Sequelize.TEXT
        },
        height: {
            type: Sequelize.INTEGER
        }
    });

    // The GraphQL schema in string form
    const typeDefs = `
        type ListItem {
            id: String
            sortOrder: Int
            created: String
            completed: String
            title: String
            text: String
            height: Int
            createdAt: String
            updatedAt: String
        }
        type Tag {
            tag: String
        }
        type Query {
            allItems: [ListItem]
            itemBySearch(term: String): [ListItem],
            itemByDate(date: String): [ListItem],
            tags: [Tag]
        }
        `;

    // The resolvers
    const resolvers = {
        Query: {
            allItems(_, args) {
                return ListItem.findAll();
            },
            itemBySearch(_, args) {
                return ListItem.findAll({
                    where: { $or: [{ title: { $ilike: `%${args.term}%` } }, { text: { $ilike: `%${args.term}%` } }] }
                });
            },
            itemByDate(_, args) {
                const startOfDay = moment(args.date).startOf('day');
                const endOfDay = moment(args.date).endOf('day');
                return ListItem.findAll({
                    where: {
                        $or: [
                            { created: { $gte: startOfDay, $lt: endOfDay } },
                            [{ created: { $lte: startOfDay } }, { completed: { $gte: endOfDay } }],
                            [{ created: { $lte: startOfDay } }, { completed: null }]
                        ]
                    }
                });
            },
            async tags(_, args) {
                const tags = await ListItem.sequelize.query(
                    // So close, only match a word boundary, then # then not ^#. or whitespace then match a word, - or /
                    // Overly matches https://url.com/#10-defining-a-component
                    "select distinct regexp_matches(text, '\\Y\\#[\\w\\-\\/]+', 'g') as tag from list_items where text ~ '\\Y\\#[^\\#\\s.][\\w\\-\\/]+' order by tag",
                    { type: ListItem.sequelize.QueryTypes.SELECT }
                );

                // This regexp_matches returns a text array which gives us an unfriendly object of nested arrays. Flatten them out
                return tags.map(item => {
                    return { tag: item.tag[0] };
                });
            }
        }
    };

    // Put together a schema
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    return { sequelize, ListItem, schema };
};

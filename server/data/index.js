import Sequelize from 'sequelize';
import moment from 'moment';
import { makeExecutableSchema } from 'graphql-tools';

export default ({ host, username, password, database }) => {
    const sequelize = new Sequelize({ host, database, username, password, dialect: 'postgres' });
    const ListItem = sequelize.define('list_item', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.UUID,
            field: 'user_id',
        },
        sortOrder: {
            type: Sequelize.INTEGER,
            field: 'sort_order',
        },
        created: {
            type: Sequelize.DATE,
        },
        completed: {
            type: Sequelize.DATE,
        },
        title: {
            type: Sequelize.TEXT,
        },
        text: {
            type: Sequelize.TEXT,
        },
        height: {
            type: Sequelize.INTEGER,
        },
    });

    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: Sequelize.TEXT,
        },
        password: {
            type: Sequelize.TEXT,
        },
    });

    const Tag = sequelize.define('tag', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        tagName: {
            type: Sequelize.TEXT,
            field: 'tag_name',
        },
        icon: {
            type: Sequelize.TEXT,
        },
        todo: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        sortOrder: {
            type: Sequelize.INTEGER,
            field: 'sort_order',
        },
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
            tagName: String
            icon: String
            todo: Boolean
            sortOrder: Int
        }
        type Query {
            allItems: [ListItem]
            itemBySearch(userId: ID, term: String, fromDate: String): [ListItem],
            itemByDate(userId: ID, date: String): [ListItem],
            tags(userId: ID): [Tag]
        }
        type Mutation {
            updateItem(id: ID, userId: ID, title: String, text: String, sortOrder: Int, created: String, completed: String): ListItem
        }
        `;

    // The resolvers
    const resolvers = {
        Query: {
            allItems(_, args) {
                return ListItem.findAll({ user_id: args.userId });
            },
            itemBySearch(_, args) {
                const where = {
                    $or: [{ title: { $ilike: `%${args.term}%` } }, { text: { $ilike: `%${args.term}%` } }],
                    $and: [{ user_id: args.userId }],
                };
                if (args.fromDate) {
                    where.$and.push({ completed: { $or: [{ $eq: null }, { $gte: args.fromDate }] } });
                }
                return ListItem.findAll({
                    where,
                    order: [['completed', 'DESC'], 'sort_order'],
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
                            [{ created: { $lte: startOfDay } }, { completed: null }],
                        ],
                        $and: { user_id: args.userId },
                    },
                    order: [['completed', 'DESC'], 'sort_order'],
                });
            },
            async tags(_, args) {
                return Tag.findAll({ user_id: args.userId });
                //.query
                // So close, only match a word boundary, then # then not ^#. or whitespace then match a word, - or /
                // Overly matches https://url.com/#10-defining-a-component
                // "select distinct regexp_matches(text, '\\Y\\#[\\w\\-\\/]+', 'g') as tag from list_items where text ~ '\\Y\\#[^\\#\\s.][\\w\\-\\/]+' and user_id = ? order by tag",
                // { replacements: [args.userId], type: ListItem.sequelize.QueryTypes.SELECT }

                // This regexp_matches returns a text array which gives us an unfriendly object of nested arrays. Flatten them out
                // return tags.map(item => {
                //     return { tag: item.tag[0] };
                // });
            },
        },
        Mutation: {
            updateItem: async (_, { id, title, text, sortOrder, created, completed, userId }) => {
                if (typeof id === 'undefined') {
                    throw new Error('You must provide an ID.');
                }

                console.log(`👨‍🚀 ${title}`);
                // Save ListItem
                await ListItem.upsert(
                    { id, title, text, sortOrder, created, completed, userId: userId },
                    { where: { id } }
                );

                // Load updated/inserted ListItem
                return await ListItem.findById(id);
            },
        },
    };

    // Put together a schema
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    return { sequelize, ListItem, User, schema };
};

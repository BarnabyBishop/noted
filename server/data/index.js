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
        type Query {
            allItems: [ListItem]
            itemBySearch(term: String): [ListItem],
            itemByDate(date: String): [ListItem]
        }
        `;

    // The resolvers
    const resolvers = {
        Query: {
            allItems(_, args) {
                return ListItem.findAll();
            },
            itemBySearch(_, args) {
                return ListItem.findAll({ where: { title: { $ilike: `%${args.term}%` } } });
            },
            itemByDate(_, args) {
                // moment(date).isSame(item.created, 'day') ||
                //     moment(date).isBetween(item.created, item.completed, 'day', '[]');
                const startOfDay = moment(args.date).startOf('day');
                const endOfDay = moment(args.date).endOf('day');
                return ListItem.findAll({ where: { created: { $gte: startOfDay, $lt: endOfDay } } });
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

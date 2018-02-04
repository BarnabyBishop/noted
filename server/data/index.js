import Sequelize from 'sequelize';

export default (dbHost) => {
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

    return { ListItem };
};

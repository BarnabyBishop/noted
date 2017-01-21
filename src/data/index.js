// import chalk from 'chalk';
import Sequelize from 'sequelize';
const sequelize = new Sequelize('postgres://b@localhost:5432/noted');

export default async function() {
    const ListItem = sequelize.define('list_item', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        sortOrder: {
            type: Sequelize.INTEGER,
            field: "sort_order"
        },
        created: {
            type: Sequelize.DATE
        },
        completed: {
            type: Sequelize.DATE
        },
        text: {
            type: Sequelize.STRING
        },
        checked: {
            type: Sequelize.BOOLEAN
        },
        height: {
            type: Sequelize.INTEGER
        }
    });

    // // force: true will drop the table if it already exists
    // await ListItem.sync({force: false});
    
    // // Create initial data
    // await ListItem.bulkCreate([
    //     { sortOrder: 200, created: '2017-01-16', text: '3. React DND (200)', checked: false }, 
    //     { sortOrder: 300, created: '2017-01-16', text: '4. description note (300)', checked: false, height: 36 },
    //     { sortOrder: 400, created: '2017-01-16', text: '5. DB (400)', checked: false },
    //     { sortOrder: 100, created: '2017-01-14', completed: '2017-01-15', text: '2. Checkboxes (100)', checked: true },
    //     { sortOrder: 50, created: '2017-01-14', completed: '2017-01-14', text: '1. sort Order (100)', checked: true }
    // ]);

    // const listItems = await ListItem.findAll();
    // console.log('');
    // console.log(chalk.green(`${listItems.length} list items created`));

    return { ListItem };
}


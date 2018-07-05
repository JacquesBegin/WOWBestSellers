'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.TEXT,
        required: true
      },
      item_id: {
        type: Sequelize.INTEGER,
        required: true
      },
      description: {
        type: Sequelize.TEXT
      },
      icon: {
        type: Sequelize.TEXT
      },
      stackable: {
        type: Sequelize.INTEGER
      },
      item_bind: {
        type: Sequelize.INTEGER
      },
      buy_price: {
        type: Sequelize.INTEGER
      },
      sell_price: {
        type: Sequelize.INTEGER
      },
      is_auctionable: {
        type: Sequelize.BOOLEAN
      },
      created_At: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_At: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      paranoid: true,
      underscored: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('items');
  }
};
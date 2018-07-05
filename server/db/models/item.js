'use strict'

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    item_id: {
      type: DataTypes.INTEGER,
      required: true
    },
    name: {
      type: DataTypes.TEXT('medium'),
      required: true
    },
    description: {
      type: DataTypes.TEXT('long')
    },
    icon: {
      type: DataTypes.TEXT('medium')
    },
    stackable: {
      type: DataTypes.INTEGER
    },
    item_bind: {
      type: DataTypes.INTEGER
    },
    buy_price: {
      type: DataTypes.INTEGER
    },
    sell_price: {
      type: DataTypes.INTEGER
    },
    is_auctionable: {
      type: DataTypes.BOOLEAN
    }
  }, {
      paranoid: true,
      underscored: true
    });
    return Item;
};
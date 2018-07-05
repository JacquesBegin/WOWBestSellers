'use strict';

module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.TEXT,
    item_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    icon: DataTypes.TEXT,
    stackable: DataTypes.INTEGER,
    item_bind: DataTypes.INTEGER,
    buy_price: DataTypes.INTEGER,
    sell_price: DataTypes.INTEGER,
    is_auctionable: DataTypes.BOOLEAN
  });
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};
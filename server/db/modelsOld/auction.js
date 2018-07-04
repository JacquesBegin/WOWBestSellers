'use strict'

module.exports = (sequelize, DataTypes) => {
  const Auction = sequelize.define('auction', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    auction_id: {
      type: DataTypes.BIGINT,
      required: true
    },
    item_id: {
      type: DataTypes.INTEGER
    },
    owner: {
      type: DataTypes.STRING
    },
    owner_realm: {
      type: DataTypes.STRING
    },
    bid: {
      type: DataTypes.BIGINT
    },
    buyout: {
      type: DataTypes.BIGINT
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    time_left: {
      type: DataTypes.ENUM,
      values: ['SHORT', 'MEDIUM', 'LONG', 'VERY_LONG']
    },
    rand: {
      type: DataTypes.INTEGER
    },
    seed: {
      type: DataTypes.BIGINT
    },
    context: {
      type: DataTypes.INTEGER
    },
    pet_species_id: {
      type: DataTypes.INTEGER
    },
    pet_breed_id: {
      type: DataTypes.INTEGER
    },
    pet_level: {
      type: DataTypes.INTEGER
    },
    pet_quality_id: {
      type: DataTypes.INTEGER
    }
  }, {
    paranoid: true,
    underscored: true
  });
  return Auction;
};
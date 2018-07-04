'use strict'

module.exports = (sequelize, DataTypes) => {
  const Dump = sequelize.define('dump', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    url: {
      type: DataTypes.STRING,
      required: true
    },
    last_modified: {
      type: DataTypes.BIGINT,
      required: true
    }
  }, {
    paranoid: true,
    underscored: true
  });
  return Dump;
}
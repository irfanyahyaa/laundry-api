'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Laundry.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      });
    }
  }
  Laundry.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    weight: DataTypes.STRING,
    bill: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Laundry',
  });
  return Laundry;
};
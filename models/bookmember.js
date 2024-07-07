'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookMember.belongsTo(models.Book, { foreignKey: "IdBook", as: "book" });
      BookMember.belongsTo(models.Member, { foreignKey: "IdMember", as: "member" });
    }
  }
  BookMember.init({
    IdBook: DataTypes.INTEGER,
    IdMember: DataTypes.INTEGER,
    borrowedDate: DataTypes.DATE,
    returnedDate: DataTypes.DATE,
    isPenalty: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BookMember',
  });
  return BookMember;
};
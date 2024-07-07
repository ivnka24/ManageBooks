"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookMembers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      IdBook: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Books",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      IdMember: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Members",
        },
      },
      borrowedDate: {
        type: Sequelize.DATE,
      },
      returnedDate: {
        type: Sequelize.DATE,
      },
      isPenalty: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BookMembers");
  },
};

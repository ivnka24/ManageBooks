const { Book, Member, BookMember } = require("../models");
const findByIdBook = async (id) => {
  const findBook = await Book.findByPk(id);
  return findBook;
};
const findByIdMember = async (id) => {
  const findMember = await Member.findByPk(id);
  return findMember;
};

const findBookMemberById = async (id) => {
  const findBookMember = await BookMember.findByPk(id);
  return findBookMember;
};

module.exports = { findByIdBook, findByIdMember, findBookMemberById };

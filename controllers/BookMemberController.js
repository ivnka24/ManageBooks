const {
  findByIdBook,
  findByIdMember,
  findBookMemberById,
} = require("../helpers/FindHelpers");
const { Book, Member, BookMember } = require("../models");
const { Op } = require("sequelize");
class BookMemberController {
  static async borrowBook(req, res, next) {
    try {
      const { IdBook, IdMember } = req.body;
      const checkBook = await findByIdBook(IdBook);
      if (!checkBook) {
        return res.status(404).json({ message: "Book is not found" });
      }
      const checkMember = await findByIdMember(IdMember);
      if (!checkMember) {
        return res.status(404).json({ message: "Member is not found" });
      }
      if (checkBook.stock === 0) {
        return res.status(400).json({ message: "There is no book stock" });
      }
      const getMember = await BookMember.findAll({
        where: { IdMember, returnedDate: { [Op.is]: null } },
      });
      if (getMember.length == 2) {
        return res.status(400).json({ message: "You have borrowed 2 books" });
      }
      const nowDate = new Date();
      const threeDaysAgo = new Date(
        nowDate.getTime() - 3 * 24 * 60 * 60 * 1000
      );

      const memberPenalty = await BookMember.findAll({
        where: {
          IdMember,
          isPenalty: true,
          returnedDate: {
            [Op.gt]: threeDaysAgo,
          },
        },
      });
      if (memberPenalty.length > 0) {
        return res.status(400).json({
          message:
            "You have penalties to clear, You can only borrow after 3 days from the last returned date.",
        });
      }
      const borrowBook = await BookMember.create({
        IdBook,
        IdMember,
        borrowedDate: new Date(),
      });
      await Book.decrement("stock", { where: { id: IdBook } });
      res
        .status(201)
        .json({ data: borrowBook, message: "Insert borrow book succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async returnedBook(req, res, next) {
    try {
      const { idBookMember } = req.params;
      const checkBookMember = await findBookMemberById(idBookMember);
      if (!checkBookMember) {
        return res.status(404).json({ message: "BookMember not found" });
      }
      let nowDate = new Date();
      let penalty = {
        isPenalty: false,
        returnedDate: new Date(),
      };
      if (checkBookMember.borrowedDate) {
        let borrowedDate = new Date(checkBookMember.borrowedDate);
        let diffTime = nowDate - borrowedDate;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 7) {
          penalty.isPenalty = true;
        }
      }

      await BookMember.update(penalty, { where: { id: idBookMember } });
      await Book.increment("stock", { where: { id: checkBookMember.IdBook } });
      res
        .status(200)
        .json({ message: "Book returned successfully", data: penalty });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getAllBookMember(req, res, next) {
    try {
      const bookMembers = await BookMember.findAll({
        include: [
          { model: Book, as: "book", attributes: ["title"] },
          {
            model: Member,
            as: "member",
            attributes: ["fullName"],
          },
        ],
      });
      res.status(200).json({ message: "Data Succesfully", data: bookMembers });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = BookMemberController;

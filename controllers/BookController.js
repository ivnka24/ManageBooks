const { Book } = require("../models");
class BookController {
  static async insertBook(req, res, next) {
    try {
      const { title, author, stock } = req.body;
      const createBook = await Book.create({ title, author, stock });
      res
        .status(201)
        .json({ message: "Insert new book succesfully", data: createBook });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getBook(req, res, next) {
    try {
      res.status(200).json({ data: await Book.findAll() });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server Error"})
    }
  }
}
module.exports = BookController;

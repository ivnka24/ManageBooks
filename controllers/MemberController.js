const { Member } = require("../models");
class MemberController {
  static async insertNewMember(req, res, next) {
    try {
      const { fullName, phoneNumber } = req.body;
      const createMember = await Member.create({ fullName, phoneNumber });
      res
        .status(201)
        .json({ data: createMember, message: "Insert new member succesfully" });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getMember(req, res, next) {
    try {
        res.status(200).json({data : await Member.findAll()})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
module.exports = MemberController;

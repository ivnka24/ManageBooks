const express = require("express");
const router = express.Router();
const BookMemberController = require("../controllers/BookMemberController");

/**
 * @swagger
 * tags:
 *   name: BookMembers
 *   description: API endpoints for managing book-member associations
 */

/**
 * @swagger
 * /bookmembers/borrowBook:
 *   post:
 *     summary: Borrow a book
 *     tags: [BookMembers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdBook:
 *                 type: integer
 *               IdMember:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     borrowedDate:
 *                       type: string
 *                     IdBook:
 *                       type: integer
 *                     IdMember:
 *                       type: integer
 */
router.post("/borrowBook", BookMemberController.borrowBook);

/**
 * @swagger
 * /bookmembers/returnedBook/{idBookMember}:
 *   put:
 *     summary: Return a borrowed book
 *     tags: [BookMembers]
 *     parameters:
 *       - in: path
 *         name: idBookMember
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     returnedDate:
 *                       type: string
 *                     isPenalty:
 *                       type: boolean
 */
router.put("/returnedBook/:idBookMember", BookMemberController.returnedBook);

/**
 * @swagger
 * /bookmembers:
 *   get:
 *     summary: Retrieve all book-member associations
 *     tags: [BookMembers]
 *     responses:
 *       200:
 *         description: A list of book-member associations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       borrowedDate:
 *                         type: string
 *                       returnedDate:
 *                         type: string
 *                       isPenalty:
 *                         type: boolean
 *                       book:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                       member:
 *                         type: object
 *                         properties:
 *                           fullName:
 *                             type: string
 */
router.get("/", BookMemberController.getAllBookMember);

module.exports = router;

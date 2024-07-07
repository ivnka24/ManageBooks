const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { Book } = require("../models");

describe("BookController", () => {
  beforeEach(async () => {
    await sequelize.queryInterface.bulkDelete("Books", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  });

  describe("POST /books", () => {
    test("should insert a new book", async () => {
      const newBook = {
        title: "Test Book",
        author: "Test Author",
        stock: 10,
      };

      const response = await request(app)
        .post("/books")
        .send(newBook)
        .expect(201);

      expect(response.body).toHaveProperty(
        "message",
        "Insert new book succesfully"
      );
      expect(response.body.data).toHaveProperty("title", newBook.title);
      expect(response.body.data).toHaveProperty("author", newBook.author);
      expect(response.body.data).toHaveProperty("stock", newBook.stock);
    });

    test("should return 400 if tittle is required", async () => {
      const invalidBook = {
        author: "Invalid Author",
      };

      const response = await request(app)
        .post("/books")
        .send(invalidBook)
        .expect(400);

      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("GET /books", () => {
    beforeEach(async () => {
      await Book.bulkCreate([
        { title: "Book 1", author: "Author 1", stock: 5 },
        { title: "Book 2", author: "Author 2", stock: 10 },
      ]);
    });

    test("should get all books", async () => {
      const response = await request(app).get("/books").expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(2);
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});

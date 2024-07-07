const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { Member } = require("../models");

describe("MemberController", () => {
  beforeEach(async () => {
    await sequelize.queryInterface.bulkDelete("Members", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  });



  describe("POST /members", () => {
    test("should insert a new member", async () => {
      const newMember = {
        fullName: "John Doe",
        phoneNumber: "08123456",
      };

      const response = await request(app)
        .post("/members")
        .send(newMember)
        .expect(201);

      expect(response.body).toHaveProperty(
        "message",
        "Insert new member succesfully"
      );
      expect(response.body.data).toHaveProperty("fullName", newMember.fullName);
      expect(response.body.data).toHaveProperty(
        "phoneNumber",
        newMember.phoneNumber
      );
    });

    test("should return 400 if validation fails", async () => {
      const invalidMember = {
        phoneNumber: "08123213",
      };

      const response = await request(app)
        .post("/members")
        .send(invalidMember)
        .expect(400);

      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("GET /members", () => {
    beforeEach(async () => {
      await Member.bulkCreate([
        { fullName: "Member 1", phoneNumber: "0811111111" },
        { fullName: "Member 2", phoneNumber: "0822222222" },
      ]);
    });

    test("should get all members", async () => {
      const response = await request(app).get("/members").expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveLength(2);
    });
  });
  afterAll(async () => {
    await sequelize.close();
  });
});

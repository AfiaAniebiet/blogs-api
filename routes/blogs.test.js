const request = require("supertest");
const app = require("../app");

describe("Test GET /blogs-api/blogs", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/blogs-api/blogs")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

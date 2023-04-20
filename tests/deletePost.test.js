const request = require("supertest");
const { db } = require("../src/database/database");
const { server } = require("../src/server/server");

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

describe("deletePost", () => {
  test("should return 400 if invalid post id", async () => {
    const loginResponse = await request(server)
      .post("/authentication/login")
      .send({
        username: "andreas",
        password: "andreas",
      });

    const cookie = loginResponse.header["set-cookie"].pop();

    const response = await request(server)
      .delete("/posts/delete")
      .send({ id: "1" })
      .set("Cookie", [cookie]);

    expect(response.statusCode).toBe(400);
  });
});

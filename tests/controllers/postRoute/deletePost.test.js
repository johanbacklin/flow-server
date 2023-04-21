const request = require("supertest");
let cookie = undefined;

const { db } = require("../../../src/database/database");
const { server } = require("../../../src/server/server");

beforeAll(async () => {
  await db.connect();
  const resReg = await request(server)
    .post("/authentication/register")
    .send({ username: "TestDelete", password: "TestDelete" });
  if (resReg.status == 201) {
    const resLog = await request(server)
      .post("/authentication/login")
      .send({ username: "TestDelete", password: "TestDelete" });
    cookie = resLog.header["set-cookie"];
  }
});

afterAll(async () => {
  try {
    await db.posts.deleteMany({ username: "TestDelete" });
    await db.users.deleteOne({ username: "TestDelete" });
  } catch (error) {
  } finally {
    await db.disconnect();
  }
});

describe("deletePost", () => {
  test("should return 400 if invalid post id", async () => {
    const loginResponse = await request(server)
      .post("/authentication/login")
      .send({
        username: "test",
        password: "testingAccount",
      });

    const cookie = loginResponse.header["set-cookie"].pop();

    const response = await request(server)
      .delete("/posts/delete")
      .send({ id: "1" })
      .set("Cookie", [cookie]);

    expect(response.statusCode).toBe(400);
  });
});

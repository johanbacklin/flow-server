const request = require("supertest");
const { db } = require("../../../src/database/database");
const { server } = require("../../../src/server/server");

beforeAll(async function () {
  await db.connect();
});

afterAll(async function () {
  await db.disconnect();
});

describe("Testing postLike endpoint", function () {
  test("PostLike should return 200 if successful post like", async function () {
    const loginResponse = await request(server)
      .post("/authentication/login")
      .send({
        username: "test",
        password: "testingAccount",
      });

    const cookie = loginResponse.header["set-cookie"].pop();

    const response = await request(server)
      .post("/posts/like")
      .send({ id: "643e7cfbda116e3946955021" })
      .set("Cookie", cookie);

    expect(response.status).toBe(200);
  });

  test("PostLikeDelete should return 200 if successful deletion of post like", async function () {
    const loginResponse = await request(server)
      .post("/authentication/login")
      .send({
        username: "test",
        password: "testingAccount",
      });

    const cookie = loginResponse.header["set-cookie"].pop();

    const response = await request(server)
      .delete("/posts/like")
      .send({ id: "643e7cfbda116e3946955021" })
      .set("Cookie", cookie);

    expect(response.status).toBe(200);
  });
});

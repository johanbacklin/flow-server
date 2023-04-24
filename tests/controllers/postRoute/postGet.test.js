const request = require("supertest");
const { server } = require("../../../src/server/server");
const { db } = require("../../../src/database/database");

let cookie = null;

beforeAll(async function () {
  await db.connect();
  await request(server)
    .post("/authentication/register")
    .send({ username: "Chocolate2", password: "Chocolate" });

  const response = await request(server)
    .post("/authentication/login")
    .send({ username: "Chocolate2", password: "Chocolate" });

  cookie = response.header["set-cookie"].pop();
});
afterAll(async function () {
  await request(server)
    .delete("/authentication/deleteUser")
    .send({ username: "Chocolate2" })
    .set("Cookie", cookie);
  await db.disconnect();
});

describe("Testing postGet endpoint", function () {
  test("GET /posts/:username should return 400 if body is sent", async function () {
    const response = await request(server).get("/posts/test").send({ id: 1 });
    expect(response.status).toBe(400);
  });

  test("GET /posts/:username should return 404 if no posts exist for the inputted username", async function () {
    const response = await request(server).get("/posts/Chocolate2");
    expect(response.status).toBe(404);
  });

  test("GET /posts/:username should return 200 if successful get", async function () {
    const response = await request(server).get("/posts/David");
    expect(response.status).toBe(200);
  });
});

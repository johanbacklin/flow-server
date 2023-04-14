const request = require("supertest");
const { server } = require("../../../src/server/server");
const { db } = require("../../../src/database/database");

beforeAll(async function () {
  await db.connect();
});

afterAll(async function () {
  await db.disconnect();
});

describe("Testing userRegister endpoint", function () {
  test("POST /authentication/register should return 400 if bad request body", async function () {
    const response = await request(server)
      .post("/authentication/register")
      .send({});
    expect(response.status).toBe(400);
  });

  test("POST /authentication/register should return 209 if username is taken", async function () {
    const response = await request(server)
      .post("/authentication/register")
      .send({ username: "test", password: "testingAccount" });
    expect(response.status).toBe(409);
  });
});

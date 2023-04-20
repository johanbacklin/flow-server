const request = require("supertest");
const { server } = require("../../../src/server/server");
const { db } = require("../../../src/database/database");

beforeAll(async function () {
  await db.connect();
});

afterAll(async function () {
  await db.disconnect();
});

describe("Testing userLogin endpoint", function () {
  test("POST /authentication/login should return 400 if bad request body", async function () {
    const response = await request(server)
      .post("/authentication/login")
      .send({});
    expect(response.status).toBe(400);
  });

  test("POST /authentication/login should return 404 if username does not exist", async function () {
    const response = await request(server)
      .post("/authentication/login")
      .send({ username: "tester", password: "testingAccount" });
    expect(response.status).toBe(404);
  });

  test("POST /authentication/login should return 200 if good login", async function () {
    const response = await request(server)
      .post("/authentication/login")
      .send({ username: "test", password: "testingAccount" });
    expect(response.status).toBe(200);
  });
});

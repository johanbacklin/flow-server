const request = require("supertest");
const { server } = require("../../../src/server/server");
const { db } = require("../../../src/database/database");

beforeAll(async function () {
  await db.connect();
});

afterAll(async function () {
  await db.disconnect();
});

describe("Testing postGet endpoint", function () {
  test("GET /posts/:username should return 400 if body is sent", async function () {
    const response = await request(server).get("/posts/test").send({ id: 1 });
    expect(response.status).toBe(400);
  });

  test("GET /posts/:username should return 404 if no posts exist for the inputted username", async function () {
    const response = await request(server).get("/posts/test/Chocolate");
    expect(response.status).toBe(404);
  });

  test("GET /posts/:username should return 200 if successful get", async function () {
    const response = await request(server).get("/posts/test");
    expect(response.status).toBe(200);
  });
});

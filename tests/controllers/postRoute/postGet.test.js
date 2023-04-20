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
  test("GET /posts/:username should return 401 if no cookie exists", async function () {
    const response = await request(server).get("/posts/test");
    expect(response.status).toBe(200);
  });
});

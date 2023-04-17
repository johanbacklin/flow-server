const request = require("supertest");
const { db } = require("../src/database/database");
const { server } = require("../src/server/server");

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

describe("getAllUsers", () => {
  test("returns a array with a property of usernames and 200 as status", async () => {
    const response = await request(server).get("/authentication/users");
    expect(response.body).toHaveProperty("usernames");
    expect(Array.isArray(response.body.usernames)).toBe(true);

    expect(response.status).toBe(200);
  });
});

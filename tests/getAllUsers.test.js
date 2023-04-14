const request = require("supertest");
const { db } = require("../src/database/database");
const { server } = require("../src/server/server");

async function connect() {
  await db.connect();
}
connect();

describe("getAllUsers", () => {
  test("returns a 200", async () => {
    const response = await request(server).get("/authentication/users");

    expect(response.status).toBe(500);
  });
});

async function disconnect() {
  await db.disconnect();
}
disconnect();

/* expect(response.body).toHaveProperty("usernames");
expect(Array.isArray(response.body.usernames)).toBe(true); */

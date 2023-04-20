const request = require("supertest");
const { db } = require("../../../src/database/database");
const { server } = require("../../../src/server/server");

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

  test("POST /authentication/register should return 201 if successful registration", async function () {
    const response = await request(server)
      .post("/authentication/register")
      .send({ username: "Brownie", password: "Chocolate" });
    expect(response.status).toBe(201);
  });

  test("DELETE /authentication/deleteUser should return 200 if user is deleted", async function () {
    const loginResponse = await request(server)
      .post("/authentication/login")
      .send({
        username: "Brownie",
        password: "Chocolate",
      });

    const cookie = await loginResponse.header["set-cookie"].pop();

    const response = await request(server)
      .delete("/authentication/deleteUser")
      .send({ username: "Brownie" })
      .set("Cookie", cookie);

    expect(response.status).toBe(200);
  });
});

const request = require("supertest");
const { server } = require("../../../src/server/server");
const { db } = require("../../../src/database/database");

let cookie = null;

beforeAll(async function () {
  await db.connect();
  await request(server)
    .post("/authentication/register")
    .send({ username: "Brownie", password: "Chocolate" });
});

afterAll(async function () {
  await request(server)
    .delete("/authentication/deleteUser")
    .send({ username: "Brownie" })
    .set("Cookie", cookie);

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
      .send({ username: "Brownies!", password: "Chocolate" });
    expect(response.status).toBe(404);
  });

  test("POST /authentication/login should return 200 if good login", async function () {
    const response = await request(server)
      .post("/authentication/login")
      .send({ username: "Brownie", password: "Chocolate" });

    cookie = response.header["set-cookie"].pop();

    expect(response.status).toBe(200);
  });
});

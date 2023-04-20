const request = require("supertest");
const { db } = require("../../../src/database/database");
const { server } = require("../../../src/server/server");

beforeAll(async function () {
  await db.connect();

  await request(server)
    .post("/authentication/register")
    .send({ username: "ManyBrownies", password: "Chocolate" });
});

afterAll(async function () {
  const response = await request(server)
    .post("/authentication/login")
    .send({ username: "Brownies", password: "Chocolate" });

  const cookie = response.header["set-cookie"].pop();

  await request(server)
    .delete("/authentication/deleteUser")
    .send({ username: "Brownies" })
    .set("Cookie", cookie);

  const response2 = await request(server)
    .post("/authentication/login")
    .send({ username: "ManyBrownies", password: "Chocolate" });

  const cookie2 = response2.header["set-cookie"].pop();

  await request(server)
    .delete("/authentication/deleteUser")
    .send({ username: "ManyBrownies" })
    .set("Cookie", cookie2);

  await db.disconnect();
});

describe("Testing userRegister endpoint", function () {
  test("POST /authentication/register should return 400 if bad request body", async function () {
    const response = await request(server)
      .post("/authentication/register")
      .send({});
    expect(response.status).toBe(400);
  });

  test("POST /authentication/register should return 409 if username already exists", async function () {
    const response = await request(server)
      .post("/authentication/register")
      .send({ username: "ManyBrownies", password: "Chocolate" });
    expect(response.status).toBe(409);
  });

  test("POST /authentication/register should return 201 if successful registration", async function () {
    const response = await request(server)
      .post("/authentication/register")
      .send({ username: "Brownies", password: "Chocolate" });
    expect(response.status).toBe(201);
  });
});

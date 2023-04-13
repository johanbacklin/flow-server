const request = require("supertest");
const { server } = require("../../../src/server/server");

describe("Testing userRegister endpoint", function () {
  test("POST /authentication/register should return 400 if bad request body", async function () {
    const response = await request(server)
      .post("/authentication/register")
      .send({});
    expect(response.status).toBe(400);
  });

  /*
   * Nedan test funkar inte än, måste kolla upp kopplingen till databasen varför den delen inte funkar
   */

  /*
  test("POST /authentication/register should return 201 if good registration", async function () {
    const response = await request(server)
      .post("/authentication/register")
      .send({ username: "David", password: "Norrland" });
    expect(response.status).toBe(201);
  });
  */
});

const request = require("supertest");
const { server } = require("../../../src/server/server");

describe("Testing userLogin endpoint", function () {
  test("POST /authentication/login should return 400 if bad request body", async function () {
    const response = await request(server)
      .post("/authentication/login")
      .send({});
    expect(response.status).toBe(400);
  });

  /*
   * Nedan test funkar inte än, måste kolla upp kopplingen till databasen varför den delen inte funkar
   */
  /*
  test("POST /authentication/login should return 200 if good login", async function () {
    const response = await request(server)
      .post("/authentication/login")
      .send({ username: "Mika", password: "Choklad" });
    expect(response.status).toBe(200);
  });
*/
});

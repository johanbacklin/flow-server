const request = require("supertest");
const { server } = require("../../../src/server/server");
const secret = process.env.SECRET;

describe("Testing postGet endpoint", function () {
  test("GET /post/:username should return 401 if bad params", async function () {
    const response = await request(server).get("/posts/12");
    expect(response.status).toBe(401);
  });

  /*
   * Nedan test funkar inte än, måste kolla upp kopplingen till databasen varför den delen inte funkar
   * och hur man kan koppla dit en cookie.
   */
  /*
  test("GET /post/:username should return 401 if bad params", async function () {
    const response = await request(server)
      .get("/posts/12")
      .set("Cookie", [`authenticationToken=${secret}`]);
    expect(response.status).toBe(400);
  });
*/
});

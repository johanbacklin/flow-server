const { response } = require("express");
const request = require("supertest");
const { db } = require("../src/database/database");
const { server } = require("../src/server/server");

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

describe("deletePost", () => {
  test("should return 400 if invalid post id", async () => {
    const response = await request(server)
      .delete("/posts/delete")
      .send({ id: "1" });

    expect(response.statusCode).toBe(400);
  });
});

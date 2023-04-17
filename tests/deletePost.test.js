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

describe("deletePost", async () => {
  test("should return 400 if invalid post id", () => {
    const response = await request(server)
      .delete("/posts/delete")
      .send({ id: "hello" });

    expect(response.statusCode).toBe(400);
  });
});

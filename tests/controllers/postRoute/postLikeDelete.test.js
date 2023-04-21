const request = require("supertest");
const { db } = require("../../../src/database/database");
const { server } = require("../../../src/server/server");

let cookie = null;
let postID = null;

beforeAll(async function () {
  await db.connect();
  await request(server)
    .post("/authentication/register")
    .send({ username: "Chocolate!", password: "Chocolate" });

  const response = await request(server)
    .post("/authentication/login")
    .send({ username: "Chocolate!", password: "Chocolate" });

  cookie = response.header["set-cookie"].pop();

  const newPost = {
    username: "Chocolate!",
    postText: "Love cookies!",
    likes: [],
    comments: [],
    creation: new Date(),
  };

  await db.posts.insertOne(newPost).then(function (result) {
    postID = result.insertedId.toString();
  });

  await request(server)
    .post("/posts/like")
    .send({ id: postID })
    .set("Cookie", cookie);
});

afterAll(async function () {
  await request(server)
    .delete("/authentication/deleteUser")
    .send({ username: "Chocolate!" })
    .set("Cookie", cookie);
  await db.disconnect();
});

describe("Testing DELETE posts/like endpoint", function () {
  test("PostLikeDelete should return 401 if no cookie", async function () {
    const response = await request(server)
      .delete("/posts/like")
      .send({ id: "123" });
    expect(response.status).toBe(401);
  });

  test("PostLikeDelete should return 400 if bad request body", async function () {
    const response = await request(server)
      .delete("/posts/like")
      .send({ id: "123" })
      .set("Cookie", cookie);
    expect(response.status).toBe(400);
  });

  test("PostLikeDelete should return 404 if post is not found", async function () {
    const response = await request(server)
      .delete("/posts/like")
      .send({ id: "644247ef5751cab72ee4db1e" })
      .set("Cookie", cookie);
    expect(response.status).toBe(404);
  });

  test("PostLikeDelete should return 200 if successful deletion of post like", async function () {
    const response = await request(server)
      .delete("/posts/like")
      .send({ id: postID })
      .set("Cookie", cookie);
    expect(response.status).toBe(200);
  });
});

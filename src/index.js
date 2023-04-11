const { db } = require("./database/database");
const { server } = require("./server/server");

db.connect();

server.listen(5050);

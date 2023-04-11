const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

class MongoDatabase {
  /**
   * The URL required to connect to your MongoDB database.
   */
  url = process.env.DATABASE_URL;

  /**
   * The active MongoDB client. Used
   */
  client;

  /**
   * Name of the database to use.
   */
  database = process.env.DATABASE_NAME;

  /**
   * Array of collections you want to be able to access.
   */
  collections = ["users", "posts"];

  /**
   * Establishes a connection to your MongoDB database.
   */
  async connect() {
    try {
      console.log("Attempting to connect to database.");
      this.client = await MongoClient.connect(this.url);
      console.log("Successfully connected to the database.");
    } catch (err) {
      console.log(err);
    }

    this.setupCollections();
  }

  /**
   * Closes the connection to your MongoDB database.
   */
  async disconnect() {
    console.log("closing DB connection");
    await this.client.close();
  }

  /**
   * Takes an array of collection names and sets up access to those collections.
   */
  setupCollections() {
    for (const collection of this.collections) {
      this[collection] = this.client.db(this.database).collection(collection);
    }
  }
}

exports.db = new MongoDatabase();

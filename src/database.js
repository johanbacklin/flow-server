const { MongoClient } = require('mongodb')
const dotenv = require('dotenv').config()

const db = {
    users: undefined,
    posts: undefined,
    comments: undefined,
}
const dbName = process.env.DATABASE_NAME
console.log(process.env.DATABASE_URL)
MongoClient.connect(process.env.DATABASE_URL).then((client) => {
    db.users = client.db(dbName).collection('users')
    db.posts = client.db(dbName).collection('posts')
    db.comments = client.db(dbName).collection('comments')

})

exports.db = db
//* Reference to mongo database
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://ronrana:zuLe04F6G9oLri3X@cluster0.xyk0z.gcp.mongodb.net/shop?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
    console.log("Connected!");
    _db = client.db();
    callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    })

};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No DataBase Found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
const mongodb = require('mongodb');

//* Reference to our database
const getDb = require('../util/database').getDb;

class User {
    constructor(name , phonenumber) {
        this.name = name;
        this.phonenumber = phonenumber;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findUserById(userId) {
        const db = getDb();
        return db.collection('users').find({_id: new mongodb.ObjectID(userId)}).next();
    }
}

module.exports = User;
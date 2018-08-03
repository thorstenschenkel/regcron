const MongoClient = require('mongodb').MongoClient;
const EventDb = require('./model/eventDb');

// https://github.com/mongodb/node-mongodb-native
// http://mongodb.github.io/node-mongodb-native/3.0/reference/ecmascriptnext/crud/
// http://mongodb.github.io/node-mongodb-native/3.0/tutorials/crud/#crud-operations

const DB_NAME = 'reg';
const DB_COLLECTION = 'snapshots';

class DbHelper {

    constructor(dbUri) {
        this.dbUri = dbUri;
        this.cache = {};
    }

    async storeEventInDB(event) {

        try {

            const client = await MongoClient.connect(this.dbUri);
            const db = client.db(DB_NAME);
            const newEventDb = new EventDb(event.name, event.dateStrg, event.getYear());

            const query = { name: event.name };
            const eventDb = await db.collection(DB_COLLECTION).findOne(query);

            if (eventDb) {

                newEventDb.addContests(eventDb.contests);                
                newEventDb.addContests(event.contests);

                const options = { upsert: true };
                const updateResult = await db.collection(DB_COLLECTION).replaceOne(query, newEventDb, options);
                if (!updateResult) {
                    console.error(' -- t7 -- ERR -- can not store/update event!');
                } else {
                    // const msg = '-- t7 - DBG -- replaced';
                    // console.log(msg);
                }

            } else {

                newEventDb.addContests(event.contests);

                const insertRet = await db.collection(DB_COLLECTION).insertOne(newEventDb);
                if (!insertRet || insertRet.insertedCount != 1) {
                    console.error(' -- t7 -- ERR -- can not insert event!');
                } else {
                    // const msg = `-- t7 - DBG -- inserted : ${insertRet.insertedCount}`;
                    // console.log(msg);
                }
            }

            client.close();

        } catch (err) {
            console.error(' -- t7 -- ERR -- store error: ', err.stack);
        }

    }
    
}

module.exports = DbHelper;

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
    }

    _createEventDb(event) {
        const year = event.getYear();
        const eventDb = new EventDb(event.name, event.dateStrg, year);
        for (const contest of event.contests) {
            let contestDb = eventDb.addContest(contest.name);
            contestDb.addCount(contest.count);
        }
        return eventDb;
    }

    async storeEventInDB(event) {

        try {

            console.log('-- t7 - DBG -- storeEventInDB');

            const client = await MongoClient.connect(this.dbUri);
            const db = client.db(DB_NAME);

            const query = { name: event.name };
            let eventDb = await db.collection(DB_COLLECTION).findOne();

            if (eventDb) {

                console.log('-- t7 - DBG -- replaceOne');
                const options = { upsert: true };
                const updateResult = await db.collection(DB_COLLECTION).replaceOne(query, eventDb, options);
                if (!updateResult || (updateResult.nUpserted === 0 && updateResult.nModified === 0)) {
                    console.error(' -- t7 -- ERR -- can not store/update event!');
                } else {
                    const msg = `-- t7 - DBG -- replaced : ${updateResult.nUpserted} / ${updateResult.nModified})`;
                    console.log(msg);
                }

            } else {

                console.log('-- t7 - DBG -- insertOne');
                eventDb = this._createEventDb(event);

                const insertRet = await db.collection(DB_COLLECTION).insertOne(eventDb);
                if (!insertRet || insertRet.insertedCount != 1) {
                    console.error(' -- t7 -- ERR -- can not insert event!');
                } else {
                    const msg = `-- t7 - DBG -- inseted : ${insertRet.insertedCount})`;
                    console.log(msg);
                }
            }

            client.close();

        } catch (err) {
            console.error(' -- t7 -- ERR -- store error: ', err.stack);
        }

    }

}

module.exports = DbHelper;

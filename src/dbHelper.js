const MongoClient = require('mongodb').MongoClient;
const EventDb = require('./model/eventDb');

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

        const eventDb = this._createEventDb(event);

        try {
            const client = await MongoClient.connect(this.dbUri);
            console.log("Connected correctly to server");
            const db = client.db(DB_NAME);
            const insertRet = await db.collection(DB_COLLECTION).insertOne(eventDb);
            if (!insertRet || insertRet.insertedCount != 1) {
                console.error(' -- t7 -- ERR -- can not insert event!');
            }
            client.close();
        } catch (err) {
            console.error(' -- t7 -- ERR -- store error: ', err.stack);
        }

    }

}

module.exports = DbHelper;

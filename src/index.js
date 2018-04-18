const OneEventParser = require('./oneEventParser');
const AllEventsParser = require('./allEventsParser');

exports.handler = function (event, context, callback) {

    console.log(' -- t7 - DBG -- handler was called');

    parseAll();

};

async function parseOneContest(event) {

    let htmlPage = await OneEventParser.getOneEventPromise(event);
    event = OneEventParser.parseHtml(htmlPage, event);
}

async function parseAll() {

    const now = new Date();
    const thisYear = now.getFullYear();

    let events = [];
    try {
        // this year
        let htmlPage = await AllEventsParser.getAllEventsPromise(thisYear);
        events = AllEventsParser.parseHtml(htmlPage, events);
        console.log(' -- t7 -- DBG -- events: ' + events.length);
        // next year
        const nextYear = thisYear + 1;
        htmlPage = await AllEventsParser.getAllEventsPromise(nextYear);
        events = AllEventsParser.parseHtml(htmlPage, events);
        console.log(' -- t7 -- DBG -- events: ' + events.length);
        for (const event of events) {
            parseOneContest(event);
        }        
    } catch (error) {
        console.error(' -- t7 -- ERR -- Promise error: ', error);
    }

}

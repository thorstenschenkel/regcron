const OneEventParser = require('./oneEventParser');
const AllEventsParser = require('./allEventsParser');
const Year = require('./year');

exports.handler = function (event, context, callback) {

    console.log(' -- t7 - DBG -- handler was called');

    parseAll();

};

async function parseOneContest(event) {

    let htmlPage = await OneEventParser.getOneEventPromise(event);
    event = OneEventParser.parseHtml(htmlPage, event);
    const msg = `-- t7 - DBG -- event: ${event.name} (${event.contests.length})`;
    console.log(msg);
    for (const c of event.contests) {
        const msg = `-- t7 - DBG -- contest: ${c.name} (${c.count})`;
        console.log(msg);
    }
    return event;
}

async function parseAll() {

    let events = [];
    try {
        // this year
        const thisYear = Year.getThisYear();
        let htmlPage = await AllEventsParser.getAllEventsPromise(thisYear);
        events = AllEventsParser.parseHtml(htmlPage, events);
        console.log(' -- t7 -- DBG -- events: ' + events.length);
        // next year
        const nextYear = Year.getNextYear();
        htmlPage = await AllEventsParser.getAllEventsPromise(nextYear);
        events = AllEventsParser.parseHtml(htmlPage, events);
        console.log(' -- t7 -- DBG -- events: ' + events.length);        
        for (let event of events) {
            event = parseOneContest(event);
        }
    } catch (error) {
        console.error(' -- t7 -- ERR -- Promise error: ', error);
    }

}

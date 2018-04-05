
const AllEventsParser = require('./allEventsParser');

exports.handler = function (event, context, callback) {

    console.log( ' -- t7 - DBG -- handler was called' );

    const allEventsParser = new AllEventsParser();

    let events = [];
    const now = new Date();
    const thisYear = now.getFullYear();
    let thisYearProm = allEventsParser.getAllEventsPromise(thisYear);
    const lastYear = thisYear-1;
    let lastYearProm = allEventsParser.getAllEventsPromise(lastYear);
    thisYearProm.then(htmlPage => {
        events = allEventsParser.parseHtml(htmlPage, events);
        console.log(' -- t7 -- DBG -- events: ' + events.length);
        return lastYearProm;
    }).then(htmlPage => {
        events = allEventsParser.parseHtml(htmlPage, events);
        console.log(' -- t7 -- DBG -- events: ' + events.length);
    }).catch((error) => {
        console.error(' -- t7 -- ERR -- Promise error: ', error);
    });

};

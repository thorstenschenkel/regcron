
const OneEventParser = require('./oneEventParser');
const AllEventsParser = require('./allEventsParser');

exports.handler = function (event, context, callback) {

    console.log( ' -- t7 - DBG -- handler was called' );

    let events = [];
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisYearProm = AllEventsParser.getAllEventsPromise(thisYear);
    const nextYear = thisYear+1;
    const nextYearProm = AllEventsParser.getAllEventsPromise(nextYear);
    thisYearProm.then(htmlPageThisYear => {
        events = AllEventsParser.parseHtml(htmlPageThisYear, events);
        console.log(' -- t7 -- DBG -- events: ' + events.length);
        return nextYearProm;
    }).then(htmlPageNextYear => {
        events = AllEventsParser.parseHtml(htmlPageNextYear, events);
        console.log(' -- t7 -- DBG -- events: ' + events.length);
        let promises = OneEventParser.getOneEventPromises(events);
        console.log(' -- t7 -- DBG -- promises: ' + promises.length);
        Promise.all(promises).then( values => {
            console.log(' -- t7 -- DBG -- values: ' + values.length);
        });
    }).catch((error) => {
        console.error(' -- t7 -- ERR -- Promise error: ', error);
    });

};

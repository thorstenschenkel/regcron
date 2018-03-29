
const AllEventsParser = require('./allEventsParser');

exports.handler = function (event, context, callback) {

    console.log( '-- t7 - DBG -- handler was called' );

    const allEventsParser = new AllEventsParser();

    allEventsParser.getAllEventsPromise().then(htmlPage => {
        let events = allEventsParser.parseHtml(htmlPage);
        console.log(' -- t7 -- DBG -- events: ' + events.length);
    }).catch((error) => {
        console.error(' -- t7 -- ERR -- Promise error: ', error);
    });

};


// parse - http://coderesearch.com/sts/services/10020
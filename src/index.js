
const AllEventsParser = require('./AllEventsParser');

exports.handler = function (event, context, callback) {

    console.log( '-- t7 - DBG -- handler was called' );

    const allEventsParser = new AllEventsParser();

    allEventsParser.getAllEventsPromise().then(events => {
    }).catch((error) => {
        console.error(' -- t7 -- ERR -- Promise error: ', error);
    });

};


// parse - http://coderesearch.com/sts/services/10020
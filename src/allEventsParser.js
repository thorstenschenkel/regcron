const http = require('http');

const ALL_EVENT_URL = 'http://coderesearch.com/sts/services/10020';

function _bodyPromise(response, resolve) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        if (body.length === 0) {
            console.warn(' -- t7 - WRN -- body of HTML page if empty');
        }
        console.log(' -- t7 -- DBG -- body: ' + body);
        resolve(body);
    });
}

class AllEventsParser {
    
    constructor() {
        this.events = [];
    }

    getAllEventsPromise() {

        return new Promise((resolve, reject) => {

            var now = new Date();
            var year = now.getFullYear();
            let path = ALL_EVENT_URL + '/' + year;

            http.get( path, function (response) {
                const { statusCode } = response;
                if (statusCode !== 200) {
                    console.err(' -- t7 -- ERR -- Can not get HTML page over http: ' +  `Status Code: ${statusCode}`);
                    response.resume();
                    reject(new Error('Failed to load page with all events: ' + `Status Code: ${statusCode}`));
                    return;
                }
                const contentType = response.headers['content-type'];
                console.info(' -- t7 -- DBG -- content-type of HTML: ' + contentType);
                // TODO check contentType
                _bodyPromise(response, resolve);
            }).on('error', function (e) {
                console.warn(' -- t7 -- WRN -- Can not get HTML page over http: ' + e.message);
                reject(new Error('Failed to load page with all events'));
            });

        });

    }

}

class Event {

    construcor( dateStrg, name, url) {
        this.dateStrg = dateStrg;
        this.name = name;
        this.url = url;
    }

}

module.exports = AllEventsParser;
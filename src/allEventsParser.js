const http = require('http');
const cheerio = require('cheerio');
const Event = require('./event');

const ALL_EVENT_URL = 'http://coderesearch.com/sts/services/10020';
// const EVENT_URL_PREFIX = 'http://coderesearch.com/sts/services/10021';

function _bodyPromise(response, resolve) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        if (body.length === 0) {
            console.warn(' -- t7 - WRN -- body of HTML page if empty');
        }
        resolve(body);
    });
}

class AllEventsParser {

    getAllEventsPromise(year) {

        return new Promise((resolve, reject) => {

            const path = ALL_EVENT_URL + '/' + year;

            http.get(path, function (response) {
                const { statusCode } = response;
                if (statusCode !== 200) {
                    console.err(' -- t7 -- ERR -- Can not get HTML page over http: ' + `Status Code: ${statusCode}`);
                    response.resume();
                    reject(new Error('Failed to load page with all events: ' + `Status Code: ${statusCode}`));
                    return;
                }
                const contentType = response.headers['content-type'];
                if (contentType && contentType.indexOf('application/json') !== 0) {
                    _bodyPromise(response, resolve);
                } else {
                    console.err(' -- t7 -- ERR -- Unexpected contentType: ' + contentType);
                    reject(new Error('Failed to load page with all events'));
                }
            }).on('error', function (e) {
                console.warn(' -- t7 -- WRN -- Can not get HTML page over http: ' + e.message);
                reject(new Error('Failed to load page with all events'));
            });

        });

    }

    parseCompetition( htmlElement) {

        const as = htmlElement.children().first().find('a');
        if ( as.length === 2 ) {

            // first <a> -> date
            const aDate = as.eq(0);
            const dateStrg = aDate.text();
            const url = aDate.attr('href');
            
            // second <a> -> name
            const aName = as.eq(1);
            const name = aName.text();

            let event = new Event( name, dateStrg, url);
            return event;
        }

    }

    parseHtml(htmlPage, events) {

        const parent = this;
        
        const dom$ = cheerio.load( htmlPage );
        const competitionRows = dom$('div','#competitions').nextAll('.competition');
        dom$(competitionRows).each(function(){
            let event = parent.parseCompetition( dom$(this) );
            if ( event && !event.isOver() ) {
                events.push(event);
            }
        });

        return events;

    }

}

module.exports = AllEventsParser;
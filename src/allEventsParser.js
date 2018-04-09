const cheerio = require('cheerio');
const Promises = require('./promises');
const Event = require('./event');


function getAllEventsPromise(year) {

    const ALL_EVENT_URL = 'http://coderesearch.com/sts/services/10020';
    const path = ALL_EVENT_URL + '/' + year;
    return Promises.getGetPromise(path);

}

function parseCompetition(htmlElement) {

    const as = htmlElement.children().first().find('a');
    if (as.length === 2) {

        // first <a> -> date
        const aDate = as.eq(0);
        const dateStrg = aDate.text();
        const url = aDate.attr('href');

        // second <a> -> name
        const aName = as.eq(1);
        const name = aName.text();

        let event = new Event(name, dateStrg, url);
        return event;
    }

}

function parseHtml(htmlPage, events) {

    const dom$ = cheerio.load(htmlPage);
    const competitionRows = dom$('div', '#competitions').nextAll('.competition');
    dom$(competitionRows).each(function () {
        let event = parseCompetition(dom$(this));
        if (event && !event.isOver() && events.length < 5 ) { // TODO 
            events.push(event);
        }
    });

    return events;

}

module.exports.getAllEventsPromise = getAllEventsPromise;
module.exports.parseHtml = parseHtml;
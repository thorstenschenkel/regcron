const Promises = require('./promises');
const cheerio = require('cheerio');
const Event = require('./event');
const Contest = require('./contest');

function getOneEventPromise(event) {

    let path = event.url;
    return Promises.getGetPromise(path);

}

function parseWettbewerb(htmlElement, event) {

    let name = htmlElement.text();
    console.log(' -- t7 -- DBG -- name: ' + name);
    let count;
    const spans = htmlElement.find('span');
    if ( spans.length > 0) {
        const span = spans.eq(0);
        count = Number.parseInt(span.text());
        if (Number.isNaN(count)) {
            delete count;
        }
        console.log(' -- t7 -- DBG -- count: ' + count);
    }
    if ( name && count ) {
        const contest = new Contest(name, count);
        event.addContest(contest);
    }
}

function parseHtml(htmlPage, event) {

    const dom$ = cheerio.load(htmlPage);
    const wettbewerbH2 = dom$('h2').first();
    console.log(' -- t7 -- DBG -- wettbewerbH2: ' + wettbewerbH2.text() );
    if (wettbewerbH2) {
        if (wettbewerbH2.text() === 'Wettbewerbe') {
            const ps = wettbewerbH2.nextAll('p');
            if (ps.length > 0) {
                dom$(ps).each(function () {
                    event = parseWettbewerb(dom$(this), event);
                });
            } else {
                const p = wettbewerbH2.first();
                event = parseWettbewerb(p, event);
            }
        } else {
            console.error(' -- t7 -- WARN -- no <h2> with text Wettbewerbe');
        }
    } else {
        console.error(' -- t7 -- WARN -- no <h2>');
    }

    return event;

}

module.exports.getOneEventPromise = getOneEventPromise;
module.exports.parseHtml = parseHtml;

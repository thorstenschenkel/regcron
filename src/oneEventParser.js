const Promises = require('./promises');
const cheerio = require('cheerio');
const Contest = require('./model/contest');

function getOneEventPromise(event) {

    let path = event.url;
    return Promises.getGetPromise(path);

}

function parseWettbewerb(htmlElement, event) {

    let name = htmlElement.text();
    let count;
    const spans = htmlElement.find('span');
    if ( name && spans.length > 0) {
        const span = spans.eq(0);
        count = Number.parseInt(span.text());
        if (Number.isNaN(count)) {
            delete count;
        } else {
            name = name.split(span.text())[0];
            name = name.trim();
        }
    }
    if ( name && count ) {
        const contest = new Contest(name, count);
        event.addContest(contest);
    }
    return event;
}

function parseHtml(htmlPage, event) {

    const dom$ = cheerio.load(htmlPage);
    const wettbewerbH2 = dom$('h2').first();
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

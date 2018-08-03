const EventDb = require('../../src/model/eventDb');
const Event = require('../../src/model/event');
const Contest = require('../../src/model/contest');

describe('test of EventDb', function () {

    it('test constructor', function () {

        const eventDb = new EventDb( 'Lauf', '23.12.2019', 2018 );

        expect(JSON.stringify(eventDb)).toBe('{"name":"Lauf","dateStrg":"23.12.2019","year":2018,"contests":[]}');

    });

    it('should add contests of event', function () {

        const event = new Event( 'Lauf', '23.12.2019', '' );
        const constest = new Contest( '10 km', 123 );
        event.addContest(constest);

        const eventDb = new EventDb( 'Lauf', '23.12.2019', 2018 );
        eventDb.addContests(event.contests);

        const starts = JSON.stringify(eventDb).startsWith('{"name":"Lauf","dateStrg":"23.12.2019","year":2018,"contests":[{"name":"10 km","counts":[{"count":123,"date":');
        expect(starts).toBe(true);

    });

    it('should add contests of eventDb', function () {

        const event = new Event( 'Lauf', '23.12.2019', '' );
        const constest = new Contest( '10 km', 123 );
        event.addContest(constest);

        const eventDb = new EventDb( 'Lauf', '23.12.2019', 2018 );
        eventDb.addContests(event.contests);

        const newEventDb = new EventDb( 'Lauf', '23.12.2019', 2018 );
        newEventDb.addContests(eventDb.contests);

        const starts = JSON.stringify(eventDb).startsWith('{"name":"Lauf","dateStrg":"23.12.2019","year":2018,"contests":[{"name":"10 km","counts":[{"count":123,"date":');
        expect(starts).toBe(true);

    });

    it('should add contests of event with the same contest', function () {

        const event = new Event( 'Lauf', '23.12.2019', '' );
        const constest = new Contest( '10 km', 123 );
        event.addContest(constest);

        const eventDb = new EventDb( 'Lauf', '23.12.2019', 2018 );
        eventDb.addContests(event.contests);

        const newEventDb = new EventDb( 'Lauf', '23.12.2019', 2018 );
        newEventDb.addContests(eventDb.contests);

        const event2 = new Event( 'Lauf', '23.12.2019', '' );
        const constest2 = new Contest( '10 km', 456 );
        event2.addContest(constest2);
        eventDb.addContests(event2.contests);

        const starts = JSON.stringify(eventDb).startsWith('{"name":"Lauf","dateStrg":"23.12.2019","year":2018,"contests":[{"name":"10 km","counts":[{"count":123,"date":');        
        expect(starts).toBe(true);

        const index = JSON.stringify(eventDb).indexOf( '{"count":456,"date":"' );
        expect( index > 10 ).toBe(true);

    });

});

class CountDb {

    constructor(count) {
        this.count = count;
        this.date = new Date();
    }

}

class ContestDb {

    constructor(name) {
        this.name = name;
        this.counts = [];
    }

    addCount( count ) {
        const countDb = new CountDb(count);
        this.counts.push(countDb);
        return countDb;
    }

}

class EventDb {

    constructor(name, dateStrg, year) {
        this.name = name;
        this.dateStrg = dateStrg;
        this.year = year;
        this.contests = [];
    }

    addContest( contestName ) {
        const contestDb = new ContestDb(contestName);
        this.contests.push(contestDb);
        return contestDb;
    }

}

module.exports = EventDb;

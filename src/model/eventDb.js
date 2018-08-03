class CountDb {

    constructor(count) {
        if (isNaN(count)) {
            throw new Error('count is not a number');
        }
        this.count = count;
        this.date = new Date();
    }

}

class ContestDb {

    constructor(name) {
        if (!(typeof name === 'string' || name instanceof String)) {
            throw new Error('name is not a string');
        }
        this.name = name;
        this.counts = [];
    }

    addCount(count) {
        if (isNaN(count)) {
            this.counts.push(count);
        } else {
            const countDb = new CountDb(count);
            this.counts.push(countDb);
        }
    }

}

class EventDb {

    _addContest(contestName) {
        if (!(typeof contestName === 'string' || contestName instanceof String)) {
            throw new Error('contestName is not a string');
        }
        let contestDb;
        for (let c of this.contests) {
            if (contestName === c.name) {
                contestDb = c;
                break;
            }
        }
        if (!contestDb) {
            contestDb = new ContestDb(contestName);
            this.contests.push(contestDb);
        }
        return contestDb;
    }

    addContests(contests) {
        for (let contest of contests) {
            let contestDb = this._addContest(contest.name);
            if (contest.counts) {
                for (let count of contest.counts) {
                    contestDb.addCount(count);
                }
            } else if (contest.count) {
                contestDb.addCount(contest.count);
            }
        }
    }

    constructor(name, dateStrg, year) {
        if (!(typeof name === 'string' || name instanceof String)) {
            throw new Error('name is not a string');
        }
        if (!(typeof dateStrg === 'string' || dateStrg instanceof String)) {
            throw new Error('dateStrg is not a string');
        }
        if (isNaN(year)) {
            throw new Error('year is not a number');
        }
        this.name = name;
        this.dateStrg = dateStrg;
        this.year = year;
        this.contests = [];
    }

}

module.exports = EventDb;

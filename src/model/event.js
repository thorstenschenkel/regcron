const DateUtil = require('./../utils/date');

class Event {

    constructor(name, dateStrg, url) {
        this.name = name;
        this.dateStrg = dateStrg;
        this.url = url;
        this.contests = [];
    }

    isOver() {
        let now = new Date();
        now = DateUtil.normalizeDate(now);
        let eventDate = DateUtil.stringToDate(this.dateStrg);
        eventDate = DateUtil.normalizeDate(eventDate);
        return eventDate - now < 0;
    }

    getYear() {
        let eventDate = DateUtil.stringToDate(this.dateStrg);
        eventDate = DateUtil.normalizeDate(eventDate);
        return eventDate.getFullYear();
    }

    addContest(contest) {
        this.contests.push(contest);
    }

}

module.exports = Event;

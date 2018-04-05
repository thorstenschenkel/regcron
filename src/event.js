function stringToDate(strg) {
    var parts = strg.split('.');
    return new Date(parts[2], parts[1] - 1, parts[0]); 
}

function normalizeDate(date) {
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date;
}

class Event {

    constructor(name, dateStrg, url) {
        this.name = name;
        this.dateStrg = dateStrg;
        this.url = url;
    }

    isOver() {
        return false;
        let now = new Date();
        now = normalizeDate(now);
        let eventDate = stringToDate(this.dateStrg);
        eventDate = normalizeDate(eventDate);
        return eventDate - now < 0;
    }

}

module.exports = Event;
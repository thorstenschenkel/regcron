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

module.exports.stringToDate = stringToDate;
module.exports.normalizeDate = normalizeDate;

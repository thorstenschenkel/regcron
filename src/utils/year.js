function getThisYear() {
    const now = new Date();
    return now.getFullYear();
}

function getNextYear() {
    return getThisYear() + 1;
}

module.exports.getThisYear = getThisYear;
module.exports.getNextYear = getNextYear;

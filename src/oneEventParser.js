const Promises = require('./promises');

function getOneEventPromises(events) {

    let arrayOfPromises = [];

    for (let event of events) {
        let path = event.url;
        arrayOfPromises.push(Promises.getGetPromise(path));
    }

    return arrayOfPromises;

}

module.exports.getOneEventPromises = getOneEventPromises;

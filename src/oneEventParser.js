const Promises = require('./promises');

function getOneEventPromise(event) {

    let path = event.url;
    Promises.getGetPromise(path);
    
}

function getOneEventPromises(events) {

    let arrayOfPromises = [];

    for (let event of events) {       
        arrayOfPromises.push(getOneEventPromise(event));
    }

    return arrayOfPromises;

}

module.exports.getOneEventPromise = getOneEventPromise;
module.exports.getOneEventPromises = getOneEventPromises;

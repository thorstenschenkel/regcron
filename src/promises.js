const https = require('https');

function _bodyPromise(response, resolve) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        if (body.length === 0) {
            console.warn(' -- t7 - WRN -- body of HTML page if empty');
        }
        resolve(body);
    });
}

function getGetPromise(path) {

    return new Promise((resolve, reject) => {

        https.get(path, function (response) {
            const { statusCode } = response;
            if (statusCode !== 200) {
                console.err(' -- t7 -- ERR -- Can not get HTML page over http: ' + `Status Code: ${statusCode}`);
                response.resume();
                reject(new Error('Failed to load page: ' + `Status Code: ${statusCode}`));
                return;
            }
            const contentType = response.headers['content-type'];
            if (contentType && contentType.indexOf('application/json') !== 0) {
                _bodyPromise(response, resolve);
            } else {
                console.err(' -- t7 -- ERR -- Unexpected contentType: ' + contentType);
                reject(new Error('Failed to load page'));
            }
        }).on('error', function (e) {
            console.warn(' -- t7 -- WRN -- Can not get HTML page over http: ' + e.message);
            reject(new Error('Failed to load page'));
        });

    });

}


module.exports.getGetPromise = getGetPromise;
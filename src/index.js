var http = require('http');
var fs = require('fs');
var request = require('sync-request');

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

fs.readFile('./files.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    JSON.parse(data).forEach(element => {

        var fullUrl = "https://www.countries-ofthe-world.com/" + element.flag;
        var localPath = element.country + '.png';

        var res = request('GET', fullUrl, {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0'
            }
        });

        console.log('Start downloading ' + localPath);
        fs.writeFile(localPath, res.getBody(), 'binary', function () {
            console.log('Successfully downloaded file ' + localPath);
        });

    });
});
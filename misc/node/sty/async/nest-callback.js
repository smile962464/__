/**
 *  遍历目录
 */
var fs = require('fs');

var writeStream = fs.createWriteStream('./log.txt', {
    flags: 'a',
    encoding: 'utf8',
    mode: 0666
});

try {
    fs.readdir('./data/', function (err, files) {
        var counter = 0;
        files.forEach(function (name) {
            fs.stat("./data/" + name, function (err, stats) {
                if (err) {
                    throw err;
                }
                if (stats.isFile()) {
                    fs.readFile("./data/" + name, 'utf8', function (err, data) {
                        if (err) {
                            throw err;
                        }
                        var adjData = data.replace(/somecompany\.com/g, 'burningbird.net');

                        fs.writeFile("./data/" + name, adjData, function (err) {
                            if (err) {
                                throw err;
                            }

                            writeStream.write("changed " + name + " \n", 'utf8', function (err) {
                                if (err) {
                                    throw err;
                                }
                                console.log("finished " + name);
                                counter += 1;
                                if (counter >= files.length) {
                                    return console.log('all done');
                                }
                            });
                        });
                    });
                }
            });
        })
    });
} catch (err) {
    console.error(util.inspect(err));
}


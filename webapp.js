var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var redis = require('redis')
var client = redis.createClient(6379, '127.0.0.1', {})

var args = process.argv.slice(2);
var PORT = args[0];
PORT = 9090;

// Root page
app.get('/', function(req, res) {
    var message = "Hello World";
    client.exists('featureFlag', function(err, reply) {
        if (reply === 1) {
            console.log('feature flag on');
            message = "NEW FEATURE";
        } else {
            console.log('feature flag off');
        }
        res.send(message);
    });
});

app.get('/get', function (req, res) {
        client.get("selfdestruct", function (err, value) {
            console.log(value);
            res.send(value);
        });
});

app.get('/set', function (req, res) {
        var message = "this message will self destruct in 10 seconds";
        // if (err) throw err
        // res.writeHead(200, {'content-type':'text/html'});
        client.set("selfdestruct", message);
        client.expire("selfdestruct", 10);
        client.get("selfdestruct", function (err, value) {
            res.send("KEY selfdestruct SET TO " + value);
        })
});

// /set/:message to post params
app.get('/set/:message', function (req, res) {
        client.get("setMessageFlag", function(err, reply) {
            if (reply == 1) {
                var message = req.params.message;
                client.set("selfdestruct", message);
                client.expire("selfdestruct", 10);
                client.get("selfdestruct", function (err, value) {
                    res.send("KEY selfdestruct SET TO " + value);
                });
            } else {
                res.send("FEATURE FLAG setMessageFlag OFF, FEATURE DISABLED");
            }
        });
});

var server = app.listen(PORT, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
});

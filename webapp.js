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
    var message = "Hellow World";
    client.exists('featureFlag', function(err, reply) {
        if (reply === 1) {
            message = "NEW FEATURE";
        } else {
            console.log('feature flag off');
        }
    });
    res.send(message);
});

var server = app.listen(PORT, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
});

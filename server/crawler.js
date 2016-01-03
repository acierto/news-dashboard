var loki = require('lokijs');

var db = new loki('news.json');
var Crawler = require("crawler");

var korrespondent = require('./scrappers/korrespondent');

const articles = db.addCollection('articles');

const c = new Crawler({
    maxConnections: 10,
    callback: function (error, result, $) {
        korrespondent.parse($, articles);
    },
    onDrain: function() {
        db.saveDatabase();
    }
});

c.queue(korrespondent.url);
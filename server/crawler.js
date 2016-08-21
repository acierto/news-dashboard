const loki = require('lokijs');

const db = new loki('news.json');
const Crawler = require("crawler");

const korrespondent = require('./scrappers/korrespondent');

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
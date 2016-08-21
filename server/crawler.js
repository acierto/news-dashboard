import loki from 'lokijs';

import Crawler from 'crawler';
import korrespondent from './scrappers/korrespondent';

const db = new loki('news.json');

const articles = db.addCollection('articles');

const c = new Crawler({
    maxConnections: 10,
    callback: function (error, result, $) {
        korrespondent.parse($, articles);
    },
    onDrain: function () {
        db.saveDatabase();
    }
});

c.queue(korrespondent.url);
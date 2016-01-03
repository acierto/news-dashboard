const url = 'http://korrespondent.net/';

module.exports = {

    url: url,

    parse: function ($, articles) {
        $('div.time-articles div.article').each(function (index, div) {

            var time = $(div).find(".article__time").text();
            var title = $(div).find(".article__title").text();
            var href = $(div).find(".article__title a").attr('href');

            articles.insert({url: url, time: time, title: title, href: href});

            console.log(time, title, href);
        });
    }
};
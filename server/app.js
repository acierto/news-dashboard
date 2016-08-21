import compression from 'compression';
import express from 'express';
import redirect from 'express-redirect';
import path from 'path';

export const app = express();

app.use(compression());

redirect(app);

app.get('/heartbeat', function (req, res) {
    res.status(200).json('OK');
});

app.get('/news', function (req, res) {
    res.status(200).json(require('./news.json'));
});

app.redirect('/', '/build');

const __parentDir = path.dirname(module.parent.filename);
app.use(express.static(__parentDir));

const port = process.env.PORT || 3000;

app.server = app.listen(port, function () {
    console.log('Express app listening at port %s', app.server.address().port);
});
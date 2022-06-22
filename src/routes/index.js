const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // route
    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
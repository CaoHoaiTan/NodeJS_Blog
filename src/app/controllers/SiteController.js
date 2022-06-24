const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongooes');
class SiteController {
  // [GET] /home
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        courses = multipleMongooseToObject(courses);
        res.render('home', { courses });
      })
      .catch((err) => next(err));
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();

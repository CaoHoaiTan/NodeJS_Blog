const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongooes');
class MeController {
  // [GET] /me//stored/courses
  storedCourses(req, res) {
    Course.find({})
      .then((courses) =>
        res.render('me/storedCourses', {
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch((err) => {});
  }
}

module.exports = new MeController();

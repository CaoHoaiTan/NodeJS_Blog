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

  // [GET] me/trash/course
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render('me/trashCourses', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();

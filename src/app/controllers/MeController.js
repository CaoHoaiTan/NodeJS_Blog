const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongooes');
class MeController {
  // [GET] /me//stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});
    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render('me/storedCourses', {
          courses: multipleMongooseToObject(courses),
          deletedCount,
        });
      })
      .catch(next);
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

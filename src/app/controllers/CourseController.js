const Course = require('../models/Course');
const {
  multipleMongooseToObject,
  MongooseToObject,
} = require('../../util/mongooes');
class CourseController {
  // [GET] /show
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        course = MongooseToObject(course);
        res.render('courses/show', { course });
      })
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect('/'))
      .catch((err) => {});
  }
}

module.exports = new CourseController();

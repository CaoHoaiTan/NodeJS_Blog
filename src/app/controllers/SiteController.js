const Course = require('../models/Course');
class SiteController {
  // [GET] /home
  index(req, res) {
    Course.find({}, function (err, Course) {
      if (!err) {
        res.json(Course);
        return;
      }
      res.status(400).json({ error: 'message' });
    });
    // res.render('home');
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();

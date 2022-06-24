const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, default: '', maxLength: 255, require: true },
    description: { type: String, default: '', maxLength: 600 },
    image: { type: String, default: '', maxLength: 255 },
    slug: { type: String, maxlength: 255, slug: 'name', unique: true },
    videoId: { type: String, default: '' },
    level: { type: String, default: 'Trình độ cơ bản' },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Course', Course);

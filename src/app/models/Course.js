const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, default: '', maxLength: 255, require: true },
    description: { type: String, default: '', maxLength: 600 },
    image: { type: String, default: '', maxLength: 255 },
    slug: { type: String, maxlength: 255, slug: 'name', unique: true },
    videoId: { type: String, default: '' },
    level: { type: String, default: 'Trình độ cơ bản' },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

mongoose.plugin(slug);
//soft delete
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);

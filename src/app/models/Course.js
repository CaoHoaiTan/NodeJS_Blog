const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, default: '', maxLength: 255, require: true },
    description: { type: String, default: '', maxLength: 600 },
    image: { type: String, default: '', maxLength: 255 },
    slug: { type: String, maxlength: 255, slug: 'name', unique: true },
    videoId: { type: String, default: '' },
    level: { type: String, default: 'Trình độ cơ bản' },
    deleted: { type: Boolean, default: false },
  },
  {
    _id: false,
    // createdAt, updatedAt
    timestamps: true,
  },
);

mongoose.plugin(slug);
Course.plugin(AutoIncrement);
//soft delete
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);

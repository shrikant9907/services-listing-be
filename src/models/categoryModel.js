const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
        }
    },
    { timestamps: true }
);

const Category = model('Category', categorySchema);

module.exports = Category;

const { Schema, model } = require("mongoose");

const businessSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        location: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
            default: null,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        contact: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Business = model('Business', businessSchema);

module.exports = Business;

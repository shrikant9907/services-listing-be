const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        postalCode: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const Location = model('Location', locationSchema);

module.exports = Location;

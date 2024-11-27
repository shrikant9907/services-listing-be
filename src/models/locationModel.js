const { Schema, mongoose } = require("mongoose");

const SchemaObject = {
    title: {
        type: String,
        require: true
    },
}

const shortUrlSchema = new Schema(SchemaObject, { timestamps: true })

const ShortURL = mongoose.model('Location', shortUrlSchema);
module.exports = ShortURL; 
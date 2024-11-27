const { Schema, default: mongoose } = require("mongoose");

const SchemaObject = {
    originalUrl: {
        type: String,
        require: true
    },
    shortUrl: {
        type: String,
    }
}

const shortUrlSchema = new Schema(SchemaObject, { timestamps: true })

const ShortURL = mongoose.model('ShortURL', shortUrlSchema);
module.exports = ShortURL;
// export default Model .mjs
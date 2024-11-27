import mongoose, { Schema } from 'mongoose';

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

const TESTShortURL = mongoose.model('ShortURL', shortUrlSchema);
export default TESTShortURL;
const { Schema, mongoose } = require("mongoose");

const SchemaObject = {
    title: {
        type: String,
        require: true
    },
}

const locationSchema = new Schema(SchemaObject, { timestamps: true })

const Location = mongoose.model('Location', locationSchema);
module.exports = Location; 
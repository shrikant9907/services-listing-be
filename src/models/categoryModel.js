const { Schema, mongoose } = require("mongoose");

const SchemaObject = {
    title: {
        type: String,
        require: true
    },
}

const categorySchema = new Schema(SchemaObject, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);
module.exports = Category; 
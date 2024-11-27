const { Schema, mongoose } = require("mongoose");

const SchemaObject = {
    title: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    }
}

const serviceSchema = new Schema(SchemaObject, { timestamps: true })

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service; 
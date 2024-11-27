const ReviewSchema = new Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business', // References the Business model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Review', ReviewSchema);

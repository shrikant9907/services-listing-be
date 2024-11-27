const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        await mongoose.connect(connectionString);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Could not connect to Database', error);
        process.exit(1);
    }

}

module.exports = connectDatabase;
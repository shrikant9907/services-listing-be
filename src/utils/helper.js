// Helper function to generate a short string
const getShortString = (maxLimit = 11) => {
    return Math.random().toString(36).substring(3, maxLimit);
};

module.exports = {
    getShortString
}
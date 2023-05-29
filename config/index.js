require('dotenv').config();

const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 3001,
    },
    db: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/user-admin-db',
    },
}

module.exports = dev;
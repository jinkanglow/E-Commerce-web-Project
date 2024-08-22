const app = require('./utils/app');
const connectDatabase = require('./config/database');
require('dotenv').config();

// Connect to the database
connectDatabase();

// Start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

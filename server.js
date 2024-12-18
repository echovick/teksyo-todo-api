const dotenv = require("dotenv");

// load data from the config.env file into the application
dotenv.config({ path: "./config.env" });

// Load the app
const app = require('./app');

// Get the port
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`App is running on http://127.0.0.1:${port}`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
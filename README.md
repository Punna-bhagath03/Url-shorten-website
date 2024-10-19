# Url-shorten-website
# URL Shortener

A simple URL shortener built using Node.js, Express, MongoDB, and EJS. This application allows users to shorten long URLs and track how many times the shortened URLs are clicked.

## Features
- Shorten long URLs
- Track the number of clicks on shortened URLs
- Simple UI using EJS templates

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or in the cloud)

Usage

	•	Enter a full URL in the input field and click “Shrink” to generate a shortened URL.
	•	The main page displays a table of shortened URLs and their click counts.
	•	When visiting a shortened URL, it will redirect you to the original full URL and increment the click count.

Technologies Used

	•	Node.js: For backend logic and server-side routing
	•	Express: For creating the server and routing
	•	MongoDB: For storing URL data
	•	Mongoose: For managing MongoDB database schemas
	•	EJS: For rendering templates on the frontend
	•	ShortId: For generating unique shortened URLs

# To-Do List API and Cat Facts Fetcher
## Overview
This repository contains three Python projects, each in the same folder:
To-Do List Flask API: A RESTful API for managing a to-do list.
Basic Cat Facts Fetcher: Fetches random cat facts.
Advanced Cat Facts Fetcher: Demonstrates robust error handling for HTTP requests, including timeouts and connection issues.

## How to Run Each Project

**1. To-Do List Flask API**
Navigate to the folder containing the Flask API script.
Install Flask:
pip install flask
Run the server:
python app.py
Access the API at http://127.0.0.1:5000.

**API Endpoints**
GET /: Welcome message.
GET /tasks: Fetch all tasks.
POST /tasks: Add a new task (requires JSON data).
PUT /tasks/<task_id>: Update a task by ID.
DELETE /tasks/<task_id>: Delete a task by ID.
Using Postman
Use HTTP methods (GET, POST, PUT, DELETE) with the API:

**2. Basic Cat Facts Fetcher**
Navigate to the folder containing the Task2.py script.
Run the script:
python Task2.py

Features
Fetches random cat facts from the Cat Facts API.
Handles basic request errors, such as invalid responses.

**3. Advanced Cat Facts Fetcher**
Navigate to the folder containing the Task3.py script.
Run the script:
python Task3.py

Features
Fetches random cat facts and handles:
Timeouts: Set a short timeout to simulate delays.
Connection Errors: Disconnect from the internet to test.
HTTP Errors: Modify the API URL to an invalid endpoint.

**Requirements**
Python 3.8+

**Libraries:**
Flask (for To-Do List API)
requests (for both Cat Facts Fetchers)

# Health Profile Manager

## Overview

Health Profile Manager is a full-stack web application that allows users to create, read, update, and delete health profiles. It provides a simple interface for managing user health information including name, email, age, weight, height, and health goals.

## Technologies Used

- Backend: Node.js, Express.js, Firebase (Firestore)
- Frontend: HTML5, CSS3, JavaScript (React)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm (Node Package Manager) installed
- A Firebase account and a Firebase project set up
- Basic knowledge of JavaScript and React

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/health-profile-manager.git
   cd health-profile-manager

2. Install dependencies:
  ```bash
npm install

3. Set up environment variables: Create a .env file in the root directory with the following content:
  ```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-firebase-client-email@your-project-id.iam.gserviceaccount.com
PORT=3000

 Replace the placeholder values with your actual Firebase project details.

4. Start the application:
  ```bash
node health-profile-manager.js
Open a web browser and navigate to http://localhost:3000.

5. Usage
### Adding a user:

- Fill in the form fields (Name, Email, Age, Weight, Height, Health Goals)
- Click the "Add User" button
- Viewing users:

- Scroll down to see the list of all users
- Updating a user:

- Click the "Edit" button on a user card
- Modify the details in the form
- Click the "Update User" button
- Deleting a user:

- Click the "Delete" button on a user card

## API Endpoints
- POST /api/users: Create a new user
- GET /api/users: Retrieve all users
- GET /api/users/:id: Retrieve a specific user
- PUT /api/users/:id: Update a user
- DELETE /api/users/:id: Delete a user

## Project Structure
- The entire application is contained in a single file health-profile-manager.js. This file includes:
- Express server setup
- Firebase configuration
- API routes for CRUD operations
- Frontend React application (embedded as a string and served as a static file)

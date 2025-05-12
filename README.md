# Full-Stack Learning Platform Application

This project is a full-stack web application designed as a learning platform. It includes features for user authentication, course management, lessons, quizzes, and a chatbot.

## Project Structure

```
fullstack_app/
├── backend/                  # Node.js Express backend
│   ├── config/               # Database configuration (database.js)
│   ├── controllers/          # Request handlers (courseController.js, userController.js, etc.)
│   ├── models/               # Mongoose schemas (Course.js, User.js, etc.)
│   ├── routes/               # API endpoint definitions (authRoutes.js, courseRoutes.js, etc.)
│   ├── .env                  # Environment variables (MONGODB_URI, JWT_SECRET, etc.)
│   ├── package.json
│   └── server.js             # Main backend server file
└── frontend/                 # React frontend
    ├── public/
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── contexts/         # React Context API (AuthContext.js)
    │   ├── pages/            # Page-level components (HomePage.js, LoginPage.js, etc.)
    │   ├── utils/            # Utility functions (api.js, authUtils.js)
    │   ├── App.js            # Main application component
    │   ├── index.js          # Entry point for React app
    │   └── ...               # Other React specific files
    ├── package.json
    └── ...                   # Other React project files (e.g., .gitignore)
├── todo.md                   # Task checklist for development
└── README.md                 # This file
```

## Prerequisites

- Node.js (v14.x or later recommended)
- npm (v6.x or later recommended)
- MongoDB (a running instance or a MongoDB Atlas account)

## Setup and Installation

1.  **Clone the repository (or extract the zip file).**

2.  **Backend Setup:**
    ```bash
    cd fullstack_app/backend
    npm install
    ```
    - Create a `.env` file in the `fullstack_app/backend` directory.
    - Add the following environment variables to your `.env` file, replacing placeholder values with your actual credentials and settings:
      ```env
      MONGODB_URI=your_mongodb_connection_string
      GEMINI_API_KEY=your_gemini_api_key
      SESSION_SECRET=a_strong_session_secret_key
      FRONTEND_URL=http://localhost:3000
      NODE_ENV=development
      PORT=5000
      # Add any other necessary backend environment variables (e.g., JWT_SECRET if used)
      ```

3.  **Frontend Setup:**
    ```bash
    cd fullstack_app/frontend
    npm install
    ```
    - The frontend expects the backend to be running on `http://localhost:5000`. If your backend is on a different port, you might need to adjust the `API_URL` in `frontend/src/utils/api.js` or configure a proxy in `frontend/package.json`.
    - Ensure the `REACT_APP_API_URL` in `backend/.env` is correctly set if it's used by the frontend (though typically frontend env vars are in `frontend/.env`). For this project, `frontend/src/utils/api.js` directly uses `http://localhost:5000/api`.

## Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd fullstack_app/backend
    npm start
    ```
    The backend server should start on the port specified in your `.env` file (default is 5000).

2.  **Start the Frontend Development Server:**
    ```bash
    cd fullstack_app/frontend
    npm start
    ```
    The React application should open in your browser, usually at `http://localhost:3000`.

## Key Features

- User registration and login
- Profile management
- Course browsing and enrollment (conceptual)
- Lesson and module structure (conceptual)
- Quizzes and questions (conceptual)
- Gemini Chatbot integration

## API Endpoints

The backend exposes several API endpoints under `/api/`:
- `/api/auth/` (for registration, login, logout)
- `/api/users/` (for user profile operations)
- `/api/courses/`
- `/api/lessons/`
- `/api/modules/`
- `/api/questions/`
- `/api/quizzes/`
- `/api/gemini-chat/`

Refer to the route files in `backend/routes/` for detailed endpoint definitions.

## Environment Variables

### Backend (`backend/.env`)
- `MONGODB_URI`: MongoDB connection string.
- `GEMINI_API_KEY`: API key for Gemini services.
- `SESSION_SECRET`: Secret key for session management.
- `FRONTEND_URL`: URL of the frontend application for CORS configuration.
- `NODE_ENV`: Application environment (`development` or `production`).
- `PORT`: Port for the backend server.

### Frontend
- The frontend API calls are hardcoded to `http://localhost:5000/api` in `frontend/src/utils/api.js`. For production, this should ideally be configurable via environment variables (e.g., `.env` file in the `frontend` directory and accessed via `process.env.REACT_APP_API_URL`).

## Notes

- Ensure your MongoDB instance is running and accessible before starting the backend.
- The `authRoutes` file was provided without an extension and has been renamed to `authRoutes.js`.
- The application uses `express-session` for session management.
- CORS is configured to allow requests from `FRONTEND_URL`.
- In a production environment, the backend is set up to serve the static build of the frontend application.


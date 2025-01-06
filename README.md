# Task Management Application

## Project Overview

The Task Management Application is a web-based tool designed to help users efficiently manage their tasks. Users can create, update, delete, and search for tasks, as well as filter tasks based on various criteria. The application features a user-friendly interface and supports pagination for easy navigation through tasks.

## Installation Guide

To set up the Task Management Application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/tm-app.git
   cd tm-app
   ```

2. **Install Dependencies**:
   Make sure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure your environment variables. You may need to set up your API base URL and any other necessary configurations.

4. **Run the Application**:
   Start the development server:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to view the application.

## API Documentation

The application interacts with a backend API for task management. Below are the key API endpoints:

### 1. Get All Tasks
- **Endpoint**: `GET /api/tasks`
- **Query Parameters**:
  - `page`: The page number for pagination (default: 1)
  - `per_page`: The number of tasks per page (default: 10)
  - `search`: A search term to filter tasks by title or description

### 2. Create a New Task
- **Endpoint**: `POST /api/tasks`
- **Request Body**:
  ```json
  {
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending" // or "completed"
  }
  ```

### 3. Update an Existing Task
- **Endpoint**: `PUT /api/tasks/{id}`
- **Request Body**:
  ```json
  {
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "status": "completed" // or "pending"
  }
  ```

### 4. Delete a Task
- **Endpoint**: `DELETE /api/tasks/{id}`

### 5. Get a Single Task
- **Endpoint**: `GET /api/tasks/{id}`

## Front-End URL

The front-end of the Task Management Application can be accessed at the following URL:
- [Task Management Application](http://localhost:3000)

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

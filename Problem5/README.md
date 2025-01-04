# Task Management API

A robust RESTful API built with Express.js and TypeScript for managing tasks. The API includes full CRUD operations, input validation, error handling, and unit testing.

## Features

- CRUD operations for tasks
- Input validation
- Error handling
- Unit testing
- MongoDB integration
- TypeScript implementation

## Built With

- Node.js
- Express.js
- TypeScript
- MongoDB
- Jest (Testing)
- Express Validator

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/Problem5.git
cd Problem5
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/problem5-db
```

4. Start MongoDB service
   - Make sure MongoDB is running on your machine

5. Run the development server
```bash
npm run dev
```

## API Endpoints

### Create Task
- **POST** `/api/tasks`
```json
{
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending",
    "dueDate": "2024-01-10T00:00:00.000Z"
}
```

### Get All Tasks
- **GET** `/api/tasks`
- Query Parameters:
  - status: Filter by status (pending, in-progress, completed)
  - sortBy: Sort by field (createdAt, dueDate, title)

### Get Single Task
- **GET** `/api/tasks/:id`

### Update Task
- **PUT** `/api/tasks/:id`
```json
{
    "title": "Updated Title",
    "status": "completed"
}
```

### Delete Task
- **DELETE** `/api/tasks/:id`

## Input Validation

- Title: Required, 3-100 characters
- Description: Optional, max 500 characters
- Status: Must be one of: pending, in-progress, completed
- Due Date: Required, must be a valid future date

## Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run build` - Build the application
- `npm test` - Run tests

## Project Structure

```
Problem5/
├── src/
│   ├── __tests__/      # Test files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # Route definitions
│   └── app.ts          # App entry point
├── jest.config.js      # Jest configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Author

LE THONG

## License

This project is licensed under the MIT License
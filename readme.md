# Full-Stack Application

This is a full-stack web application with a Deno + Hono backend and a Deno + React frontend. The application handles user authentication, organization management, and user management within organizations.

## Project Structure

### Backend

- Built with Deno + Hono + DrizzleORM
- API endpoints for user authentication and organization management
- Authentication using JWT
- Database migrations and seeding
- Swagger documentation

### Frontend

- React + Vite application
- User authentication (login/logout)
- Dashboard with user management
- Organization management (including creation)
- Pagination for data display

## Setup and Installation

### Prerequisites

- [Deno](https://deno.land/#installation)
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- Node.js and npm

### Steps

1. Create a `.env` files on both frontend and backend folder, based on the provided template

2. Configure the application - install dependencies, run postgres on docker, apply migrations and seed database:

```bash
deno run configure
```

3. Run the application:

```bash
deno run dev
```

The frontend will be available at [`http://localhost:5173`](http://localhost:5173) and the backend at [`http://localhost:3000`](http://localhost:3000)

The swagger documentation will be available at [`http://localhost:3000/docs`](http://localhost:3000/docs)

## Features

### Authentication

The application includes a complete authentication system:

- Login and registration pages using JWT
- Protected routes using `useAuthenticated` hook
- Public routes using `useAnonymous` hook

### User Management

- User listing with pagination
- Ability to add users to an organization

### Organization Management

- Organization creation via dialog
- Organization user management
- Organization settings

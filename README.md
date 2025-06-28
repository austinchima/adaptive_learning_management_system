<!-- # Adaptive Learning Management System

A modern, full-stack learning management system built with TypeScript, React, and ASP.NET Core, designed to provide personalized learning experiences through adaptive learning algorithms.

## Architecture Overview

### Frontend (TypeScript + React)

The frontend is built using TypeScript and React, following a modular and component-based architecture. The application structure is organized as follows:

```bash
client/
├── src/
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── components/     # Reusable UI components
│   ├── config/         # Application configuration
│   ├── courses/        # Course-related components and logic
│   ├── data/          # Data models and types
│   ├── home/          # Home page components
│   ├── interfaces/    # TypeScript interfaces and types
│   ├── lib/           # Utility libraries and helpers
│   ├── navbar/        # Navigation components
│   ├── resources/     # Learning resources components
│   ├── services/      # API services and data fetching
│   ├── settings/      # Application settings
│   └── utils/         # Utility functions
```

#### Key Frontend Features

- Type-safe development with TypeScript
- Component-based architecture using React
- Modern UI with responsive design
- State management using React hooks
- API integration with ASP.NET backend
- Adaptive learning algorithms integration

## Technology Stack

### Frontend

- TypeScript
- React
- Vite (Build tool)
- ESLint (Code linting)
- CSS Modules (Styling)

### Backend

- ASP.NET Core
- Entity Framework Core
- SQL Server
- SignalR
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- .NET 9.0 SDK or higher
- SQL Server
- Git

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Restore NuGet packages:

   ```bash
   dotnet restore
   ```

3. Update the connection string in `appsettings.json`
4. Run database migrations:

   ```bash
   dotnet ef database update
   ```

5. Start the backend server:

   ```bash
   dotnet run
   ```

## Development Guidelines

### Frontend Development

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write unit tests for components
- Follow the established folder structure

### Backend Development

- Follow C# coding conventions
- Implement proper exception handling
- Use async/await for I/O operations
- Write unit tests for services
- Document API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. -->

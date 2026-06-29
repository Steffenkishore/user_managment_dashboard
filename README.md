# User Management Dashboard

A modern and responsive **User Management Dashboard** built with **React, TypeScript, Tailwind CSS, React Router, Axios, and React Context API**. The application allows users to perform complete CRUD (Create, Read, Update, Delete) operations while providing filtering, searching, sorting, loading states, and toast notifications for an improved user experience.

---

## Features

- Create a new user
- View user details
- Update existing users
- Delete users
- Search users by name
- Filter users by:
  - First Name
  - Last Name
  - Department
- Sort users by:
  - First Name (A-Z / Z-A)
  - Last Name (A-Z / Z-A)
- Responsive dashboard UI
- Global state management using React Context API
- Loading states
- Toast notifications using React Toastify
- TypeScript support
- Clean and reusable component architecture

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- React Context API
- Axios
- React Toastify
- React Icons

### Backend/API

- JSON Server (Mock REST API)

---

## Project Structure

```
src/
│
├── components/
│   ├── UserForm.tsx
│   ├── UserList.tsx
│   ├── ViewUser.tsx
│   ├── EditForm.tsx
│   ├── FilterSelect.tsx
│   └── Loading.tsx
│
├── context/
│   └── UserContext.tsx
│
├── services/
│   └── addUser.service.ts
│   └── api.service.ts
│   └── delUser.service.ts
│   └── getUser.service.ts
│   └── updateUser.service.ts
│
├── types/
│   └── types.ts
│
├── App.tsx
└── main.tsx
```

---

# Getting Started

## Prerequisites

Make sure you have installed:

- Node.js (v18 or later recommended)
- npm

---

## Installation

Clone the repository.

```bash
git clone https://github.com/your-username/user-management-dashboard.git
```

Navigate into the project.

```bash
cd user-management-dashboard
```

Install dependencies.

```bash
npm install
```

---

## Running the Mock API

This project uses **JSON Server** as the backend.

Start the JSON Server:

```bash
npx json-server --watch db.json --port 3000
```

The API will run at:

```
http://localhost:3000
```

---

## Running the React Application

Start the development server.

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# Available Functionality

### Add User

Create a new user using the form.

---

### View User

View complete information of a selected user.

---

### Edit User

Modify existing user information.

---

### Delete User

Delete a user from the dashboard.

---

### Search

Search users using their first or last name.

---

### Filters

Filter users by:

- First Name
- Last Name
- Department

---

### Sorting

Sort users by:

- First Name (Ascending)
- First Name (Descending)
- Last Name (Ascending)
- Last Name (Descending)

---

### Loading States

The application displays loading indicators while asynchronous API operations are in progress.

---

### Toast Notifications

React Toastify is used to display feedback for:

- User added successfully
- User updated successfully
- User deleted successfully
- Validation errors
- API errors

---

# Development Challenges

During the development of this project, several challenges were encountered:

### 1. State Management

Managing user data across multiple components became increasingly complex. This was solved by implementing the **React Context API**, which centralized application state and eliminated excessive prop drilling.

---

### 2. Synchronizing UI with API

Ensuring that the UI immediately reflected API changes after creating, updating, or deleting users required careful state updates to keep the frontend synchronized with the backend.

---

### 3. Filtering, Searching, and Sorting

Combining multiple filters with search functionality and sorting while maintaining clean and readable code required thoughtful data transformation and ordering.

---

### 4. Form Validation

Handling empty fields and displaying meaningful feedback to users required implementing client-side validation before API requests.

---

### 5. User Experience

Providing users with responsive feedback during asynchronous operations was improved by integrating loading indicators and toast notifications.

---

# Improvements with More Time

Given additional development time, the following enhancements would be implemented:

- Pagination for large datasets
- Debounced search to reduce unnecessary filtering
- Confirmation modal before deleting users
- Form validation using React Hook Form and Zod
- Dark mode support
- Unit testing using Jest and React Testing Library
- End-to-end testing with Cypress
- Authentication and authorization
- Backend integration using Node.js and MongoDB instead of a mock JSON server
- Server-side pagination and filtering
- Docker support for easier deployment
- CI/CD pipeline using GitHub Actions
- Accessibility improvements following WCAG guidelines
- Better loading experience using skeleton loaders
- Optimistic UI updates for faster interactions

---

# Future Scope

Potential future enhancements include:

- Role-based access control
- User profile images
- Export users to CSV or Excel
- Import users from CSV
- Dashboard analytics
- Activity logs
- Email notifications
- Audit history
- Advanced search filters

---

# Learning Outcomes

This project helped strengthen my understanding of:

- React functional components
- TypeScript
- Context API
- React Router
- CRUD operations
- REST API integration
- Axios
- State management
- Component reusability
- Tailwind CSS
- Asynchronous programming
- Error handling
- User experience design

---

# Author

**Steffen Kishore**

GitHub: https://github.com/your-github-username

LinkedIn: https://linkedin.com/in/your-linkedin-profile

---
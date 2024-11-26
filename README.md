# User Management System

A React-based user management dashboard that provides role-based access control and permission management.

## 🚀 Features

- **User Management**
  - View all users in a table format
  - Create new users
  - Edit existing users
  - Delete users
  - Filter users by role and status
  - Search users by name or email

- **Role Management**
  - Create and manage roles
  - Assign permissions to roles
  - View user count per role
  - Delete roles

- **Permission Management**
  - Create and manage permissions
  - Group permissions by scope
  - Assign permissions to roles
  - Delete permissions

## 🛠️ Tech Stack

- React 18
- React Icons
- CSS3 with modern features
- Simulated API service

## 📦 Installation

1. Clone the repository:

git clone https://github.com/amogh-55/-RBAC-Admin-Dashboard
cd user-management-system

2. Install dependencies:

npm install


3. Create environment files:

Create `.env` for development:
env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_TITLE=User Management System

Create `.env.production` for production
env
REACT_APP_API_URL=https://your-production-domain.com/api
REACT_APP_ENV=production
REACT_APP_TITLE=User Management System


4. Start the development server:

npm start

## 🚀 Deployment (Netlify)

1. Create a production build:

npm run build

2. Deploy to Netlify:
   - Sign up/Login to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Click "Deploy site"

## 🏗️ Project Structure

ui/
├── src/
│ ├── components/ # React components
│ │ ├── Permissions.js # Permission management
│ │ ├── PermissionForm.js
│ │ ├── Roles.js # Role management
│ │ ├── RoleForm.js
│ │ ├── RolePermissions.js
│ │ └── UserForm.js # User management
│ │
│ ├── context/ # React contexts
│ │ └── PermissionContext.js
│ │
│ ├── services/ # API and services
│ │ └── api.js # Simulated API service
│ │
│ ├── App.js # Main application component
│ └── App.css # Global styles


## 🎯 Features Explanation

### User Management
- Table view of all users with their details
- Create new users with name, email, role, and status
- Edit existing user information
- Delete users with confirmation
- Filter users by role (Admin, Editor, Viewer)
- Filter users by status (Active, Inactive)
- Search functionality for users

### Role Management
- Create roles with name and description
- Assign permissions to roles
- View number of users per role
- Delete roles with confirmation
- Manage role permissions through modal interface

### Permission Management
- Create permissions with name, description, and scope
- Group permissions by scope (Users, Roles, Content, Settings)
- Delete permissions with confirmation
- View permissions in organized table format

## 🔒 Simulated API

The project uses a simulated API service (`services/api.js`) that:
- Mimics real API behavior with artificial delays
- Provides CRUD operations for users, roles, and permissions
- Maintains data consistency during the session
- Simulates error handling and loading states

## 🎨 Styling

The application uses a modern, clean UI with:
- Responsive design
- Orange-based color scheme
- Card-based layouts
- Modal forms for data entry
- Interactive tables
- Loading and error states
- Icon-based navigation

## 🔧 Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App


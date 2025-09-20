# Firestore Todo App Setup

This Angular application demonstrates Firestore integration with CRUD operations for a todo list.

## Features

- ✅ Create new todos
- ✅ Read todos from Firestore (real-time updates)
- ✅ Update existing todos (edit title/description, toggle completion)
- ✅ Delete todos
- ✅ Real-time synchronization across multiple clients

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database:
   - Go to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in test mode" for development
   - Select a location for your database

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 3. Update Configuration

Replace the placeholder values in `src/app/app.config.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id",
  measurementId: "G-XXXXXXXXXX"
};
```

### 4. Install Dependencies

The required packages are already installed:
- `firebase` - Firebase SDK
- `@angular/fire` - AngularFire library

### 5. Run the Application

```bash
npm start
```

The application will be available at `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── todo/
│   │       ├── todo.component.ts
│   │       ├── todo.component.html
│   │       └── todo.component.sass
│   ├── models/
│   │   └── todo.model.ts
│   ├── services/
│   │   └── todo.service.ts
│   ├── app.config.ts
│   ├── app.ts
│   └── app.html
└── firebase.config.ts
```

## Firestore Security Rules

For development, you can use these basic rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{document} {
      allow read, write: if true; // Allow all reads and writes for development
    }
  }
}
```

**⚠️ Important:** These rules allow anyone to read and write to your database. For production, implement proper authentication and security rules.

## Usage

1. **Add Todo**: Enter a title and optional description, then click "Add Todo"
2. **Edit Todo**: Click the "Edit" button on any todo to modify its content
3. **Toggle Completion**: Use the checkbox to mark todos as complete/incomplete
4. **Delete Todo**: Click the "Delete" button to remove a todo
5. **Real-time Updates**: Changes are automatically synchronized across all open browser tabs

## Technologies Used

- Angular 20+ with standalone components
- Firebase Firestore
- AngularFire
- TypeScript
- SASS for styling
- Angular Signals for reactive state management

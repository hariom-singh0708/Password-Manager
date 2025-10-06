# Password-Manager
"It is a secure, intuitive web app for generating, storing, and managing all your passwords in one encrypted vault."


# PassVault - Secure Password Manager

PassVault is a modern, secure, and user-friendly web application that helps you generate, store, and manage passwords for all your accounts in one encrypted vault. Built with the MERN stack, Vite, and Bootstrap, PassVault ensures your credentials are safe and accessible from anywhere.

---

## Features

- **Password Generator**: Create strong, random passwords with customizable options (length, symbols, numbers, uppercase/lowercase).
- **Secure Storage**: Store credentials (title, URL, username, password) securely in an encrypted database.
- **CRUD Operations**: Add, edit, delete, and view your saved passwords.
- **Password Strength Indicator**: Quickly see which passwords are strong or weak.
- **Clipboard Copy**: Copy passwords with one click.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **User Authentication**: Login, register, and manage your own account securely.
- **Dashboard**: View all saved passwords in an organized, user-friendly interface.

---

## Tech Stack

- **Frontend**: React, Vite, Bootstrap, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling & UI**: Bootstrap 5, Icons with Bootstrap Icons

---


## Installation

1. **Clone the repository**
   git clone https://github.com/hariom-singh0708/Password-Manager.git

2. Install backend dependencies
  cd server
  npm install


3. Install frontend dependencies
  cd ../frontend
  npm install


4. Setup environment variables
  Create a .env file in the server directory:

  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret


5. Run the application

  Backend:
  cd server
  npm run dev
  
  Frontend:
  cd frontend
  npm run dev


Open your browser at http://localhost:5173

Folder Structure
passvault/
├─ frontend/          # React + Vite app
├─ backend/            # Express backend
├─ README.md

Usage

Open the app in your browser.

Register a new account.

Log in to access the dashboard.

Generate a password using the generator.

Save your credentials with a title, username, and URL.

View, edit, delete, or copy your saved passwords.

Log out when done.

Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch: git checkout -b feature-name

Make your changes.

Commit: git commit -m "Description of changes"

Push: git push origin feature-name

Create a Pull Request.

License

This project is licensed under the MIT License. See the LICENSE
 file for details.

Author
Hariom Singh

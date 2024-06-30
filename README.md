# Gmail Front-End Application

This repository contains the front-end code for a Gmail-like email application built using React, Formik, Yup, and Bootstrap.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

A live demo of the application can be found [here](https://gmail-fe-clone.netlify.app/).

## Features

- User registration with form validation
- Email auto-generation based on user input
- Responsive design using Bootstrap
- Input validation using Formik and Yup

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RakeshV0498/gmail-clone-frontend.git
   cd gmail-front-end
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Usage

### Registration

The registration form allows users to sign up for a new account. It includes the following fields:

- First Name
- Last Name
- Date of Birth (Day, Month, Year)
- Email (auto-generated or custom)
- Recovery Email
- Password
- Confirm Password

The form performs client-side validation using Formik and Yup.

### Form Validation

Validation rules include:

- All fields are required.
- Email and recovery email must be valid email addresses.
- Password must be at least 6 characters long.
- Confirm Password must match the Password.

### Auto-Generated Emails

Based on the first name and last name provided, the application generates two possible email suggestions. Users can choose one of these suggestions or enter a custom email address.

## Project Structure

The project's structure is as follows:

gmail-front-end/
+---public
| gmail.svg
| \_redirects
|  
\---src
| App.jsx
| main.jsx
| protectedRoute.jsx
| routes.jsx
|  
 +---apis
| | constants.js
| |  
 | +---auth
| | forgotPassword.js
| | login.js
| | register.js
| | resetPassword.js
| |  
 | \---emails
| allEmails.js
| deleteEmail.js
| draftEmail.js
| inbox.js
| sendEmail.js
| sentItem.js
| starEmail.js
| trashEmail.js
| validateEmail.js
|  
 +---assets
| heroImg.webp
| logo-gmail.png
|  
 +---components
| AllEmail.jsx
| ComposeEmail.jsx
| Drafts.jsx
| EmailList.jsx
| EmailView.jsx
| Inbox.jsx
| ReplyMail.jsx
| SecondaryNavbar.jsx
| SentItems.jsx
| Sidebar.jsx
| Starred.jsx
| Trash.jsx
|  
 +---context
| EmailContext.jsx
|  
 +---layouts
| MainLayout.jsx
|  
 +---pages
| ForgotPassword.jsx
| Home.jsx
| Login.jsx
| Navigationbar.jsx
| Register.jsx
| ResetPassword.jsx
|  
 \---styles
App.css
Sidebar.css

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

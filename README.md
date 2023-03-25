# Task Planner

Task Manager is a simple application for managing tasks and sprints. It allows you to create sprints, add tasks to them, and assign those tasks to specific users. You can also change the status of tasks as they progress through the sprint. It uses various technologies such as **_React, Redux, Formik, Yup, MUI, Node.js, Express.js, MongoDB, mongoose, Joi, Oauth, Nodemailer, JWT, Redis, multer,_** _and_ **_Bcrypt_** for implementation.

## Features

The project comes with the following features:

### **1. User Registration and Login**

This project provides a user registration and login feature, which allows users to create an account, log in, and access their account information.

<ins>User Registration</ins>

To register as a new user, the user must provide their name, email, and password. The email address is used to verify the user's identity and prevent spam or fraudulent registrations. The password is encrypted using bcrypt to ensure that it is stored securely.

Once the user has registered, they will receive a verification email with a link to verify their email address. This step ensures that the user has access to the email address they provided and helps to prevent fake or spam accounts.

<ins>User Login</ins>

To log in, the user must enter their email address and password. The email address is used to identify the user, and the password is verified using bcrypt to ensure that it matches the password stored in the database.

If the user enters the correct email address and password, they will be authenticated and granted access to their account. A JWT (JSON Web Token) is generated and stored in a cookie, which is used to authenticate subsequent requests.

### **2. Google Authentication**

This project allows users to authenticate themselves with Google authentication. This feature is implemented using OAuth, which is a standard protocol for authentication and authorization.

<ins>How Google Authentication Work<ins>

OAuth is an open standard for authorization that allows third-party applications to access user data without requiring the user to disclose their login credentials. This allows users to log in to applications using their Google accounts.

When a user logs in with Google, the application sends a request to the Google OAuth server, which prompts the user to log in and authorize the application. Once the user has logged in and authorized the application, the OAuth server sends an access token to the application, which can then use the token to access the user's data.

### **3. OTP Verification for Email Verification**

When a user registers on the platform(without Google), they are required to verify their email address. The verification process involves sending an OTP (One-Time Password) to the user's email address. The user then enters the OTP on the platform to verify their email address.

<ins>The OTP verification process is implemented using the following technologies:</ins>

- Nodemailer for sending emails
- Joi for validating user input
- Bcrypt for hashing OTPs before storing them in db.

<ins>OTP Verification Workflow</ins>

- When a user registers on the platform, they are required to provide their email address.
- The platform generates a random OTP and sends it to the user's email address using Nodemailer.
- The user enters the OTP on the platform and submits it for verification.
- The platform validates the user input using Joi to ensure that the OTP is in the correct format.
- The platform retrieves the OTP from db using the email address as the key.
- The platform compares the OTP entered by the user with the one retrieved from db.
- If the OTPs match, the platform marks the email address as verified in the database and deletes the OTP from db.
- If the OTPs do not match, the platform returns an error message to the user.

### **4. Refresh Tokens with Axios Interceptors and Cookies**

This project uses Axios interceptors and cookies to implement refresh tokens for improved security of user authentication.

<ins>How Refresh Tokens Work</ins>

When a user logs in or authenticates, the server generates an access token and a refresh token. The access token is a short-lived token that is used to authenticate the user for a limited period of time. The refresh token is a longer-lived token that is used to obtain a new access token when the original access token expires.

When the user's access token expires, the client sends a request to the server to obtain a new access token with the help of axios interceptor. The server verifies the user's refresh token and generates a new access token, which is then sent back to the client. This process is transparent to the user and does not require the user to re-authenticate.

### **5. Logout Feature with Redis**

This project provides a logout feature that allows users to log out of their account and invalidate their JWT. To implement this feature, we use Redis to store a list of blacklisted JWTs that have been invalidated.

<ins>How it works</ins>

When a user logs in, a JWT is generated and stored in a cookie. The JWT contains a payload with the user's ID and name, which is used to authenticate the user for subsequent requests.

When the user logs out, their JWT is added to a Redis set called blacklist, which contains all the JWTs that have been invalidated. This set is checked on every subsequent request to ensure that the user's JWT has not been blacklisted.

If the JWT is found in the blacklist set, the user will be redirected to the login page and prompted to log in again. This ensures that even if someone gains access to the user's JWT, they will not be able to use it to access the user's account.

### **6. Reset Password Feature**

This project also includes a reset password feature. When a user forgets their password, they can request a password reset by providing their email address. An email is then sent to the user's email address containing a link to reset their password. The link contains a unique ticket that is valid for a limited time. The user clicks on the link to reset their password.

<ins>The reset password process is implemented using the following technologies:</ins>

- Nodemailer for sending emails
- Joi for validating user input
- db for storing tokens temporarily
- Bcrypt for hashing passwords

<ins>Reset Password Workflow</ins>

- When a user clicks on the "Forgot Password" link, they are required to provide their email address.
- The platform generates a random password reset ticket and sends it to the user's email address using Nodemailer.
- The user clicks on the password reset link in the email.
- The platform validates the password reset ticket included in the link using Joi to ensure that it is in the correct format.
- The platform retrieves the password reset ticket from db using the email address as the key.
- The platform compares the password reset ticket included in the link with the one retrieved from db.
- If the tickets match, the user is allowed to reset their password.
- If the tickets do not match, the platform returns an error message to the user.
- The user enters their new password and submits it for verification.
- The platform hashes the new password using Bcrypt and updates the user's password in the database.

## Installation and Setup

To get started with the project, you will need to have the following installed on your local machine:

- Node.js
- npm or yarn package manager
- MongoDB

After installing the required software, follow the steps below to set up and run the project:

Installation
Clone this repository to your local machine by running the below command:

```
git clone https://github.com/hashmat-noorani/task-planner.git
```

Install the dependencies by running the command:

```
npm install.
```

Create a .env file in the root directory and add the required environment variables. Refer to the .env.example file for the list of variables required.

Start the application by running the command:

```
npm start.
```

The application will be running on http://localhost:3000/.

Run the following command to start the development server:

```
npm run dev
```

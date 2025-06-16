- npm i dotenv , cors , express , bcrypt , jsonwebtoken , mongoose, express-validator

-   const dotenv = require('dotenv');
    dotenv.config();

always on the top

# Step 2
- Creating models, 1. User cause hme user authentication bnaani h 
- socketId: for livetracking of driver, so that we can share user the location of captian
- now add methods in usermodels like , HASHPASSWORD etc.
- usermodel ko create krne kae baad ham usko require karenge controllers mai. Basically ham routes create krenge but unka logic ham controllers mai likhenge

## User
- creating (routes) , register 
- to validate the data that we get from frontend (example the data we'll get at register route) , we will use package "EXPRESS-VALIDATOR"
- user ko create or register krne ke logic ko hm controller kae form mai likh rhe honge
- user ko create krne mai involve ho rha hai mongoDb issliye "userService" 
- user create krne kae liye hmai - 1.firstname 2.lastname 3.email 4.password

## Diving Deeper: Code Structure and How It All Works Together

Let's break down the code and see how each part contributes to the user registration process. Think of it like building a house: each layer has a specific job, and they all need to work together.

### 1. The Blueprint: User Model (models/user-models.js)

-   This is where we define what a "user" looks like in our database. It's like the blueprint for a house, specifying what rooms (fields) it has:
    -   `fullname`:  First and last names combined.
    -   `email`:  The user's email address (must be unique).
    -   `password`:  The user's password (stored securely, more on that later).
    -   `socketId`:  Used for real-time communication (like tracking the driver's location).
-   **Important Methods:**
    -   `generateAuthToken()`: Creates a special key (JWT) that identifies the user after they log in. This key is like a temporary ID card, allowing them to access certain parts of the app.
    -   `comparePassword(password)`: Checks if the password the user entered matches the one stored in the database (after it's been securely compared).
    -   `hashPassword(password)`:  This is how we protect the user's password.  Instead of storing the actual password, we scramble it using a technique called "hashing." This makes it very difficult for hackers to steal passwords.

### 2. The Delivery Routes: User Routes (routes/userRoutes.js)

-   This file defines the different "paths" (or endpoints) that users can take to interact with our application. Think of it like a delivery service: each route is a different address where you can send or receive information.
-   **`/register` Route:** This is the path users take when they want to create a new account.
    -   **Validation:** Before we even start creating the user, we use `express-validator` to make sure the information they provided is valid (e.g., a real email address, a strong password). This is like checking the package before you ship it to make sure it's not damaged.
    -   **Controller Handoff:** Once the information is validated, we hand it off to the `userController` to handle the actual registration process.

### 3. The Brains of the Operation: User Controller (controllers/userController.js)

-   This is where the main logic happens. The controller receives requests from the routes, processes them, and sends back responses.
-   **`registerUser(req, res, next)`:** This function handles the user registration process step-by-step:
    1.  **Validation Check:**  It double-checks that the information is valid.
    2.  **Existing User Check:** It makes sure that no other user has already registered with the same email address.
    3.  **Password Hashing:** It uses the `hashPassword` method from the `userModel` to securely hash the user's password.
    4.  **User Creation:** It calls the `userService` to actually create the user in the database.
    5.  **Token Generation:** It generates a JWT token for the new user.
    6.  **Response:**  Finally, it sends back a success message to the user, including their token and user details.

### 4. The Database Expert: User Service (services/userService.js)

-   This layer is responsible for talking to the database. It keeps the controller clean and focused on the main logic.
-   **`createUser({ firstname, lastname, email, password })`:** This function takes the user's information and creates a new user record in the MongoDB database.

### Putting It All Together: The Registration Flow

1.  **User fills out the registration form** on the frontend and submits it.
2.  **The request travels to the `/register` route** in `userRoutes.js`.
3.  **The route validates the data** using `express-validator`.
4.  **The request is passed to the `registerUser` function** in `userController.js`.
5.  **The controller checks for an existing user** with the same email.
6.  **The controller hashes the password.**
7.  **The controller calls the `createUser` function** in `userService.js` to create the user in the database.
8.  **The controller generates a JWT token** for the new user.
9.  **The controller sends a response** back to the frontend with the token and user details.
10. **The frontend stores the token** and uses it to authenticate future requests.

This is a simplified explanation, but hopefully, it gives you a better understanding of how the code works together!

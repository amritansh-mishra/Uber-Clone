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

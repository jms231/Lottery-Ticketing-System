/*used the following link as a reference for the authentication server. Citation: 
Clerk. "Building a React Login Page Template." Clerk Blog, Clerk, 
https://clerk.com/blog/building-a-react-login-page-template.*/

const express = require("express")
const bcrypt = require("bcrypt")
var cors = require('cors')
const jwt = require("jsonwebtoken")
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("./database.json");
var db = low(adapter);

// Initialize Express app
const app = express()

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = "dsfdsfsdfdsvcsvdfgefg"

// Set up CORS and JSON middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic home route for the API
app.get("/", (_req, res) => {
    res.send("Auth API.\nPlease use POST /auth & POST /verify for authentication")
})

// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  // Look up the user entry in the database
  const user = db.get("users").value().filter(user => email === user.email)

  // If found, compare the hashed passwords and generate the JWT token for the user
  if (user.length === 1) {
      bcrypt.compare(password, user[0].password, function (_err, result) {
          if (!result) {
              return res.status(401).json({ message: "Invalid password" });
          } else {
              let loginData = {
                  email,
                  admin: user[0].admin, 
                  signInTime: Date.now(),
              };

              const token = jwt.sign(loginData, jwtSecretKey);
              res.status(200).json({ message: "success", token, admin: user[0].admin });
          }
      });
  } else if (user.length === 0) {
      // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
      bcrypt.hash(password, 10, function (_err, hash) {
          console.log({ email, password: hash, firstName, lastName, address, admin })
          db.get("users").push({ email, password: hash, firstName, lastName, address, admin, tickets: [] }).write()

          let loginData = {
              email,
              admin,  
              signInTime: Date.now(),
          };

          const token = jwt.sign(loginData, jwtSecretKey);
          res.status(200).json({ message: "success", token, admin });
      });
  }
})

// The verify endpoint that checks if a given JWT token is valid
app.post('/verify', (req, res) => {
    const tokenHeaderKey = "jwt-token";
    const authToken = req.headers[tokenHeaderKey];
    try {
      const verified = jwt.verify(authToken, jwtSecretKey);
      if (verified) {
        return res
          .status(200)
          .json({ status: "logged in", message: "success" });
      } else {

        return res.status(401).json({ status: "invalid auth", message: "error" });
      }
    } catch (error) {
    
      return res.status(401).json({ status: "invalid auth", message: "error" });
    }

})


app.post("/purchase-ticket", (req, res) => {
  const { email, ticketDetails } = req.body;

  // Find the user 
  const user = db.get("users").find({ email }).value();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Append the ticket array
  user.tickets.push(ticketDetails);

  // Update the database
  db.write();

  res.status(200).json({ message: "Ticket purchased successfully", user });
});

// An endpoint to see if there's an existing account for a given email address
app.post('/check-account', (req, res) => {
    const { email } = req.body

    console.log(req.body)

    const user = db.get("users").value().filter(user => email === user.email)

    console.log(user)
    
    res.status(200).json({
        status: user.length === 1 ? "User exists" : "User does not exist", userExists: user.length === 1
    })
})
// endpoint to fetch user tickets
app.post('/get-user-tickets', (req, res) => {
  const { email } = req.body;

  // Find the user in the database
  const user = db.get('users').find({ email }).value();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userTickets = user.tickets || [];

  res.status(200).json({ tickets: userTickets });
});
// An endpoint for sign-up
app.post("/auth/signup", (req, res) => {
  const { firstName, lastName, address, email, password, admin } = req.body;

  // Check if the user already exists
  const userExists = db.get("users").find({ email }).value();
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password and create a new user
  bcrypt.hash(password, 10, function (_err, hash) {
    db.get("users")
      .push({ firstName, lastName, address, email, password: hash, admin, tickets: [] })
      .write();

    let loginData = {
      email,
      admin, 
      signInTime: Date.now(),
    };
    console.log("loginData:", loginData);
    const token = jwt.sign(loginData, jwtSecretKey);

    res.status(200).json({ message: "success", token, admin });
  });
});

app.listen(3080)
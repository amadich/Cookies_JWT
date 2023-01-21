const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = require("./config/port");

const Accunets = require("./models/accunets");


app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://" , {useNewUrlParser: true, useUnifiedTopology: true})

app.post('/api/login', async (req, res) => {
    // Authenticate user
    const user = await authenticate(req.body.email, req.body.pwd);
    if (!user) return res.status(401).send({ message: 'Invalid username or password' });
  
    // Create JWT
    const token = jwt.sign(
        { 
            sub: user._id,
            pwd: user.password
         }
        , 'mysecretkey', { expiresIn: '1h' });
    
    // set the JWT as a cookie
    res.cookie('token', token, { httpOnly: true, secure: true });

    // Send JWT in response
    res.send({ token });
  });


  function authenticate(email, pwd) {
    // Search for a user with the given username
    return Accunets.findOne({ email : email }).then(async (user) => {
        // Compare the provided password with the hashed password in the database
        if (!user) {
            return null
        }
        
        
        const match = await verif(pwd, user.password);
        if (match) {
            return user;
        } else {
            return null;
        }
    });
}
// Test if Password Correct in db!!
function verif(pwd1 , pwd2) {
    if (pwd1 == pwd2) {
        return true
    }

    else return false
}


app.listen(port, () => console.log(`We are listening in ${port} ...`));
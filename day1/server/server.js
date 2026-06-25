require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User');


const app = express();
app.use(cors());
app.use(express.json()); 

//CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to the Guest List (MongoDB)'))
  .catch(err => console.log(err));

const SECRET_KEY = process.env.JWT_SECRET


app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Email might already exist.", error });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by their email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the password matches the scrambled one in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    // Create the VIP Wristband (JWT)
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // Send the wristband back to React
    res.status(200).json({ message: "Login successful!", token: token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server." });
  }
});

// START THE SERVER
app.listen(5000, () => {
  console.log('Bouncer is standing at the door on port 5000...');
});
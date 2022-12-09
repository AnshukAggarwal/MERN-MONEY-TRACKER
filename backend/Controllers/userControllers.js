const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //if any field is empty
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please fill in data in all the fields" });
  }

  //check if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res
      .status(400)
      .json({ message: "User already present, please use a different e-mail" });
  }

  //hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, password: hashedPassword });

  //finally try to save the new user
  try {
    await newUser.save();
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateJWT(newUser._id),
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //check for user's email

  const user = await User.findOne({ email });

  //function to compare password submitted by the user via the login form and the DB

  const comparePassword = async () => {
    return await bcrypt.compare(password, user.password);
  };

  if (user && (await comparePassword())) {
    const { _id, name, email } = user;
    res.status(200).json({
      id: _id,
      name,
      email,
      token: generateJWT(_id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

const getUser = async (req, res) => {
  console.log(req.user);
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

//function to generate JWT

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "20d" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};

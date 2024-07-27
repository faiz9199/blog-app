const prisma = require("../db/prisma");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Store the hashed password
      },
    });

    const token = generateToken(newUser);

    res.status(201).json({
      msg: "User created",
      newUser,
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ err: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ err: "Internal server error" });
  }
};

const getLoggedInUser = async(req, res) => {
  const userId = req.user.id
  try {
    const user = await prisma.user.findUnique({
      where:{id: userId},
    })
    res.status(200).json({msg: "Logged in user", user})
  } catch (error) {
    console.error("Error gettting user:", error);
    res.status(500).json({ err: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser, getLoggedInUser };

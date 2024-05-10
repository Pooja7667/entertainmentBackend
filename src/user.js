const User = require("./model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    const tokenData = {
      id: user._id,
    };
    const token = await jwt.sign(tokenData, "dfbvdkjzfnvkjzdnfvkzdnjf", {
      expiresIn: "1h",
    });

    return res.status(200).cookie("token", token).json({  message: `Welcome back ${user.fname}`,  success: true,});
  } catch (error) {
    console.log(error);
  }
};

// logout.js

const Logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(0), httpOnly: true })
    .json({
      message: "User logged out successfully.",
      success: true,
    })
    .end();
};
 




//register .js
const Register = async (req, res) => {
  try {
    const { fname, email, password } = req.body;
    if (!fname || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "This email is already used",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
      fname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Register, Login, Logout };

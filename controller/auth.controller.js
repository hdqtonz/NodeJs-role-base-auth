const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, password, age, role } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      role,
      age,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create toke
    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    user.token = token;

    res.status(201).send(user);
  } catch (e) {
    res.status(500).send();
  }
};

// * Login route * //
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      user.token = token;

      res.status(200).send(user);
    }
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  userRegister,
  userLogin,
};

import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!email) {
      return res.status(400).send("Email is required");
    } else {
      email = email.trim();
    }

    if (!username) {
      return res.status(400).send("Username is required");
    } else {
      username = username.trim();
    }

    if (!password) {
      return res.status(400).send("Password is required");
    } else {
      password = password.trim();
    }

    const isExistUser = await UserModel.findOne({ email: email }).exec();

    if (isExistUser) {
      return res.status(400).send("User already exists");
    }

    bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
      if (err) res.send("Have error when create account " + err.message);

      const newUser = {
        username: username,
        email: email,
        password: hashedPassword,
      };

      await UserModel.create(newUser);

      res.status(200).send("User created successfully");
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.send("Email not found");
    }

    const hashedPasswordOfUser = user.password;

    bcrypt.compare(password, hashedPasswordOfUser, function (err, result) {
      if (err) res.send(err.message);

      if (result) {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRETKEY,
          { expiresIn: "1h" }
        );
        res.status(200).send(token);
      } else {
        res.status(403).send("Login failed");
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).send("Logout successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { register, login, logout };

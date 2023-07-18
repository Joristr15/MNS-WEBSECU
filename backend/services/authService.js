const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersService = require("./userService");
const user = require("../models/user");

const SALT_ROUNDS = 10;
const JWT_SECRET = require('../controllers/userController');
const key = "6LcOfFEfAAAAAIrUouTq65var1smmy733rl2IVQ6";

function hashPassword(plainTextPassword) {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

function comparePasswords(plainTextPassword, hash) {
  return bcrypt.compare(plainTextPassword, hash);
}

function createToken(data) {
  return jwt.sign({ data },key, {
    expiresIn: "1d",
  });
}

exports.signIn = async (username,password) => {
    const user = await usersService.getUserByUsername(username);
    if (!user) {
      return "ERREUR LOGIN";
    }else if (!user.password) {
      return "ERREUR LOGIN";
    }
    if (await comparePasswords(password, user.password)) {
        delete user.password
        const token = createToken(user);
        return token;
      } else {
        return "ERREUR LOGIN";
      }
}

exports.signUp = async (username, password) => {
    const existingUser = await usersService.getUserByUsername(username);
    if (existingUser) {
      return "ERREUR LOGIN";
    }
    const hashedPassword = await hashPassword(password);
    const newUser = {
      username,
      password: hashedPassword
    };
    const createdUser = await usersService.createUser(newUser);
    const token = createToken(createdUser);
    return token;
};


  


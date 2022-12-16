require("dotenv").config();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const { SECRET } = process.env;

function createToken(username, id) {
  return jwt.sign({
    payload: (username, id),
    secretOrPrivateKey: SECRET,
    options: { expiresIn: "2 days" },
  });
}

module.exports = {
  login: async (req, res) => {
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        if (isAuthenticated) {
          const token = createToken(
            newUser.dataValues.username,
            newUser.dataValues.id
          );
          const exp = new Date.now() + 1000 * 60 * 60 * 48;
          res.send({
            username: newUser.dataValues.username,
            userId: newUser.dataValues.id,
            token: token,
            exp: exp,
          });
        } else {
          console.log("Couldn't log in");
        }
      } else {
        console.log("Couldn't log in");
      }
    } catch (err) {
      console.log(err);
    }
  },

  register: async (req, res) => {
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        res.status(400).send("username already exists");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username,
          hashedPass: hash,
        });
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        const exp = new Date.now() + 1000 * 60 * 60 * 48;
        res.send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token: token,
          exp: exp,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};

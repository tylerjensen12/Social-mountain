const {User} = require("../models/user");
const {Post} = require("../models/post");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (err) {
      console.log(err);
    }
  },

  getCurrentUserPosts: async (req, res) => {
    try {
      const { userId } = req.params;
      const posts = await Post.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (err) {
      console.log(err);
    }
  },

  addPost: async (req, res) => {
    try {
      const { title, content, status, userId } = req.body;
      await Post.create({ title, content, privateStatus: status, userId });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },

  editPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Post.update({ privateStatus: status }, { where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
};

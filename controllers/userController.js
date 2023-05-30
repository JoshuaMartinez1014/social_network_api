const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  async getAllUsers(req, res) {
    try {
      const dbUserData = await User.find();
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getUser(req, res) {
    try {
      const dbUserData = await User.findById(req.params.userId)
        .populate({
          path: "thoughts",
          model: "Thoughts",
        })
        .populate({ path: "friends", model: "User" });

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.status(201).json({ dbUserData });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.status(201).json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true, runValidators: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.status(200).json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndDelete(req.params.userId);

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.status(200).json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.status(200).json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.status(200).json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },
};

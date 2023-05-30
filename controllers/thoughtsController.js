const { Thoughts, User } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const dbThoughtsData = await Thoughts.find({}).populate({
        path: "userId",
        select: "username",
      });
      res.json(dbThoughtsData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleThoughts(req, res) {
    try {
      const dbThoughtsData = await Thoughts.findById(req.params.thoughtId);
      if (!dbThoughtsData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtsData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createThoughts(req, res) {
    try {
      const dbThoughtData = await Thoughts.create(req.body);

      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!updatedUser) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.status(201).json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async updateThoughts(req, res) {
    try {
      const dbThoughtData = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async deleteThoughts(req, res) {
    try {
      const dbThoughtData = await Thoughts.findOneAndDelete(
        { _id: req.params.thoughtId },
        { new: true }
      );
      res.status(200).json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const dbThoughtData = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

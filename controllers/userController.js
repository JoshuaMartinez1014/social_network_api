const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

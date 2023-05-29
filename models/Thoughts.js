const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");
const User = require("./User");

// Define ReactionSchema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format("MM/DD/YYYY"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Schema to create Student model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User", // refers to the User model
    },
    reactions: [ReactionSchema],

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format("MM/DD/YYYY"),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("username").get(function () {
  return User.findById(this.userId).then((user) => user.username);
});

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;

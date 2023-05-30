const { Schema, model, mongoose } = require("mongoose");
const dayjs = require("dayjs");
const User = require("./User");

// Define ReactionSchema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
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
    id: false,
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

thoughtsSchema.virtual("username").get(async function () {
  const User = require("./User");
  const user = await User.findById(this.userId);
  return user.username;
});

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;

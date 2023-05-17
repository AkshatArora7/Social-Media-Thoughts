const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment")

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },

    createdAt: {
      type: Date,
      default: Date.now,

      get: (date) => {return moment(date).format("MM/DD/YYYY hh:mm:ss")}
    },
    username: {

      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
//virtual to get number of reactions as this field is not in database
thoughtSchema.virtual("reactionCount").get(function () {
    return `${this.reactions.length}`;
  });

  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;
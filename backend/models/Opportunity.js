
const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    domain: {
      type: String
    },

    location: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    experience: {
      type: String
    },

    description: {
      type: String,
      required: true
    },

    stipend: {
      type: String
    },

    skills: {
      type: String
    },

    deadline: {
      type: String
    },

    applicationLink: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Opportunity', opportunitySchema);

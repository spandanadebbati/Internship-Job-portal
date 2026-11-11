const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity',
      required: true
    },

    applicantName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    resume: {
      type: String
    },

    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Shortlisted', 'Rejected'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Application', applicationSchema);


const express = require('express');
const router = express.Router();

const Application = require('../models/applications');

// GET - Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('opportunityId')
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching applications',
      error: error.message
    });
  }
});

// POST - Submit an application
router.post('/', async (req, res) => {
  try {
    const {
      opportunityId,
      applicantName,
      email,
      phone,
      resume
    } = req.body;

    if (
      !opportunityId ||
      !applicantName ||
      !email ||
      !phone
    ) {
      return res.status(400).json({
        message: 'Please fill all required fields'
      });
    }

    const newApplication = new Application({
      opportunityId,
      applicantName,
      email,
      phone,
      resume
    });

    const savedApplication = await newApplication.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application: savedApplication
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error submitting application',
      error: error.message
    });
  }
});

// PUT - Update application status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        message: 'Application not found'
      });
    }

    res.status(200).json({
      message: 'Application status updated successfully',
      application: updatedApplication
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating application',
      error: error.message
    });
  }
});

module.exports = router;

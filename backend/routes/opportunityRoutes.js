
const express = require('express');
const router = express.Router();

const Opportunity = require('../models/Opportunity');

// GET - Get all opportunities
router.get('/', async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });

    res.status(200).json(opportunities);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching opportunities',
      error: error.message
    });
  }
});

// GET - Get opportunity by ID
router.get('/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        message: 'Opportunity not found'
      });
    }

    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching opportunity',
      error: error.message
    });
  }
});

// POST - Add new opportunity
router.post('/', async (req, res) => {
  try {
    const newOpportunity = new Opportunity(req.body);

    const savedOpportunity = await newOpportunity.save();

    res.status(201).json({
      message: 'Opportunity added successfully',
      opportunity: savedOpportunity
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error adding opportunity',
      error: error.message
    });
  }
});

// PUT - Update opportunity
router.put('/:id', async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedOpportunity) {
      return res.status(404).json({
        message: 'Opportunity not found'
      });
    }

    res.status(200).json({
      message: 'Opportunity updated successfully',
      opportunity: updatedOpportunity
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating opportunity',
      error: error.message
    });
  }
});

// DELETE - Delete opportunity
router.delete('/:id', async (req, res) => {
  try {
    const deletedOpportunity = await Opportunity.findByIdAndDelete(
      req.params.id
    );

    if (!deletedOpportunity) {
      return res.status(404).json({
        message: 'Opportunity not found'
      });
    }

    res.status(200).json({
      message: 'Opportunity deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting opportunity',
      error: error.message
    });
  }
});

module.exports = router;

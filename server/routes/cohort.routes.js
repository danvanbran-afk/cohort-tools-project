const express = require('express');
const router = express.Router();
const Cohort = require('../models/Cohort.model');

// GET /api/cohorts - Retrieve all cohorts
router.get('/', async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (error) {
    next(error); // Passes the error to our global handler in app.js
  }
});

// POST /api/cohorts - Create a new cohort
router.post('/', async (req, res, next) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    next(error);
  }
});

// GET /api/cohorts/:cohortId - Retrieve a specific cohort by id
router.get('/:cohortId', async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.status(200).json(cohort);
  } catch (error) {
    next(error);
  }
});

// PUT /api/cohorts/:cohortId - Update a specific cohort by id
router.put('/:cohortId', async (req, res, next) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    if (!updatedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.status(200).json(updatedCohort);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cohorts/:cohortId - Delete a specific cohort by id
router.delete('/:cohortId', async (req, res, next) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!deletedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
});

module.exports = router;
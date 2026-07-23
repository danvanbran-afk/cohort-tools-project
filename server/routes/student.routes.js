const express = require('express');
const router = express.Router();
const Student = require('../models/Student.model');

// GET /api/students - Retrieve all students
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

// POST /api/students - Create a new student
router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});

// GET /api/students/cohort/:cohortId - Retrieve all students for a given cohort
router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

// GET /api/students/:studentId - Retrieve a specific student by id
router.get("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
});

// PUT /api/students/:studentId - Update a specific student by id
router.put("/:studentId", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/students/:studentId - Delete a specific student by id
router.delete("/:studentId", async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.studentId);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
});

module.exports = router;
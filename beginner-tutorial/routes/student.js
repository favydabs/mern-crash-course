var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const StudentModel = require("../models/student.model");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("student routes works");
});
router.post("/add", function (req, res, next) {
  let newStudent = new StudentModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    dob: req.body.dob,
    department: req.body.department,
  });
  newStudent.save(function (err, newStudent) {
    if (err) throw err;
    console.log("Student added!");
    res.send("Student added!");
  });
  res.send({
    status: 200,
    message: "student routes works",
    studentObj: newStudent,
  });
  router.get("/list", function (req, res, next) {
    StudentModel.find(function (err, response) {
      if (err) throw err;
      console.log("Student added!");
      res.send("err");
    });
    res.send({
      status: 200,
      student: response,
      studentObj: newStudent,
    });
  });
});
module.exports = router;

const express = require("express");
const otpGenerator = require('otp-generator')
var jwt = require('jsonwebtoken');

const authRoute = express.Router();
let User = require("../model/User");
let Cast = require("../model/Cast");
let Education = require("../model/Education");
let Job = require("../model/Job");
let Intrest = require("../model/Intrest");

// Send OTP
authRoute.route("/send-otp").post(async (req, res) => {
  let userDetail = await User.findOne({
    mobile_number: req.body.mobile_number,
    country_code: req.body.country_code
  })
  let otp =  otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  if(userDetail) {
    userDetail.otp = otp
    await userDetail.save()
  } else {
    req.body.otp = otp
    userDetail = await User.create(req.body)
  }
  res.json({ message: 'User Detail!', data: userDetail })
});

authRoute.route("/verify-otp").post(async (req, res) => {
  let userDetail = await User.findOne({
    mobile_number: req.body.mobile_number,
    country_code: req.body.country_code,
    otp: req.body.otp
  })
  if(userDetail) {
    userDetail.otp = null
    await userDetail.save()
    res.json({message: 'OTP verified!', data: userDetail})
  } else {
    res.status(400).json({ message: 'OTP invalid!', data: null  })
  }
});

authRoute.route("/verify-email").post(async (req, res) => {
  let userDetail = await User.findOne({
    email: req.body.email
  })
  if(userDetail) {
    return res.status(400).json({ message: 'Email Already Exists!!', data: null  })
  }
  res.json({message: 'Valid Email!', data: null})
});

authRoute.route("/casts").get(async (req, res) => {
  let castList = await Cast.find()
  res.json({message: 'Cast List!', data: castList})
});

authRoute.route("/educations").get(async (req, res) => {
  let educationList = await Education.find()
  res.json({message: 'Education List!', data: educationList})
});

authRoute.route("/jobs").get(async (req, res) => {
  let jobList = await Job.find()
  res.json({message: 'Job List!', data: jobList})
});

authRoute.route("/intrests").get(async (req, res) => {
  let IntrestList = await Intrest.find()
  res.json({message: 'Intrest List!', data: IntrestList})
});

authRoute.route("/register").post(async (req, res) => {
  console.log(process.env.JWT_SECRET_KEY)
  let userId = req.body.id
  if(req.files) {
    const { profile_image } = req.files;
    profile_image.mv('./uploads/' + profile_image.name);
    req.body.profile_image = profile_image.name
  }
  req.body.isRegister = true
  req.body.location = {
    type: 'Point',
    coordinates: [req.body.long, req.body.lat]
  }
  let userDetail = await User.findOneAndUpdate({_id: req.body.id}, req.body)
  var token = jwt.sign({ id: userId, email: userDetail.email  }, process.env.JWT_SECRET_KEY);
  res.json({message: 'User Registered', data: {userDetail, token} })
});


module.exports = authRoute;

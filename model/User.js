const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    country_code: {
      type: String,
      default: null
    },
    mobile_number: {
      type: String,
      default: null
    },
    isRegister: {
      type: Boolean,
      default: false
    },
    otp: {
      type: Number
    },
    full_name: {
      type: String,
    },
    type: {
      type: String,
      enum: ['Bride', 'Groom']
    },
    dob: {
      type: Date,
    },
    mother_tongue: {
      type: String,
      enum: ['Hindi', 'English', 'Marathi', 'Gujrati']
    },
    religion: {
      type: String,
      enum: ['Hindu', 'Jain', 'Muslim']
    },
    email: {
      type: String
    },
    marital_status: {
      type: String,
      enum: ['Single', 'Married', 'Divorce']
    },
    height: {
      type: String
    },
    cast: {
      type: mongoose.Types.ObjectId,
    },
    birth_star: {
      type: String,
      enum: ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrighasira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishaka", "Anuradha", "Jyestha", "Moola", "Purvashada", "Uttarashada", "Sharavan", "Dhanishta", "Shatabisha", "Purvabhadra", "Uttarabhadra", "Revati"]
    },
    isDisabled: {
      type: Boolean,
    },
    education: {
      type: mongoose.Types.ObjectId
    },
    job: {
      type: mongoose.Types.ObjectId
    },
    bio: {
      type: String
    },
    food_type: {
      type: String,
      enum: ['Vegetarian', 'Non Vegetarian']
    },
    drinking: {
      type: String,
      enum: ['Casual Drinking', 'Drinker']
    },
    smoking: {
      type: String,
      enum: ['Smoker', 'Non Smoker']
    },
    ideologies: {
      type: String,
      enum: ['Spiritual', 'Atheist']
    },
    intrests: [{
      type: mongoose.Types.ObjectId
    }],
    location: {
      type: {
        type: String
      },
      coordinates: [{
        type: Number
      }]
    },
    profile_image: {
      type: String
    },
  },
  {
    collection: "users",
    timestamps: true
  }
);

module.exports = mongoose.model("User", User);

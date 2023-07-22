const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const JWT_Secret = "TusharAggarwal";
// const validate = validations => {
//     return async (req, res, next) => {
//       for (let validation of validations) {
//         const result = await validation.run(req);
//         if (result.errors.length) break;
//       }

//       const errors = validationResult(req);
//       if (errors.isEmpty()) {
//         return next();
//       }

//       res.status(400).json({ errors: errors.array() });
//       const user = await User.create({ name: req.body.name,
//         email: req.body.email,
//         password: req.body.password });
//     };
//   };

router.post(
  "/createuser",
  [
    body("name", "Enter a Valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 charachters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    //if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success,errors: errors.array() });
    }

    try {
      // check whether with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ success, error: "Sorry user with this email exists" });
      }
      //Create a new Use
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_Secret);

      // .then(user=>res.json(user))
      // .catch(error => console.log(error))
      // res.json({error: 'Please enter a unique value for email'})
      success = true
      res.json( {success, authToken});
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Some error occured");
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        
        return res
          .status(400)
          .json({
            error: "Please try to login with correct email credentials",
          });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {

        return res
          .status(400)
          .json({
            error: "Please try to login with correct password credentials",
          });
          
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_Secret);
      success = true 
      res.json({ success, authtoken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;

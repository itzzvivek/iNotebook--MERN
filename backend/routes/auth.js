const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const JWT_SECRET = "vivekisagoodcoder"
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

//ROUTE 1 : create a user: POST "/api/auth/createuser". no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //check wether the user with this email exists already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10); 
      const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        const data = {
          user:{
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        // res.json(user);
        success = true;
        res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured")
    }
    // then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error: `please enter a unique value for email `, message: err.message})})
    
  }
);

// Route: Authenticate a User using : POST "/api/auth/login". no login required
router.post(
  "/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists()
  ],
  async (req, res) => {
    let success = false;
     // if there are errors, return bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const{email,password} = req.body;
     try {
      let user = await User.findOne({email});
      if (!user){
        success= false
        return res.status(400).json({error: "Please try to login with correct Credentials"});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success=false;
        return res.status(400).json({success,error: "Please try to login with correct Credentials"});
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      success= true;
      res.json({success,authtoken})
     } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Sever Occured")
     }
  })

  //Route 3: Get loggedin user details using: POST "/api/auth/getuser". login required
  router.post("/getuser", fetchuser , async (req, res) => {
    
  try {
    userid = req.user.Id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internal Sever Occured");
  }

})

module.exports = router;

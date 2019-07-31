const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');



// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User doesnt exist' });


      //validate userr
      bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' }); 

            jwt.sign(
                {id:user.id},
                config.get('jwtSecret'),
                (err,token)=>{
                    if(err) throw err;
                    res.json({
                        token,
                        user:{
                            name:user.name,
                            email:user.email
                        }
                    })
                }
            )
      })
    })
});

module.exports = router;

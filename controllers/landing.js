const model = require('../models/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Function to handle TaskEx ID form submission
function submitTaskExID(req, res) {
    const taskExID = req.body.myText; // Get the TaskEx ID from the request body
  
    // Add any necessary validation or processing of the TaskEx ID
  
    // if (/* Password is required */) {
    //   req.session.passwordRequired = true; // Set a flag or session variable to indicate password requirement
    // }
  
    // Perform any necessary logic or data retrieval
  
    res.redirect(`/${taskExID}`); // Redirect the user to the specific TaskEx ID page
  }
  
  // Function to handle new TaskEx ID form submission
  function createTaskExID (req, res) {
    const newTaskExID = req.body.myText2; // Get the new TaskEx ID from the request body
    const password = req.body.password; // Get the password from the request body
    const confirmPassword = req.body.password2; // Get the confirmation password from the request body
  
    // Add any necessary validation or processing of the form data
    
    // Perform new TaskEx ID creation
    const saltRounds = 10;

    const user =  model.findOne({username});

    if(user){
      return res.redirect('/');
    }
  
    try{
      //Generating a random salt value
      const salt =  bcrypt.genSalt(saltRounds);

      //Hash the password along with the salt
      const hashedPassword =  bcrypt.hash(password, salt);

      const user =  model.create({taskExID: newTaskExID, password: hashedPassword});
    }
    catch(err){
      res.status(400).json({err:err.message});
    }
    res.redirect(`/${newTaskExID}`); // Redirect the user to the specific TaskEx ID page
  }
  
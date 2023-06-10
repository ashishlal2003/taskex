const model = require('../models/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = require('../routes/landing');

// Get the landing page
const getLanding = (req, res, next) => {
    res.render('landing');
}

const postNew = async (req, res, next) => {
    const saltRounds = 10;
    const { myText, password } = req.body;

    const user = await model.findOne({ taskexId: myText });

    if (user) {
        return res.redirect('/');
    }

    try {
        // Generating a random salt value
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password along with the salt
        const hashedPassword = await bcrypt.hash(password.toString(), salt);

        const newUser = await model.create({ taskexId: myText, taskexPassword: hashedPassword });

        res.redirect(`/${myText}`);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

let temp = "";

const postOk = async (req, res, next) => {
    const{ myText2 } = req.body;
    temp = myText2;
    const user = await model.findOne({taskexId: temp});

    if(!user){
        return res.redirect('/');
    }
}

const postLogin = async (req, res, next) => {
    const {password} = req.body;
    try{
        const user = await model.findOne({taskexId: temp});
        console.log(user);
        console.log(temp);
        if(!user){
          return res.status(401).json({err: 'Invalid taskid'});
        }
  
        const passwordMatch = await bcrypt.compare(password, user.taskexPassword);
  
        if(passwordMatch){
          res.redirect(`/${temp}`);
        
        }
    
        else{
          console.log("incorrect");
          res.redirect('/');
        }
      }
  
      catch(err){
        console.log(err);
        res.status(500).json({err:err.message});
      }
}  

const getHome = async (req, res, next) => {
    const { id } = req.params;

    // Check if the taskid exists in the database
    const user = await model.findOne({ taskexId: id });
    console.log(user);

    if (!user) {
        return res.redirect('/');
    }
    console.log(user);

    res.render('task');
}


module.exports = {
    getLanding,
    postNew,
    getHome,
    postOk,
    postLogin
}

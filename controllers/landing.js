const model = require('../models/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = require('../routes/landing');
const session = require('express-session');

const isAuth = (req, res, next) => {
  if (req.session.isAuth && req.session.user && req.session.user.taskexId === req.params.id) {
    next();
  } else {
    res.redirect('/');
  }
};

// Get the landing page
const getLanding = (req, res, next) => {
  res.render('landing');
};

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
    req.session.isAuth = true;
    req.session.user = {
      taskexId: newUser.taskexId,
    };

    res.redirect(`/${myText}`);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

let temp = "";

const postOk = async (req, res, next) => {
    const { myText2 } = req.body;
    temp = myText2;
    const user = await model.findOne({ taskexId: temp });
    // console.log(req.session.temp);
    if (!user) {
      return res.redirect('/');
    }
  };
  
  
  const postLogin = async (req, res, next) => {
    const { password } = req.body;
    try {
      const taskexId = temp;
    //   console.log(taskexId);
      const user = await model.findOne({ taskexId });
        
      if (!user) {
        return res.status(401).json({ err: 'Invalid taskid' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.taskexPassword);
  
      if (passwordMatch) {
        req.session.isAuth = true;
        req.session.user = user;
        res.redirect(`/${taskexId}`);
      } else {
        console.log('incorrect');
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: err.message });
    }
  };
   
  


const getHome = async (req, res, next) => {
  const { id } = req.params;

  // Check if the taskid exists in the database
  const user = await model.findOne({ taskexId: id });

  if (!user) {
    return res.redirect('/');
  }

  res.render('task');
};

const logout = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    });
  };
  

module.exports = {
  getLanding,
  postNew,
  getHome,
  postOk,
  postLogin,
  isAuth,
    logout,
};

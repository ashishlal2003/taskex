const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const landingRoutes = require('./routes/landing');
require('dotenv').config();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);


const app = express();

const store = new MongoDBSession({
    uri: process.env.MONGO_URI,
    collection: "mySessions"
})

// Set up session middleware
app.use(session({
    secret: process.env.your_secret,
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
});

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    next();
  });
  

app.use('/', landingRoutes);

mongoose.connect(process.env.MONGO_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        }
    );
    }).catch(err => console.log(err));

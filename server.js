const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const landingRoutes = require('./routes/landing');
require('dotenv').config();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

app.use((req,res,next) => {
    console.log(req.path, req.method);
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

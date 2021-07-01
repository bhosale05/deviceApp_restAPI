const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const config = require('../config.json')
const mongoose = require('mongoose')
const deviceSchema = require('../model/device_schema')
const UserSchema = require('../model/user_schema')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const flash = require('connect-flash')
const session = require('express-session')
const { application } = require('express')
const app = express()
const port = config.serverport;

mongoose.connect('mongodb+srv://AB:archanab@ab.eoxpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connect to DB...');
    })
    .catch((error) => {
        console.log(`Error : ${error}`);
    })

app.use(jsonParser);

app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.post('/login', (req, res) => {
    
    if (req.body.username && req.body.password) {
        UserSchema.findOne({ username: req.body.username }, (err, user) => {
            if (!user) {
                console.log(`error : no user with username : ${req.body.username}`);
                res.status(404).send(`error : no user with username : ${req.body.username}`);  
            }
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, match) => {

                    if (err) {
                        console.log(`error : ${err}`);
                        res.status(500).send(err);
                    }
                    if (!match) {
                        console.log(`error : Incorrect Password`);
                        res.status(500).send('Incorrect password');
                    }
                    if (match) {
                        console.log(`Sign In successfully for ${JSON.stringify(user)}`);
                        res.status(200).send(user);   
                    }
                })
            }
            if (err) {
                console.log(`error : ${err}`);
                req.flash('message', `Error : ${err}`)
            }
        })
    }
})

app.post('/adduser', async (req, res) => {
    
    let data = req.body;
    let password = data.password;
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password, salt);
    data.password = hashedPassword;
    UserSchema.collection.insertOne(data, (error, result) => {
        if (error) {
            console.log(`error : ${error}`);
            res.status(500).send(error);
        } else {
            console.log(`User records Insert for ${JSON.stringify(result)}`);
            res.status(200).send(result);  
        }
    })
});

app.post('/adddevice', (req, res) => {
    req.body.isCheckedOut = false;
    deviceSchema.collection.insertOne(req.body, (error, result) => {
        if (error) {
            console.log(`error : ${error}`);
            res.status(500).send(error);
        } else {
            console.log(`Device details Insert for ${JSON.stringify(req.body)}`);
            res.status(200).send(result);
        }
    })
});

app.get('/getdevice', (req, res) => {
    deviceSchema.find((error, result) => {
        if (error) {
            console.log(`error : ${error}`);
            res.status(500).send(error);
        } else {
            console.log(`get All Deivces`)
            console.log(result);
            res.status(200).send(result);
        }
    })
        
});


app.delete('/remove/:id', (req, res) => {
    deviceSchema.findByIdAndRemove(req.params.id, (error, result) => {
        if(error){
            console.log(`error : ${error}`);
            res.status(500).send(error);
        } else {
            console.log(`Remove Device Successfully`);
            res.status(200).send(result);
        }
    })
})


app.put('/update/:id', (req, res) => {
    deviceSchema.findByIdAndUpdate(req.params.id, req.body, (error, result) => {
        if(error){
            console.log(`error : ${error}`);
            res.status(500).send(error);
        } else {
            console.log(`Update Device Successfully`);
            res.status(200).send(result);
        }
    })
})

app.get('/signout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(`error : ${error}`);
            res.status(500).send(error);
        } else {
            console.log(`Sign Out Successfully`);
            res.status(200).send('sucess');
        }
    })
})

app.listen(port, () => {
    console.log(`Web-server app running on port ${port}`)
})
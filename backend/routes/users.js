const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({username, password});

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/login').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.find({username: username, password: password})
        .then(users => {
            if(!users.length){
                res.json('Failure');
            }
            else{
                res.json(users);
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/register').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({username, password});

    User.find({username: username})
        .then(users => {
            if(users.length){
                res.json('Failure');
            }
            else{
                newUser.save()
                    .then(() => res.json('Success'))
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;
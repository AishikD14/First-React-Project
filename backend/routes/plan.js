const router = require('express').Router();
let Plan = require('../models/plan.model');


router.route('/').get((res) => {
    Plan.find()
        .then(plan => res.json(plan))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:user').get((req,res) => {
    Plan.find({username: req.params.user})
        .then(plan => res.json(plan))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const note = req.body.note;

    const newPlan = new Plan({
        username,
        description,
        duration,
        date,
        note
    });

    newPlan.save()
        .then(() => res.json('Plan added'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req,res) => {
    Plan.findByIdAndDelete(req.params.id)
        .then(() => res.json('Plan deleted'))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;

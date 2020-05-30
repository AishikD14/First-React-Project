const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session')
const passport = require('./passport');


require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then()
    .catch(err => console.log('Error:' + err));
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

const MongoStore = require('connect-mongo')(session)

//sessions
app.use(
    session({
        secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: connection }),
        resave: false, //required
        saveUninitialized: false //required
    })
)

app.use( (req, res, next) => {
    console.log('req.session', req.session);
    return next();
});

app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const planRouter = require('./routes/plan');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);
app.use('/plan',planRouter);

app.listen(port, () => {
    console.log('Server is running on port:', port);
})
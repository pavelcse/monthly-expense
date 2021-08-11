const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const userRouter = require('./routers/userRoute');
const itemRouter = require('./routers/itemRoute');
const expenseRouter = require('./routers/expenseRoute');


const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./passport')(passport)

// Routes
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);
app.use('/api/expenses', expenseRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our application'
    });
});

const PORT = process.env.PORT || 4000;
const MONGODB_URI = 'mongodb+srv://pavel007:pavel007@cluster0.klx6f.mongodb.net/monthly-expense?retryWrites=true&w=majority';
//const MONGODB_URI = "mongodb://admin:admin@.localhost:27017/monthly-expense?authSource=admin&w=1";

app.listen(PORT, () => {
    console.log(`SERVER is RUNNING ON PORT ${PORT}`);
    mongoose.connect(MONGODB_URI, 
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
        console.log('Database Connected...')
    })
})
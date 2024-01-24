const express = require('express');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const mongoose = require('mongoose');

const auth = require('../middleware/auth');
const app = express();
app.use(express.json());  //for controller req.body

app.use((req, res, next)=>{
    console.log('Http Method - ' + req.method + ' URL - '  + req.url);
    next();
});


app.use('/users' , userRouter);
app.use('/note', noteRouter);


app.get('/', (req, res)=>{
    res.send('Hello');
});

mongoose.connect('mongodb://localhost:27017/NoteDB').then(()=>{
    app.listen(5000, (req, res)=>{
        console.log('server is running at port 5000');
    });

}).catch((error)=>{
    console.log(error);

});


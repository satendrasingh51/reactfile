var express = require('express');
var path = require('path');
// const connectDB = require('./config/db')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student')

var app = express();

// connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.static('client/build'))
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.use('/', indexRouter);
app.use('/', studentRouter);
app.use('/users', usersRouter);


if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



var port = process.env.PORT || '8000';
app.listen(port, () => {
    console.log(`server run port ${port}`);
})

module.exports = app;

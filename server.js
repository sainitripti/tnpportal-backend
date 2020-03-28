const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const PORT = process.env.PORT || 5000;

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const companies = require('./routes/api/companies');
const results = require('./routes/api/results');
const jobs = require('./routes/api/jobs');
const students = require('./routes/api/students');

app.use(cors());
app.use(express.json());

//DB config
const uri = config.get('mongoURI');

//connect to MongoDB
mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

//Use routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/companies', companies);
app.use('/api/results', results);
app.use('/api/jobs', jobs);
app.use('/api/students', students);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
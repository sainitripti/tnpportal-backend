const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const users = require('./routes/api/users');

app.use(cors());
app.use(bodyParser.json());

//DB config
const uri = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

//Use routes
app.use('/api/users', users);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
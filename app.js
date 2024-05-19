const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Route = require('./Routes/Route');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(5000, (err) => {
    if (err) {
        console.log("Error!");
    } else {
        console.log(`Server started`);
    }
});
mongoose.connect("mongodb://127.0.0.1:27017/Project_Jira")
    .then(() => {
        console.log("Successfully Connected to DB");
    })
    .catch((error) => {
        console.log("Error Connecting to DB", error);
    });
app.use('/', Route);
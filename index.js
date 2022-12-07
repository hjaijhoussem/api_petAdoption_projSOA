const express = require("express");
let cookieSession = require('cookie-session');
const  mongoose  = require("mongoose");
const bodyParser = require('body-parser');
const petRoutes = require('./routes/petRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        signed: false, // do not encrypt the cookie content
        secure: false  // that means that cookies only been used if a user visit our  application over https request
    })
);

app.use(petRoutes);
app.use(authRoutes);


app.get('*',(req, res) => {
    res.status(404).send({
        status: "url not found"
    })
})


const start = () => {
    mongoose.connect("mongodb+srv://****************@cluster0.atlc1l6.mongodb.net/pets?retryWrites=true&w=majority")
            .then(() => {
                app.listen(4000,() => {
                    console.log("listening to 4000 and connected to database");
                })
            })
            .catch((err) =>{
                console.log(err);
            })
};

start();

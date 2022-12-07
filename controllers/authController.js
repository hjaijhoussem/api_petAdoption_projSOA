const User = require("../modeles/user");
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


exports.signUp = async (req, res) => {

    const errors = validationResult(req);

    

    if (!errors.isEmpty()) {
        const errMsg = errors.array()[0].msg;
      return res.status(400).send({ 
        errMsg
       });
    }

    const email =  req.body.email
    const existingUser = await User.findOne({ email });
    if( existingUser) {
        return res.send({
            status : 'failed, user exist'
        })
    }

    const hashedPwd = await bcrypt.hash(req.body.password, 10)

    const user  = new User({
        name : req.body.name,
        email,
        password: hashedPwd
    });

    await user.save();

    const userJwt = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        'secret'
    );
    req.session.jwt = userJwt;

    res.status(201).send(user);
}


exports.signIn = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errMsg = errors.array()[0].msg;
      return res.status(400).send({ 
        errMsg
       });
    }

    const email =  req.body.email

    const existingUser = await User.findOne({ email });

    if( !existingUser) {
        return res.send({
            status : "failed, user doesn't exist"
        })
    }
    const isCorrect  = await bcrypt.compare(req.body.password, existingUser.password);

    if(!isCorrect){
        return res.status(400).send({
            status: 'password not matched'
        })
    }

    const userJwt = jwt.sign(
        {
            id: existingUser._id,
            email: existingUser.email
        },
        'secret'
    );
    
    req.session.jwt = userJwt;

    res.status(200).send({
        status: "succes",
    })
}


exports.signOut = (req, res) => {
     req.session = null;

     res.status(200).send({
        status: "succes"
     })
}

exports.currentUser =  (req, res) => {

    res.send({ currentUser: req.currentUser || null});
} 

exports.onlineUser = ( req, res, next) => {
    if (!req.session.jwt){
        return res.status(400).send({
            status: 'not connected'
        })
    }

    const user = jwt.verify(
        req.session.jwt, 
        'secret'
    )

    req.currentUser = user;

    next();
}
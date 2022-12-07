exports.authRequire = (req, res, next) => {
    if(!req.currentUser){
        //console.log(req.currentUser)
        return res.send({
            status: "you must sign In"
        })
    }

    next();
}
function isLogin (req,res,next){
    // console.log(req.session)
    if(req.session.loginStatus === false || req.session.loginStatus === undefined ){
        res.redirect('./login')
    }else
    {
        next()
    }
}

module.exports = isLogin
const cookieController = {};

cookieController.set = (req, res, next) => {
    res.cookie('yourCookie', 'YumYum');
    return next();
}

cookieController.verify = (req, res, next) => {
    if(!req.cookies.yourCookie){
      return res.json(`Need Verification`)
    }
    return next();
}

module.exports = cookieController;
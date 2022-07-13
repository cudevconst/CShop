const jwt = require('jsonwebtoken');
const authCart = function redirectCart (req, res, next){
    const authHeder = req.cookies.token;
    if(authHeder){
        jwt.verify(authHeder, 'mk', (err, id) =>{
            if(err){
                return res.status(403).json({
                    message: "Token is not valid",
                });
            }
            else{
                req.session.userId = id
                next();
            }
        })
        
    }
    else{
        res.redirect('/login');
    }
}
module.exports = {authCart}
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeder = req.cookies.token;
    if(authHeder){
        jwt.verify(authHeder, 'mk', (err, result) =>{
            if(err){
                return res.status(403).json({
                    message: "Token is not valid",
                });
            }
            else{
                req.userId = result.id;
                
                next();
            }
        })
        
    }
    else{
        return res.status(401).json({
            message: "You are not authenticated",
        });
    }
    
}

module.exports = {verifyToken};
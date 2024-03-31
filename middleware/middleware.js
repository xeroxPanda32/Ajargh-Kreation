 const isAdmin  = (req,res,next)=>{
    const user = req.user;
    if(user.authLevel === 2){
        next();
    }else{
        res.status(401).send("Unauthorized ");
    }
}

const isBusinessOwner  = (req,res,next)=>{
    const user = req.user;
    if(user.authLevel >= 1){
        next();
    }else{
        res.status(401).send("Unauthorized ");
    }
}


module.exports = isAdmin;
module.exports = isBusinessOwner;
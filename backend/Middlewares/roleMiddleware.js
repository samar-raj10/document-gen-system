

export const authRole = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles){
            return res.status(403).json({message: "Access denied"});
        }
        next();
    }
}
import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) =>{
    const{token} = req.cookies;

    if(!token){
        return res.json({success: false, message: 'Not Authorized. Try again'})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.adminId= tokenDecode.id
        } else{
            return res.json({success: false, message: 'Not Authorized. Try again'})
        }

        next();

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export default adminAuth;
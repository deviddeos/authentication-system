import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized' })
    }
    try {
        
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id) {
            req.userId = tokenDecode.id
        } else {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
}

export default userAuth;


const User = require("../../models/userModels/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const statusCodes = require("../../utils/statusCodes");
const messages = require("../../utils/responseMessages")

const register = async(req, res, next) =>{
    const { name , email, password } = req.body;
    try{
        const existing = await User.findOne({ email });
        if(existing){
            return res.status(statusCodes.BAD_REQUEST).json({
                message: messages.USER_ALREADY_EXISTS
            })
        }
        const user = new User({name, email, password})
        await user.save();
        res.status(statusCodes.CREATED).json(user);
        console.log(user)
    }catch(err){
       next(err);
    }
}

const login = async(req, res, next)=>{
    const { email, password}= req.body;
    try{
        const user = await User.findOne({email});
        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(statusCodes.UNAUTHORIZED).json({message:messages.INVALID_CREDENTIALS})
        }

        const token = jwt.sign({user_id : user.user_id}, process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({ token})

    }catch(err){
        next(err);
    }
}

module.exports = {
    register,
    login
}
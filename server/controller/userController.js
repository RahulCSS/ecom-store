import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import validator from "validator";

// Creating JWT
const createToken = (id)=>{
    const secretkey = process.env.jwtToken;
    if(!secretkey){
        throw new Error("No JWT token found")
    }
    return jwt.sign({id},secretkey,{expiresIn:'1hr'});
}
//Login user
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({sucess:false , message: "User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
        // Create token and save in user database on every successful login:
        const accessToken = createToken (user._id);
        user.token = accessToken;
        await user.save();
        // Desturcturing to exclude data from user:
        const { password:_, __v:__, updatedAt:___, createdAt:____ ,...userData } = user.toObject();
        res.json ({success:true, message:"User Logged in Successfully",userData});
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Error"});
    }
};

// Register user
const registerUser = async (req,res) =>{
    const {name,email,password,role} = req.body;
    try{
        //checking if user already registered
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false , message: "User already exists"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false,message:"Please enter a valid email"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"});
        }
        
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        })
        const user = await newUser.save();
        res.json({success:true, message: "User registered successfully"}) ;
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Error"});
    };
};

// Getting current user details with token verification and validation of user id in request body  
const getCurrentUser = async (req,res) =>{
    try{
        const user = await userModel.findById(req.body.userId).select('-password -__v -updatedAt -createdAt');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    }catch(error){
        console.error(error);
        if (!res.headersSent) {  // Check if headers are already sent
            return res.status(500).json({ success: false, message: "Server error" });
        }
    }
}; 

export {loginUser, registerUser, getCurrentUser};
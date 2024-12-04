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
        const { password:_, __v:__, cart:___,...userData } = user.toObject();
        const cart = user.cart;
        res.json ({success:true, message:"User Logged in Successfully",userData,cart});
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
        const token = createToken (user._id);
        res.json({success:true, token, message: "User registered successfully"}) ;
    }catch(error){
        console.log(error);
        res.json({success:false, message: "Error"});
    };
};

// Getting current user details with token verification and validation of user id in request body  
const getCurrentUser = async (req,res) =>{
    try{
        const user = await userModel.findById(req.body.userId).select('-password');
        if (!user) {
            return res.send({
                success: false,
                message: 'User not found'
            });
        }
        return res.send({
            success: true,
            message: 'User details retrieved successfully',
            data: user
        });
    }catch(err){
        return res.send({
            success: false,
            message: 'Something went wrong'
        });
    }
}; 

export {loginUser, registerUser, getCurrentUser};
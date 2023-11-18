const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const signup = async (req ,res, next ) => {

    const {name,email,password} = req.body;
    let existingUser;


    try{
        existingUser = await User.findOne({email:email});
    }catch(err){
        console.log(err)
    }


    if(existingUser){
       return res.status(201).json({message:'user already exists! Login instead'});
    }

    const hashedPassword = bcrypt.hashSync(password)
    const user =new User({name,email,password:hashedPassword})

    try{
        const response = await user.save();
        return res.status(201).json({message:response})
    }catch(err){
        return res.status(404).json({error:err})
    }
}

const login = async (req,res , next) => {
    const {email,password} = req.body;
    let userExist;
    try{
        userExist = await User.findOne({email:email});
    }catch(err){
        console.log(err)
    }

    if(!userExist){
        return res.status(200).json({message:"user not exist, kindly Signup"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,userExist.password);
    
    if(!isPasswordCorrect){
        return res.status(200).json({message:"Invalid Email / Password"});
    }

    const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET_KEY,{expiresIn:"2 days"});

    res.cookie(String(userExist._id), token, { 
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2days
        httpOnly: true,
        sameSite: "lax",
      });

    return res.status(200).json({message:"Successfully Logged In",token:token,user:userExist})
}

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    console.log(cookies);
    const token = cookies.split("=")[1];
    if (!token) {
      res.status(404).json({ message: "No token found" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid TOken" });  
      }
      req.id = user.id;
    });
    next();
  };
  
  const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
      user = await User.findById(userId, "-password");
    } catch (err) {
      return new Error(err);
    }
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ user });
  };

  const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.logout = logout;

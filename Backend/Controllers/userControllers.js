const { generateToken } = require('../jwt');
const User = require('../Models/User')
const bcrypt = require('bcrypt')

const signUpUser = async(req,res) =>{
  
    try {
        const {name,email,password} = req.body;
      
    

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "user already exists" });
        }

        //hashed the password before saving 

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await User({
            name,
            email,
            password:hashedPassword
        })
       
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields: name, email, and password." });
          }
        const token = generateToken(newUser)
        //saved the user in database
        await newUser.save()

       return res.status(200).json({
            message:'User Register Successfully',
            success:true,
            newUser,
            token
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:'Internal Server error',
            success:true
        })
        
    }
}

const loginUser = async(req,res) =>{
   
    try {
        
        const {email , password} = req.body;

        if(!email || !password){
            res.status(401).json({
                message:'Please Enter Your Password',
                success:false
            })
        }

        //find the user by email

        const user = await User.findOne({email})

        if(!user){
          return  res.status(404).json({
                message:'User Not Found',
                success:false,
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({
                message:'Incorrect Password',
                success:false
            })
        } else{

            const token = generateToken(user._id, user.email)
       

       return res.status(200).json({
            message:'User Logged in successfully',
            success:true,
            token
        })
    }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:'Internal Server error',
            success:false
        })
    }
}

const isLogin = async(req , res) =>{
   
     try {
        const user = await User.findById(req.user._id)

        if(!user){
            return res.status(200).json({
                success:true,
                isLogin:false
            })
        }

        if(user){
            return res.status(200).json({
                success:true,
                isLogin:true,
                user
            })
        }
     } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
     }
}
module.exports = {signUpUser,loginUser,isLogin}
const AuthModel=require('../Model/authModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const getForm=(req,res)=>{
    res.render('auth/registration',{
        title:"Sign Up",
        path:"/"
    })
}
const postForm=async(req,res)=>{
    try{
        // console.log("Collected Data",req.body);
        let user_details=await AuthModel.findOne({email:req.body.email});
        // console.log(user_details);
        if(!user_details){
            let hashPassword=await bcrypt.hash(req.body.password,12);
            let authData=new AuthModel({
                email:req.body.email,
                password:hashPassword
            })
            let saveData=await authData.save();
            if(saveData){
                console.log("Data saved successfully");
            } 
            else{
                res.send("Error to save data");
            }
            res.redirect('/auth/getlogin');
        }
        else{
            res.send("User details already exists");
        }
    }
    catch(err){
        console.log("Error to collect data",err);
    }
}
const getLogin=(req,res)=>{
    res.render('auth/login',{
        title:"Sign In",
        path:"/auth/getlogin"
    })
}
const postLogin=async(req,res)=>{
    try{
        // console.log("Login Data:",req.body);
        let log_details=await AuthModel.findOne({email:req.body.email});
        // console.log("Existing user:",log_details);
        if(log_details){
            let existing_user=await bcrypt.compare(req.body.password,log_details.password);
            if(existing_user){
                let token_payload={userdata:log_details};
                const token_jwt=jwt.sign(token_payload,process.env.SECRET_KEY,{
                    expiresIn:"1h",
                });
                res.cookie("token_data",token_jwt,{
                    expires:new Date(Date.now()+3600000),
                    httpOnly:true,
                });
                return res.redirect('/profile');
            }
            else{
                res.send("Incorrect password");
            }
        }
        else{
            res.send("Invalid user");
        }
    }
    catch(err){
        console.log("Error to collect data yet",err);
    }
}
const userAuth=async(req,res,next)=>{
    try{
        if(req.user){
            next();
        }
        else{
            console.log("Need to login first");
            res.redirect('/auth/getlogin');
        }
    }
    catch(err){
        throw err;
    }
}
const viewProfile=async(req,res)=>{
    let user_data=req.user.userdata;
    // console.log("User Details",user_data);
    res.render('auth/dashboard',{
        title:"User Profile",
        path:"/profile",
        info:user_data
    })
}
const logOut=async(req,res)=>{
    let destroyed=await res.clearCookie("token_data");
    console.log("Destroyed:",destroyed);
    res.redirect('/auth/getlogin');
}
module.exports={
    getForm,
    postForm,
    getLogin,
    postLogin,
    userAuth,
    viewProfile,
    logOut
}
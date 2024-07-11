require('dotenv').config();
const express=require('express');
const appServer=express();
const path=require('path');
const mongoose=require('mongoose');
const PORT=process.env.PORT||5700;
const cookieParser=require('cookie-parser');
const authRouter=require('./Router/authRouter');


appServer.set('view engine','ejs');
appServer.set('views','View');

appServer.use(express.urlencoded({extended:true}));
appServer.use(express.static(path.join(__dirname,"Public")));
appServer.use(cookieParser());
appServer.use(authRouter);
mongoose.connect(process.env.DB_URL)
.then(res=>{
    appServer.listen(PORT,()=>{
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
.catch(err=>{
    console.log("Error to connect with database",err);
})
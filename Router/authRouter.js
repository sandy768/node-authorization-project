const express=require('express');
const router=express.Router();
const {getForm,postForm,getLogin,postLogin,userAuth,viewProfile,logOut} = require('../Controller/authController');
const AuthJwt=require('../middle-ware/isAuth');

// registration path
router.get('/',getForm);
router.post('/auth/postdata',postForm);

// login path
router.get('/auth/getlogin',getLogin);
router.post('/auth/postlog',postLogin);

// profile path
router.get('/profile',AuthJwt.authJwt,userAuth,viewProfile);

// logout path
router.get('/logout',logOut);

module.exports=router;
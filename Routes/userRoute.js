const express=require('express')
const {Login,Logout,Register} =require('../controller/User')
const router=express.Router()

router.route('/register').post(Register)
router.route('/log').post(Login)
router.route('/logout').get(Logout)

module.exports=router;

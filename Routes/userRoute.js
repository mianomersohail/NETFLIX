const express=require('express')
const {Register} =require('../controller/User')
const router=express.Router()

router.route('/register').post(Register)

module.exports=router;

const express = require('express')
const router = new express.Router()
const data=require('./app')

 router.post("/searchdata",async(req,res)=>{
 
    const requireddata= await data.search(req.body.component)
    res.send (requireddata)
 })
module.exports = router;
require("dotenv").config();
const express = require('express')
const AppRoute = express.Router()
const Sib = require('sib-api-v3-sdk')
const tranEmailApi = new Sib.TransactionalEmailsApi()

const emailInstance = require("../models/email.model.js")


// add email to db.
AppRoute.post("/api/addemail", async(req, res)=>{
    try {
            const {email, messageId} = req.body

            if (!( email)){
                res.status(400).json("All Field Required")
            }

            const isEmailExist = await emailInstance.findOne({email})

            if(isEmailExist){
                res.status(409).json("Email Exist")
            }
              

                const user = await emailInstance.create({
                    messageId : messageId,
                    email : email.toLowerCase()
                })

                res.status(201).json(user) 
            } catch(err){
                res.status(409).json("save email")
            }           
})

// get  all email

AppRoute.get("/api/allemail", async(req, res)=>{
    await emailInstance.find(function(err, record){
        if(err){
            console.log(err)
            err.send(400).json("record not found")

        }
       
        else{
        res.send(record)
    }
    })
})

AppRoute.post("/api/sendemail", async (req, res)=>{
    let updateData = [];
    let {allSelectedEmail, allSelectedTodo} = req.body
    let emails =  allSelectedEmail.map((items)=>items.email)
    let messageId =  allSelectedTodo.map((items)=>items._id)
         
          await  updateData.push({
            updateMany: {
                filter: { email:emails },
                update: {
                    $set: {
                        messageId:  messageId 
                    }
                }, upsert: true
            }
        });
        if (updateData.length > 0){
            
        return new Promise(function  (resolve, reject) {
          emailInstance.bulkWrite(updateData, { ordered: false }, async function(err, result) {   
              if (err) {
                  console.log("errorrrrrrrr : ",err)
              } else {
                 let sender = {email: 'egobakelvin@gmail.com',name: 'EGOBA'}
                let receivers = [{email: emails}]
                allSelectedTodo.map((items)=> 
                    tranEmailApi.sendTransacEmail({
                    sender,
                    to: receivers,
                    subject: 'TODO LIST',
                    textContent: (items.tittle ,items.content),
                    htmlContent: `<h1> todo </h1><a href="https://cules-coding.vercel.app/">Visit</a>`})
                )

                        res.send(result)
                        }
          })
      
   
     //console.log(emails, "list of todo" , messageId )

    //handle send mail to subscriber with sendinblue api services
   
        })
    }
})






// Configure API key authorization: api-key













module.exports = AppRoute




const express = require("express")
const AppRouter = express.Router()

// database connection
const todoModel = require("../models/todo.model.js")
// TO ADD RECORD TO DB
AppRouter.post("/api/addtodo", (req, res) =>{
    console.log(req.body)
    let data =  new todoModel(req.body)
    data.save()
    .then(todo =>{
        res.status(200).json({"record" : "Record added"})
    })
    .catch(err=>{
        res.status(400).send( err)
    })
})


// TO DISPLAY ALL THE RECORD IN THE DB
AppRouter.get("/api/displaytodo", async (req, res) =>{
     
     await todoModel.find(function(err, record){
        if(err){
            console.log(err)
            err.send(400).json("record not found")

        }
       
        else{
            
        res.send(record)
    }
    })
   
})

// TO GET A SINGLE RECORD
AppRouter.get("/api/todo/:id", async (req, res) =>{

        await todoModel.findById(req.params.id, (err, data)=>{
        if (err){
            res.json("record not found")
        }
        else{
            res.json(data)
        }
    })
})

// TO DELETE A SINGLE TO RECORD
AppRouter.delete("/api/deletetodo/:id",  async (req, res) =>{
    await todoModel.findByIdAndRemove(req.params.id, (err, data)=>{
        if (err){
            res.json("could not delete record")
        }
        else{
            res.json("record deleted successfully")
        }
    })
})


// TO UPDATE A SINGLE RECORD
AppRouter.post("/api/updates/:id", async (req, res)=>{
    await todoModel.findById(req.params.id,(err, data)=>{
        if (err){
            res.status(400).json(" record not found")
        }
        else{
            data.id = req.body.id
            data.content = req.body.content
            data.tittle =req.body.tittle
            data.save()
            .then(reco =>{
            res.status(200).json(data)  
            })
            .catch(err=>{
                res.status(400).json("unable to update record")
            })
        }
    })
})


module.exports = AppRouter;
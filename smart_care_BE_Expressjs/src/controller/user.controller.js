const userModel = require("../models/user.model")

class UserController{
    
    async add(req, res){
        try{
            await new userModel().create(req,res)
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async edit(req, res){
        try{
           await new userModel().mod(req,res)
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async edit_pass(req, res){
        try{
           await new userModel().mod_pass(req,res)
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async get(req, res){
        try{
           await new userModel().get(req,res)
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getall(req, res){
        try{
           await new userModel().getall(req,res)
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async delete(req, res){
        try{
           await new userModel().delete(req,res)
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

}

module.exports = UserController
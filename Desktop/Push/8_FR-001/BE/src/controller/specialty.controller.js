const specialtyModel = require("../models/specialty.model")

class specialtyController{

    async get(req, res){
        try{
            await new specialtyModel().get(req, res);
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getall(req, res){
        try{
            await new specialtyModel().getall(req, res);
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getpage(req, res){
        try{
            await new specialtyModel().getpage(req, res);
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async create(req, res){
        try{
            await new specialtyModel().create(req, res);
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async edit(req, res){
        try{
            await new specialtyModel().mod(req, res);
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async delete(req, res){
        try{
            await new specialtyModel().delete(req, res);
        }catch(err){
            console.log(err)
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

}

module.exports = specialtyController
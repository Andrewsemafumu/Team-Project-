const recordModel = require("../models/record.model");

class recordController{
 
    async get(req, res){
        try{
            await new recordModel().get(req, res)
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async get_history(req, res){
        try{
            await new recordModel().get_history(req, res)
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async create(req, res){
        try{
            await new recordModel().create(req, res)
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async update(req, res){
        try{
            await new recordModel().update(req, res)
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }
    
}

module.exports = recordController;
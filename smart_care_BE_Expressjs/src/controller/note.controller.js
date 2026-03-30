const noteModel = require("../models/note.model");

class noteController{
 
    async get_all(req, res){
        try{
            await new noteModel().get_all(req, res);
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async get(req, res){
        try{
            await new noteModel().get(req, res);
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async update(req, res){
        try{
            await new noteModel().update(req, res);
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async add(req, res){
        try{
            await new noteModel().add(req, res);
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async delete(req, res){
        try{
            await new noteModel().delete(req, res);
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }
    
}

module.exports = noteController
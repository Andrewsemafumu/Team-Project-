const bookingModel = require("../models/booking.model");

class bookingController{

    async get(req, res){
        try{
            await new bookingModel().get(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getall(req, res){
        try{
            await new bookingModel().getall(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getallfor_patient(req, res){
        try{
            await new bookingModel().getallfor_patient(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getallfor_doctor(req, res){
        try{
            await new bookingModel().getallfor_doctor(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getdoctor_freetime(req, res){
        try{
            await new bookingModel().getdoctor_freetime(req, res);
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async create(req, res){
        try{
            await new bookingModel().create(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async edit(req, res){
        try{
            await new bookingModel().mod(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async update_status(req, res){
        try{
            await new bookingModel().update_status(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async delete(req, res){
        try{
            await new bookingModel().delete(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async statistics(req, res){
        try{
            await new bookingModel().statistics(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async today_report(req, res){
        try{
            await new bookingModel().today_report(req, res);
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

}

module.exports = bookingController;
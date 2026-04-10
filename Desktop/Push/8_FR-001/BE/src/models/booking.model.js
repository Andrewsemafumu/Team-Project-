const { ModDTO } = require("../DTO/booking/ModDTO");
const { NewDTO } = require("../DTO/booking/NewDTO");
const { roleMappingRaw } = require("../mapping/mapping");
const {prisma} = require("./../config/connectSql");

const user_cancel_status = [4,5,6];

class bookingModel{
    async get(req, res){
        try{
            const id = req.query.id ? !isNaN(req.query.id) ? req.query.id *1 : null : null;
            if(!id){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            const res_get = await prisma.booking.findUnique({
                where: {
                    id : id
                },
                select:{
                    id: true,
                    date01: true,
                    date02: true,
                    title: true,
                    bookingDate:true,
                    status: true,
                    descript: true,
                    clientID: true,
                    client: {
                        select:{
                            id: true,
                            name: true,
                            address: true,
                            birthdate: true,
                            phone: true,
                            sex: true,
                            mail: true
                        }
                    },
                    doctorID: true,
                    doctor: {
                        select:{
                            id: true,
                            name: true,
                            address: true,
                            birthdate: true,
                            phone: true,
                            sex: true,
                            mail: true
                        }
                    }
                }
            })
            res.status(200).send({
                "message": "Success!",
                "data": res_get
            })
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getall(req, res){
        try{
            if(req.u.BASEID && req.u.BASEROLE){
                if(req.u.BASEROLE !== "ADMIN" && req.u.BASEROLE !== "RECEPTION"){
                    return res.status(403).send({
                        "message": "You don't have any permission for this activity!"
                    })
                }
            }else{
                return res.status(403).send({
                    "message": "You don't have any permission for this activity!"
                })
            }

            const res_all = await prisma.booking.findMany({
                select:{
                    id: true,
                    date01: true,
                    date02: true,
                    title: true,
                    status: true,
                    descript: true,
                    bookingDate: true,
                    record: true,
                    client: {
                        select:{
                            id: true,
                            name: true,
                            address: true,
                            birthdate: true,
                            phone: true,
                            sex: true,
                            mail: true
                        }
                    },
                    doctor: {
                        select:{
                            id: true,
                            name: true,
                            address: true,
                            birthdate: true,
                            phone: true,
                            sex: true,
                            mail: true,
                            specialty: true
                        }
                    }
                }
            });
            
            res.status(200).send({
                "message": "Success!",
                "data": res_all
            })
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getallfor_doctor(req, res){
        try{
            const id = req.query.id ? !isNaN(req.query.id) ? req.query.id * 1 : null : null;
            if(!id){
                res.status(400).send({
                    "message": "Bad request!"
                })
            }

            if(req.u.BASEID !== id){
                return res.status(403).send({
                    "message": "You don't have any permission for this activity!"
                })
            }

            if(req.u.BASEID && req.u.BASEROLE){
                if(req.u.BASEROLE === "CLIENT"){
                    return res.status(403).send({
                        "message": "You don't have any permission for this activity!"
                    })
                }
            }else{
                return res.status(403).send({
                    "message": "You don't have any permission for this activity!"
                })
            }

            const res_all = await prisma.booking.findMany({
                where:{
                    doctorID: id
                },
                select:{
                    id: true,
                    date01: true,
                    date02: true,
                    title: true,
                    bookingDate: true,
                    status: true,
                    descript: true,
                    record: true,
                    client: {
                        select:{
                            id: true,
                            name: true,
                            address: true,
                            birthdate: true,
                            phone: true,
                            sex: true,
                            mail: true
                        }
                    },
                    doctor: {
                        select:{
                            id: true,
                            name: true,
                            address: true,
                            birthdate: true,
                            phone: true,
                            sex: true,
                            mail: true,
                            specialty: true
                        }
                    }
                }
            });
            
            res.status(200).send({
                "message": "Success!",
                "data": res_all
            })
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getdoctor_freetime(req, res){
        try{
            const start = new Date(req.query.start);
            const end = new Date(req.query.end);
            const docID = req.query.docID ? !isNaN(req.query.docID) ? req.query.docID * 1 : null : null;

            if(!docID){
                return res.status(400).send({
                    "message": "Bad request!"
                })
            }

            const res_all = await prisma.booking.findMany({
                where:{
                    doctorID: docID,
                    bookingDate: {
                        gte: start,
                        lt: end
                    }
                },
                select:{
                    bookingDate: true                    
                }
            });

            console.log(res_all);
            
            return res.status(200).send({
                "message": "Success!",
                "data": res_all
            })
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async getallfor_patient(req, res){
        try{
            const id = req.query.id ? !isNaN(req.query.id) ? req.query.id * 1 : null : null;
            if(!id){
                res.status(400).send({
                    "message": "Bad request!"
                })
            }
            if(req.u.BASEID !== id){
                return res.status(403).send({
                    "message": "You don't have any permission for this activity!"
                })
            }

            if(req.u.BASEID && req.u.BASEROLE){
                if(req.u.BASEROLE === "DOCTOR"){
                    return res.status(403).send({
                        "message": "You don't have any permission for this activity!"
                    })
                }
            }else{
                return res.status(403).send({
                    "message": "You don't have any permission for this activity!"
                })
            }
            const res_all = await prisma.booking.findMany({
                where:{
                    clientID: id
                },
                select:{
                    id: true,
                    date01: true,
                    date02: true,
                    bookingDate:true,
                    title: true,
                    status: true,
                    descript: true,
                    record: true,
                    client: {
                        select:{
                            id: true,
                            name: true,
                            address: true,
                            birthdate: true,
                            phone: true,
                            sex: true,
                            mail: true
                        }
                    },
                    doctor: {
                        select:{
                            id: true,
                            name: true,
                            address: true,
                            birthdate: true,
                            phone: true,
                            sex: true,
                            mail: true,
                            specialty: true
                        }
                    }
                }
            });
            
            res.status(200).send({
                "message": "Success!",
                "data": res_all
            })
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async create(req, res){
        try{
            const data = NewDTO(req);

            if(!data.clientID){
                return res.status(400).send({
                    "message": "Bad request!"
                })
            }

            if(!data.doctorID || !data.clientID){
                return res.status(400).send({
                    "message": "Bad request!"
                })
            }

            const exist_booking = await prisma.booking.findMany({
                where: {
                    bookingDate: data.bookingDate,
                    doctorID: data.doctorID
                }
            });

            if(exist_booking.length){
                return res.status(409).send({
                    "message": "Booking conflict!"
                })
            }

            if(req.u.BASEROLE === "CLIENT"){
                if(req.u.BASEID !== data.clientID){
                    return res.status(403).send({
                        "message": "You don't have any permission for this activity!"
                    })
                }
                data.status = 1;
            }

            const res_new = await prisma.booking.create({
                data:{
                    ...data
                }
            });

            if(res_new.id){
                res.status(200).send({
                    "message": "Success!"
                })
            }else{
                res.status(409).send({
                    "message": "Cannot create booking!"
                })
            }

        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    async mod(req, res){
        try{
            const data = ModDTO(req);
            const id = data.id;
            if(!id){
                return res.status(400).send({
                    "message": "Bad request!"
                })
            }

            delete data.id;

            if(!data.clientID){
                return res.status(400).send({
                    "message": "Bad request!"
                })
            }

            if(!data.doctorID || !data.clientID || isNaN(data.clientID) || isNaN(data.clientID)){
                return res.status(400).send({
                    "message": "Bad request!"
                })
            }

            const exist_booking = await prisma.booking.findMany({
                where: {
                    bookingDate: data.bookingDate,
                    doctorID: data.doctorID,
                }
            });

            if(exist_booking.length){
                return res.status(409).send({
                    "message": "Booking conflict!"
                })
            }

            if(req.u.BASEROLE === "CLIENT"){
                if(req.u.BASEID !== data.clientID){
                    return res.status(403).send({
                        "message": "You don't have any permission for this activity!"
                    })
                }
            }

            const res_new = await prisma.booking.update({
                where : {
                    id: id
                },
                data:{
                    ...data,
                }
            });

            if(res_new.id){
                res.status(200).send({
                    "message": "Success!"
                })
            }else{
                res.status(409).send({
                    "message": "Cannot modify booking!"
                })
            }
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }
    
    async delete(req, res){
        try{
            const bookingID = req.body.bookingID ? !isNaN(req.body.bookingID) ? req.body.bookingID * 1 : null: null; 
            const id = req.body.id ? !isNaN(req.body.id) ? req.body.id * 1 : null: null; 
            if(!bookingID){
                return res.status(400).send({
                    "message": "Bad request!"
                })
            }

            var booking = null;

            if(req.u.BASEROLE === "DOCTOR"){
                if(!id){
                    return res.status(400).send({
                        "message": "Bad request!"
                    })
                }
                if(req.u.BASEID === id){
                    booking = await prisma.booking.findUnique({
                        where: {
                            id: bookingID,
                            doctorID: id
                        },
                        select: {
                            status: true
                        }
                    })
                }
            }else if(req.u.BASEROLE === "CLIENT"){
                if(!id){
                    return res.status(400).send({
                        "message": "Bad request!"
                    })
                }
                if(req.u.BASEID === id){
                    booking = await prisma.booking.findUnique({
                        where: {
                            id: bookingID,
                            clientID: id
                        },
                        select: {
                            status: true
                        }
                    })
                }
            }else{
                booking = await prisma.booking.findUnique({
                    where: {
                        id: bookingID,
                    },
                    select: {
                        status: true
                    }
                })
            }


            if(booking){
                await prisma.booking.delete({
                    where:{
                        id: bookingID
                    }
                });
                res.status(200).send({
                    "message": "Success!",
                })
            }else{
                res.status(404).send({
                    "message": "Booking not exist!",
                })
            }
            
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

}

module.exports = bookingModel;
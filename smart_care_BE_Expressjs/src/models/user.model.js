require('dotenv').config();
const { prisma } = require("../config/connectSql");
const { ModDTO } = require("../DTO/user/ModDTO");
const { roleMappingRaw } = require("../mapping/mapping");
const { ModPassDTO } = require("../DTO/user/ModPassDTO");
const Hashtool = require("../security/HashTool");
const { NewDTO } = require('../DTO/user/NewDTO');

class userModel{

    // function for create new user
    async create(req, res){
        try{
            const NewData = NewDTO(req);

            if(roleMappingRaw(req.u.BASEROLE) > 1){
                return res.status(403).send({
                    "message" : "You don't have permission for this activity!",
                })
            }

            if(NewData.name === null|| NewData.phone === null|| NewData.mail === null){
                return res.status(400).send({
                    "message" : "Bad request!",
                })
            }

            if(NewData.role !== 2){
                delete NewData.specialtyID;
            }

            if(roleMappingRaw(req.u.BASEROLE) > 0 && (NewData.role < 3)){
                return res.status(403).send({
                    "message" : "You don't have permission for this activity!",
                })
            }
            const existed = await prisma.user.findFirst({
                where:{
                    OR:[
                        {phone: NewData.phone},
                        {mail: NewData.mail}
                    ]
                }
            })

            if(existed){
                return res.status(409).send({
                    "message": "User existed!"
                });
            }

            if(!NewData.pass){
                return res.status(400).send({
                    "message" : "Bad request!",
                })
            }
            
            NewData.pass = await new Hashtool().Hash(NewData.pass);

            const newres = await prisma.user.create({
                data:{
                    ...NewData,
                }
            })
            
            if(newres.id){
                res.status(200).send({
                    "message":"Success"
                })
            }else{
                res.status(500).send({
                    "message":"Server error!"
                })
            }
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            });
        }
        
    }

    // function for get all user
    async getall(req, res){
        try{
            const search = req.query.search || "";
            var roles_condition = null
            var docBook = {}

            const role_map = roleMappingRaw(req.u.BASEROLE);
            if(role_map === 0){
                roles_condition = {
                    role: {
                        in: req.query.role ? JSON.parse(req.query.role) : [1,2,3]
                    }
                }
                
            }else if(role_map === 1){
                if(req.query.role){
                    if(JSON.parse(req.query.role).includes(1) || JSON.parse(req.query.role).includes(0)){
                        return res.status(403).send({
                            "message" : "You dont have any permission for this activity!",
                        })
                    }
                }
                roles_condition = {
                    role: {
                        in : req.query.role ? JSON.parse(req.query.role) : [2,3]
                    }
                }

            }else if(role_map === 2){
                roles_condition = {
                    role: 3
                }

            }else if(role_map === 3){
                roles_condition = {
                    role: 2
                }
            }

            const userData = await prisma.user.findMany({
                where : {
                    ...roles_condition,
                    ...docBook,
                    OR:[
                        {
                            name: {
                                contains: search
                            }
                        },
                        {
                            mail: {
                                contains: search
                            }
                        },
                        {
                            phone: {
                                contains: search
                            }
                        }
                    ]
                },
                
                select: {
                    id : true,
                    name : true,
                    ava : true,    
                    mail: true,      
                    role: true,
                    address : true,
                    birthdate: true,
                    descript : true,
                    specialty : true,
                    phone: true,
                    sex: true, 
                    clientBookings: true,
                    doctorBookings: true,
                    date01: true,
                    date02: true,
                }
            });
            res.status(200).send({
                "data" : userData,
                "message" : "Success"
            })
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    // function for get one user
    async get(req, res){
        try{
            const id = req.query.id ? !isNaN(req.query.id) ? req.query.id *1 : null : null;
        
            if(!id)
                return res.status(400).send({
                    "message" : "Bad request!",
                })
            
            var docBook = {}
            const role_map = roleMappingRaw(req.u.BASEROLE);

            if(role_map === 2){
                docBook = {
                    clientBookings: {
                        some: {
                            doctorID : req.u.BASEID
                        }
                    },
                }
            }
        
            const userData = await prisma.user.findUnique({
                where : {
                    id: id,
                    ...docBook
                },
                select: {
                    id : true,
                    role: true,
                    name : true,
                    address : true,
                    specialty : true,
                    specialtyID: true,
                    ava : true,
                    birthdate: true,
                    descript : true,
                    mail: true,
                    phone: true,
                    sex: true,
                    clientBookings: true,
                    doctorBookings: true
                }
            });

            if(userData){
                if(role_map > 0 && userData.role < 1){
                    return res.status(403).send({
                        "message" : "You dont have any permission for this activity!",
                    })
                }
                res.status(200).send({
                    "message" : "Success",
                    "data" : userData
                })
            }else{
                res.status(404).send({
                    "message" : "Data not found!",
                })
            }
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    // function for change password
    async mod_pass(req, res){
        try{
            const modPass = ModPassDTO(req);

            if(!modPass.id || !modPass.newPass || !modPass.oldPass){
                return res.status(400).send({
                    "message" : "Bad request!",
                })
            }
            
            if(roleMappingRaw(req.u.BASEROLE) > 1){
                if(modPass.id !== req.u.BASEID){
                    return res.status(403).send({
                        "message" : "You don't have permission for this activity!",
                    })
                }
            }

            const userData = await prisma.user.findUnique({
                where:{
                    id: modPass.id
                }
            })

            if(!await new Hashtool().CompareHash(userData.pass, modPass.oldPass)){
                return res.status(401).send({
                    "message" : "Unauthorized!",
                })
            }

            modPass.newPass = await new Hashtool().Hash(modPass.newPass);

            const userDataMod = await prisma.user.update({
                where:{
                    id: modPass.id
                },
                data : {
                    pass : modPass.newPass
                }
            });

            if(userDataMod){
                res.status(200).send({
                    "message" : "Success!",
                })
            }else{
                res.status(404).send({
                    "message" : "Data not found!",
                })
            }
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    // function for change user information
    async mod(req, res){
        try{
            const ModData = ModDTO(req);

            if(!ModData.id){
                return res.status(400).send({
                    "message" : "Bad request!",
                })
            }

            if(req.u.BASEROLE !== "ADMIN"){
                delete ModData.role;
            }

            if(req.u.BASEROLE === "RECEPTION"){
                ModData.role = 2;
            }

            if(ModData.pass){
                ModData.pass = await new Hashtool().Hash(ModData.pass)
            }else{
                delete ModData.pass
            }

            if(req.u.BASEROLE !== "ADMIN" && req.u.BASEROLE !== "RECEPTION"){
                delete ModData.pass, ModData.phone, ModData.mail, ModData.role
            }

            const id = ModData.id
            delete ModData.id;

            if(ModData.role !== 2){
                ModData.specialtyID = null;
            }

            const exist = await prisma.user.findFirst({
                where : {
                    id: id
                },
                select:{
                    id: true,
                    role: true
                }
            })

            if(roleMappingRaw(req.u.BASEROLE) > 1){
                if(id !== req.u.BASEID){
                    return res.status(403).send({
                        "message" : "You don't have permission for this activity!",
                    })
                }
            }else{
                if(exist){
                    if(roleMappingRaw(req.u.BASEROLE) === 1){
                        if(exist.role !== 3){
                            if(exist.role === 1){
                                if(id !== req.u.BASEID){
                                    return res.status(403).send({
                                        "message" : "You don't have permission for this activity!",
                                    })
                                }
                            }else{
                                return res.status(403).send({
                                    "message" : "You don't have permission for this activity!",
                                })
                            }
                        }
                    }
                }else{
                    return res.status(404).send({
                        "message" : "User not found!",
                    })
                }
            }

            if(exist.role !== 2){
                delete ModData.specialtyID;
            }

            const now = new Date();
            const mod = await prisma.user.update({
                where : {
                    id: id
                },
                data : {
                    date02 : now,
                    ...ModData
                }
            });

            if(mod){
                delete mod.pass;
                res.status(200).send({
                    "message" : "Success!",
                    "userdata": mod
                })
            }else{
                res.status(404).send({
                    "message" : "Data not found!",
                })
            }
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }
    }

    // function for delete user
    async delete(req, res){
        try{
            const userID = req.body.id ? !isNaN(req.body.id ) ? req.body.id *1 : null : null;
            if(!userID){
                return res.status(400).send({
                    "message" : "Bad request!",
                })
            }

            const role_map = roleMappingRaw(req.u.BASEROLE);
            if(role_map > 1){
                if(userID !== req.u.BASEID){
                    return res.status(403).send({
                        "message" : "You don't have permission for this activity!",
                    })
                }
            }

            const exist = await prisma.user.findFirst({
                where: {
                    id: userID
                },
                select :{
                    id: true,
                    role: true
                }
            })

            if(exist){
                if(exist.role < 3 && role_map === 1){
                    return res.status(403).send({
                        "message" : "You don't have permission for this activity!",
                    })
                }else if(exist.role === 0){
                    return res.status(403).send({
                        "message" : "You don't have permission for this activity!",
                    })
                }
            }else{
                return res.status(403).send({
                    "message" : "User not found!",
                })
            }

            await prisma.record.deleteMany({
                where:{
                    booking:{
                        OR:[
                            {
                                doctorID: userID
                            },
                            {
                                clientID: userID
                            }
                        ]
                    }
                }
            })

            await prisma.note.deleteMany({
                where:{
                    booking:{
                        OR:[
                            {
                                doctorID: userID
                            },
                            {
                                clientID: userID
                            }
                        ]
                    }
                }
            })
            
            await prisma.booking.deleteMany({
                where:{
                    OR:[
                        {
                            clientID: userID
                        },
                        {
                            doctorID: userID
                        }
                    ]
                }
            })

            const isDelete = await prisma.user.delete({
                where: {
                    id : userID
                }
            })

            if(isDelete){
                res.status(200).send({
                    "message": "Success",
                })
            }else{
                return res.status(404).send({
                    "message" : "Data not found!",
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

module.exports = userModel
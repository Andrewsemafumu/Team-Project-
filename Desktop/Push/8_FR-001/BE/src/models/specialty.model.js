const { prisma } = require("../config/connectSql");
const { GetLstPageDTO } = require("../DTO/specialty/GetLstPageDTO");
const { ModDTO } = require("../DTO/specialty/ModDTO");
const { NewDTO } = require("../DTO/specialty/newDTO");

class specialtyModel{

    // function for create new specialty
    async create(req, res){
        const newData = NewDTO(req);
        
        if(!newData.name){
            return res.status(400).send({
                "message": "Bad request!"
            });
        }

        const res_new = await prisma.specialty.create({
            data:{
                ...newData
            }
        })

        if(res_new.id){
            res.status(200).send({
                "message": "Success!"
            });
        }else{
            res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    // function for edit specialty information
    async mod(req, res){
        const modData = ModDTO(req);

        if(!modData.name || !modData.id){
            return res.status(400).send({
                "message": "Bad request!"
            });
        }

        const res_mod = await prisma.specialty.update({
            where:{
                id: modData.id
            },
            data:{
                name: modData.name
            }
        })

        if(res_mod.id){
            res.status(200).send({
                "message": "Success!"
            });
        }else{
            res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    // function for delete specialty
    async delete(req, res){
        const id = req.body.id ? !isNaN(req.body.id) ? req.body.id *1 : null : null;

        if(!id){
            return res.status(400).send({
                "message": "Bad request!"
            });
        }

        await prisma.specialty.delete({
            where: {
                id: id
            }
        });

        res.status(200).send({
            "message": "Success!"
        });
    }

    // function for get all specialty
    async getall(req, res){
        const search = req.query.search || "";

        const data = await prisma.specialty.findMany({
            where : {
                OR:[
                    {
                        name: {
                            contains: search
                        }
                    },
                ]
            },
            
            select: {
                id: true,
                name: true,
                date01: true,
                date02: true,
                doctor: {
                    select:{
                        id: true,
                        name: true,
                        ava: true
                    }
                }
            }
        });
        res.status(200).send({
            "data" : data,
            "message" : "Success"
        })
    }

    // function for get one specialty
    async get(req, res){
        const id = req.query.id ? !isNaN(req.query.id) ? req.query.id *1 : null : null;

        if(!id)
            return res.status(400).send({
                "message" : "Bad request!",
            })

        const data = await prisma.specialty.findUnique({
            where : {
                id: id,
            },
            select: {
                id : true,
                name : true,
                doctor: {
                    select:{
                        id: true,
                        name: true,
                        ava: true
                    }
                }
            }
        });

        if(data){
            res.status(200).send({
                "message" : "Success",
                "data" : data
            })
        }else{
            res.status(404).send({
                "message" : "Data not found!",
            })
        }
    }

    // function for list page specialty
    async getpage(req, res){
        const SpecLstPageData = GetLstPageDTO(req);

        for(var k in SpecLstPageData){
            if(SpecLstPageData.hasOwnProperty(k)){
                if(SpecLstPageData[k] === null || SpecLstPageData[k] === "" || SpecLstPageData[k] === undefined){
                    delete SpecLstPageData[k];
                }
            }
        }

        if(!SpecLstPageData.search){
            SpecLstPageData.search = ""
        }
        const search = SpecLstPageData.search;
        delete SpecLstPageData.search;
        const page = SpecLstPageData.page;
        delete SpecLstPageData.page;
        const skip = (page - 1) * SpecLstPageData.size; 
        delete SpecLstPageData.page;
        const size = SpecLstPageData.size;
        delete SpecLstPageData.size;

        const data = await prisma.specialty.findMany({
            skip : skip,
            take : size,
            orderBy : {
                id : "desc"
            },
            where : {
                name: {
                    contains: search
                }
            },
            select: {
                id : true,
                name : true,
                doctor:{
                    select:{
                        id: true,
                        name: true,
                        ava: true
                    }
                }
            }
        });

        const total = await prisma.specialty.count({
            orderBy : {
                id : "desc"
            },
            where : {
                displayName : {
                    contains : search
                },
                ...SpecLstPageData,
            },
        })

        const totalPages = Math.ceil(total / size);

        res.status(200).send({
            "message": "Success",
            "data" : data,
            "total": totalPages,
            "next" : page < totalPages ? true : false  
        })
                                
    }

}

module.exports = specialtyModel;
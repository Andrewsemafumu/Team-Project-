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

    async update_status(req, res){
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

            var status = null
            if(booking){
                if(booking.status === 1){
                    status = 2
                }else if(booking.status === 2){
                    status = 3
                }else{
                    return res.status(409).send({
                        "message": "Cannot update booking status!"
                    })
                }

                const update_booking = await prisma.booking.update({
                    where: {
                        id: bookingID
                    },
                    data: {
                        status : status
                    }
                })

                if(!update_booking){
                    return res.status(409).send({
                        "message": "Cannot update booking status!"
                    })
                }else{
                    return res.status(200).send({
                        "message": "Success!"
                    })
                }

            }else{
                return res.status(404).send({
                    "message": "Booking not !"
                })
            }
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            });
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

    async statistics(req, res){
        
        const statictis_doctor_booking = await prisma.booking.groupBy({
            by: ['doctorID'],
            _count: {
                id: true
            }
        })

        const all_doctor_mapping = await prisma.user.findMany({
            where: {
                role: 2
            },
            include: {
                specialty: true
            }
        })

        for(var doc_book of statictis_doctor_booking){
            for(var doc of all_doctor_mapping){
                if(doc_book.doctorID === doc.id){
                    doc_book.name = doc.name;
                    doc_book.specialty = doc.specialty.name
                    break
                }
            }
        }

        const statictis_patient_booking = await prisma.booking.groupBy({
            by: ['clientID'],
            _count: {
                id: true
            }
        })

        const all_patient_mapping = await prisma.user.findMany({
            where: {
                role: 3
            },
            include: {
                specialty: true
            }
        })

        for(var patient_book of statictis_patient_booking){
            for(var patient of all_patient_mapping){
                if(patient_book.clientID === patient.id){
                    patient_book.name = patient.name;
                    break
                }
            }
        }

        var today = new Date();
        var start_today = `${today.getFullYear()}-${today.getMonth()+1 > 10 ? today.getMonth()+1 : `0${today.getMonth()+1}`}-${today.getDate()}T00:00:00.000Z`
        var end_today = `${today.getFullYear()}-${today.getMonth()+1 > 10 ? today.getMonth()+1 : `0${today.getMonth()+1}`}-${today.getDate()}T23:59:59.000Z`

        const statictis_doctor_today_sumary = await prisma.booking.groupBy({
            by:['doctorID'],
            where:{
                bookingDate: {
                    gte: start_today,
                    lte: end_today
                }
            },
            _count:{
                id:true
            }
        })

        for(var today_doc_book of statictis_doctor_today_sumary){
            for(var doc of all_doctor_mapping){
                if(today_doc_book.doctorID === doc.id){
                    today_doc_book.name = doc.name;
                    today_doc_book.specialty = doc.specialty.name
                    break
                }
            }
        }

        const statictis_patient_today_sumary = await prisma.booking.groupBy({
            by:['clientID'],
            where:{
                bookingDate: {
                    gte: start_today,
                    lte: end_today
                }
            },
            _count:{
                id:true
            }
        })

        for(var today_patient_book of statictis_patient_today_sumary){
            for(var patient of all_patient_mapping){
                if(today_patient_book.clientID === patient.id){
                    today_patient_book.name = patient.name;
                    break
                }
            }
        }

        const raw = await prisma.$queryRaw`
        SELECT DATE(bookingDate) AS booking_date, COUNT(*) AS total
        FROM Booking
        GROUP BY DATE(bookingDate)
        ORDER BY booking_date ASC
        `;

        const statictis_date_booking = raw.map(item => ({
        ...item,
        total: Number(item.total),
        }));

        const count_doctor = await prisma.user.count({
            where:{
                role: 2
            }
        })

        const count_patient = await prisma.user.count({
            where:{
                role: 3
            }
        })

        const count_reception = await prisma.user.count({
            where:{
                role: 1
            }
        })

        res.status(200).send({
            "message": "Success!",
            "statistic_doctor": statictis_doctor_booking,
            "statistic_patient": statictis_patient_booking,
            "statistic_date": statictis_date_booking,
            "statistic_doctor_today": statictis_doctor_today_sumary,
            "statistic_patient_today": statictis_patient_today_sumary,
            "user": {
                "doctor": count_doctor,
                "patient": count_patient,
                "reception": count_reception
            }
        })
        
    }

    async today_report(req,res){
        try{
            var today = new Date();
            var start_today = `${today.getFullYear()}-${today.getMonth()+1 > 10 ? today.getMonth()+1 : `0${today.getMonth()+1}`}-${today.getDate()}T00:00:00.000Z`
            var end_today = `${today.getFullYear()}-${today.getMonth()+1 > 10 ? today.getMonth()+1 : `0${today.getMonth()+1}`}-${today.getDate()}T23:59:59.000Z`

            const booked_booking = await prisma.booking.count({
                where:{
                    status: 1,
                    bookingDate: {
                        gte: start_today,
                        lte: end_today
                    }
                },
            })

            const checkin_booking = await prisma.booking.count({
                where:{
                    status: 2,
                    bookingDate: {
                        gte: start_today,
                        lte: end_today
                    }
                },
            })

            const completed_booking = await prisma.booking.count({
                where:{
                    status: 3,
                    bookingDate: {
                        gte: start_today,
                        lte: end_today
                    }
                },
            })

            const doctor_created_today_booking = await prisma.user.count({
                where:{
                    role: 2,
                    date01: {
                        gte: start_today,
                        lte: end_today
                    }
                },
            })

            const reception_created_today_booking = await prisma.user.count({
                where:{
                    role: 1,
                    date01: {
                        gte: start_today,
                        lte: end_today
                    }
                },
            })

            const patient_created_today_booking = await prisma.user.count({
                where:{
                    role: 3,
                    date01: {
                        gte: start_today,
                        lte: end_today
                    }
                },
            })

            const doctor_have_specialty = await prisma.user.count({
                where:{
                    role: 2,
                    specialty: {
                        isNot: null
                    }
                },
            })

            const doctor_dont_have_specialty = await prisma.user.count({
                where:{
                    role: 2,
                    specialty: {
                        is: null
                    }
                },
            })

            const count_specialty = await prisma.specialty.count()

            const count_specialty_create_today = await prisma.specialty.count({
                where:{
                    date01: {
                        gte: start_today,
                        lte: end_today
                    }
                }
            })
            
            res.status(200).send({
                "message": "Success!",
                "booked": booked_booking,
                "checkin": checkin_booking,
                "complete": completed_booking,
                "doctor_create_today": doctor_created_today_booking,
                "patient_create_today": patient_created_today_booking,
                "reception_create_today": reception_created_today_booking,
                "doctor_have_specialty": doctor_have_specialty,
                "doctor_dont_have_specialty": doctor_dont_have_specialty,
                "specialty": count_specialty,
                "specialty_create_today": count_specialty_create_today
            })
        }catch(err){
            console.error(err);
            res.status(500).send({
                "message": "Server error!"
            })
        }


    }

}

module.exports = bookingModel;
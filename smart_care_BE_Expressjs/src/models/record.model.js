const { prisma } = require("../config/connectSql");
const { ModDTO } = require("../DTO/record/ModDTO");
const { NewDTO } = require("../DTO/record/NewDTO");

class recordModel{

    async get(req, res){
        try{
            const bookingID = req.query.bookingID ? !isNaN(req.query.bookingID) ? req.query.bookingID * 1 : null : null;
            const userID =  req.query.id ? !isNaN(req.query.id) ? req.query.id * 1 : null : null;

            if(!bookingID){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "CLIENT" || req.u.BASEROLE === "DOCTOR"){
                if(!userID){
                    return res.status(400).send({
                        "message": "Bad request!"
                    });
                }
            }

            if(req.u.BASEROLE === "CLIENT"){
                if(req.u.BASEID === userID){
                    const patient_booking = await prisma.booking.findUnique({
                        where:{
                            id: bookingID,
                            clientID: userID
                        },
                        include:{
                            record: true
                        }
                    })

                    if(!patient_booking){
                        return res.status(404).send({
                            "message": "Booking not found!"
                        });
                    }
                    
                    return res.status(200).send({
                        "message": "Success!",
                        "data": patient_booking
                    });
                }
            }

            if(req.u.BASEROLE === "DOCTOR"){
                if(req.u.BASEID === userID){
                    const doctor_booking = await prisma.booking.findUnique({
                        where:{
                            id: bookingID,
                            doctorID: userID
                        },
                        include:{
                            record: true
                        }
                    })

                    if(!doctor_booking){
                        return res.status(404).send({
                            "message": "Booking not found!"
                        });
                    }

                    return res.status(200).send({
                        "message": "Success!",
                        "data": doctor_booking
                    });
                }
            }

            if(req.u.BASEROLE === "ADMIN"){
                const booking_diagnose = await prisma.booking.findUnique({
                    where:{
                        id: bookingID,
                    },
                    include:{
                        record: true
                    }
                })

                if(!booking_diagnose){
                    return res.status(404).send({
                        "message": "Booking not found!"
                    });
                }

                return res.status(200).send({
                    "message": "Success!",
                    "data": booking_diagnose
                });
            }

            res.status(403).send({
                "message": "You don't have any permission for this activity!",
            });
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async get_history(req, res){
        try{
            const userID =  req.query.id ? !isNaN(req.query.id) ? req.query.id * 1 : null : null;

            if(!userID){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "CLIENT"){
                if(req.u.BASEID === userID){
                    const patient_booking = await prisma.booking.findMany({
                        where:{
                            clientID: userID
                        },
                        select:{
                            doctor: true,
                            bookingDate: true,
                            record: true
                        }
                    })

                    if(!patient_booking){
                        return res.status(404).send({
                            "message": "Booking not found!"
                        });
                    }
                    
                    return res.status(200).send({
                        "message": "Success!",
                        "data": patient_booking
                    });
                }
            }

            if(req.u.BASEROLE === "ADMIN" || req.u.BASEROLE === "DOCTOR"){
                const booking_diagnose = await prisma.booking.findMany({
                    where:{
                        clientID: userID
                    },
                    select:{
                        doctor: true,
                        bookingDate: true,
                        record: true
                    }
                })

                if(!booking_diagnose){
                    return res.status(404).send({
                        "message": "Booking not found!"
                    });
                }

                return res.status(200).send({
                    "message": "Success!",
                    "data": booking_diagnose
                });
            }

            res.status(403).send({
                "message": "You don't have any permission for this activity!",
            });
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async create(req, res){
        try{
            const newDiagnose = NewDTO(req);

            if(!newDiagnose.userID){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            const userID = newDiagnose.userID;
            delete newDiagnose.userID;

            if(!newDiagnose.bookingID){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "DOCTOR"){
                if(req.u.BASEID === userID){
                    const doctor_booking = await prisma.booking.findUnique({
                        where:{
                            id: newDiagnose.bookingID,
                            doctorID: userID
                        },
                        select: {
                            id: true
                        }
                    })

                    if(!doctor_booking){
                        return res.status(404).send({
                            "message": "Booking not found!"
                        });
                    }

                }
            }

            if(req.u.BASEROLE === "ADMIN"){
                const booking_diagnose = await prisma.booking.findUnique({
                    where:{
                        id: newDiagnose.bookingID,
                    },
                    select: {
                        id: true
                    }
                })

                if(!booking_diagnose){
                    return res.status(404).send({
                        "message": "Booking not found!"
                    });
                }

            }

            if(req.u.BASEROLE !== "ADMIN" && req.u.BASEROLE !== "DOCTOR"){
                return res.status(403).send({
                    "message": "You don't have any permission for this activity!",
                });
            }

            const res_new = await prisma.record.create({
                data: {
                    ...newDiagnose
                }
            })

            if(!res_new){
                return res.status(409).send({
                    "message": "Diagnose conflict!"
                })
            }

            const assign_record_tobooking = await prisma.booking.update({
                where:{
                    id: res_new.bookingID
                },
                data: {
                    recordID: res_new.id
                }
            })

            return res.status(200).send({
                "message": "Success!"
            });
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

    async update(req, res){
        try{
            const updateDiagnose = ModDTO(req);

            if(!updateDiagnose.userID){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            const userID = updateDiagnose.userID;
            delete updateDiagnose.userID;

            if(!updateDiagnose.id){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(!updateDiagnose.bookingID){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "DOCTOR"){
                if(req.u.BASEID === userID){
                    const doctor_booking = await prisma.booking.findUnique({
                        where:{
                            id: updateDiagnose.bookingID,
                            doctorID: userID
                        },
                        select: {
                            id: true
                        }
                    })

                    if(!doctor_booking){
                        return res.status(404).send({
                            "message": "Booking not found!"
                        });
                    }

                }
            }

            if(req.u.BASEROLE === "ADMIN"){
                const booking_diagnose = await prisma.booking.findUnique({
                    where:{
                        id: updateDiagnose.bookingID,
                    },
                    select: {
                        id: true
                    }
                })

                if(!booking_diagnose){
                    return res.status(404).send({
                        "message": "Booking not found!"
                    });
                }
            }

            if(req.u.BASEROLE !== "ADMIN" && req.u.BASEROLE !== "DOCTOR"){
                return res.status(403).send({
                    "message": "You don't have any permission for this activity!",
                });
            }

            const id = updateDiagnose.id;
            delete updateDiagnose.id;

            const res_update = await prisma.record.update({
                where:{
                    id: id
                },
                data: {
                    ...updateDiagnose
                }
            })

            if(!res_update){
                return res.status(404).send({
                    "message": "Diagnose not found!"
                })
            }

            return res.status(200).send({
                "message": "Success!"
            });
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

}

module.exports = recordModel
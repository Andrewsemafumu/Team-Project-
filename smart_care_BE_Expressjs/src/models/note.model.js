const { prisma } = require("../config/connectSql");
const { ModDTO } = require("../DTO/note/ModDTO");
const { NewDTO } = require("../DTO/note/NewDTO");

class noteModel{
 
    async get_all(req, res){
        try{
            const userID =  req.query.id ? !isNaN(req.query.id) ? req.query.id * 1 : null : null;
            const bookingID = req.query.bookingID ? !isNaN(req.query.bookingID) ? req.query.bookingID * 1 : null : null;
            
            if(!bookingID){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "CLIENT"){

                if(!userID){
                    return res.status(400).send({
                        "message": "Bad request!"
                    });
                }

                if(req.u.BASEID === userID){
                    const patient_in_booking = await prisma.booking.findFirst({
                        where:{
                            id : bookingID,
                            clientID: userID
                        },
                        select:{
                            note: true
                        }
                    })

                    if(!patient_in_booking){
                        return res.status(403).send({
                            "message": "You don't have any permission for this activity!",
                        });
                    }
                    
                    return res.status(200).send({
                        "message": "Success!",
                        "data": patient_in_booking
                    });
                }
            }

            if(req.u.BASEROLE === "ADMIN" || req.u.BASEROLE === "DOCTOR"){
                const booking_note = await prisma.booking.findFirst({
                    where:{
                        id: bookingID,
                    },
                    select:{
                        note: true
                    }
                })

                return res.status(200).send({
                    "message": "Success!",
                    "data": booking_note
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

    async get(req,res){
        try{
            const userID =  req.query.userID ? !isNaN(req.query.userID) ? req.query.userID * 1 : null : null;
            const id =  req.query.id ? !isNaN(req.query.id) ? req.query.id * 1 : null : null;
            const bookingID = req.query.bookingID ? !isNaN(req.query.bookingID) ? req.query.bookingID * 1 : null : null;
            
            if(!bookingID || !id){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "DOCTOR" || req.u.BASEROLE === "ADMIN"){

                if(!userID){
                    return res.status(400).send({
                        "message": "Bad request!"
                    });
                }

                if(req.u.BASEID === userID){
                    const booking_note = await prisma.note.findFirst({
                        where:{
                            id: id,
                            bookingID: bookingID
                        }
                    })

                    if(booking_note){
                        return res.status(200).send({
                            "message": "Success!",
                            "data": booking_note
                        });
                    }else{
                        return res.status(403).send({
                            "message": "Note not found!",
                        });
                    }
                }
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

    async add(req, res){
        try{

            const newNote = NewDTO(req);

            const userID = newNote.userID;
            delete newNote.userID;

            if(!newNote.bookingID){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "DOCTOR"){
                if(req.u.BASEID === userID){
                    const booking = await prisma.booking.findUnique({
                        where:{
                            id: newNote.bookingID,
                            doctorID: userID
                        },
                        select: {
                            id: true
                        }
                    })

                    if(!booking){
                        return res.status(404).send({
                            "message": "Booking not found!"
                        });
                    }

                }
            }

            if(req.u.BASEROLE === "ADMIN"){
                const booking = await prisma.booking.findUnique({
                    where:{
                        id: newNote.bookingID,
                    },
                    select: {
                        id: true
                    }
                })

                if(!booking){
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

            const res_new = await prisma.note.create({
                data: {
                    ...newNote
                }
            })

            if(!res_new){
                return res.status(500).send({
                    "message": "Error, cannot add note!"
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
    
    async update(req, res){
        try{

            const modNote = ModDTO(req);

            const userID = modNote.userID;
            delete modNote.userID;

            const id = modNote.id;
            delete modNote.id;

            if(!modNote.bookingID || !id){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "DOCTOR"){
                if(req.u.BASEID === userID){
                    const booking = await prisma.booking.findUnique({
                        where:{
                            id: modNote.bookingID,
                            doctorID: userID
                        },
                        select: {
                            id: true
                        }
                    })

                    if(!booking){
                        return res.status(404).send({
                            "message": "Booking not found!"
                        });
                    }

                }
            }

            if(req.u.BASEROLE === "ADMIN"){
                const booking = await prisma.booking.findUnique({
                    where:{
                        id: modNote.bookingID,
                    },
                    select: {
                        id: true
                    }
                })

                if(!booking){
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

            const res_update = await prisma.note.update({
                where: {
                    id: id
                },
                data: {
                    ...modNote
                }
            })

            if(!res_update){
                return res.status(500).send({
                    "message": "Error, cannot update note!"
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

    async delete(req, res){
        try{
            const id = req.body.id ? !isNaN(req.body.id) ? req.body.id * 1 : null : null;
            const userID = req.body.userID ? !isNaN(req.body.userID) ? req.body.userID * 1 : null : null;
            const bookingID = req.body.bookingID ? !isNaN(req.body.bookingID) ? req.body.bookingID * 1 : null : null;

            if(!id){
                return res.status(400).send({
                    "message": "Bad request!"
                });
            }

            if(req.u.BASEROLE === "DOCTOR"){
                if(req.u.BASEID === userID){
                    const booking = await prisma.booking.findUnique({
                        where:{
                            id: bookingID,
                            doctorID: userID
                        },
                        select: {
                            id: true
                        }
                    })

                    if(!booking){
                        return res.status(404).send({
                            "message": "Booking not found!"
                        });
                    }

                    const res_delete = await prisma.note.delete({
                        where: {
                            id: id,
                            bookingID: bookingID
                        }
                    })

                    if(res_delete){
                        return res.status(200).send({
                            "message": "Success!"
                        });
                    }else{
                        return res.status(500).send({
                            "message": "Cannot delete note!"
                        });
                    }

                }
            }else if(req.u.BASEROLE === "ADMIN"){
                const res_delete = await prisma.note.delete({
                    where: {
                        id: id,
                    }
                })

                if(res_delete){
                    return res.status(200).send({
                        "message": "Success!"
                    });
                }else{
                    return res.status(500).send({
                        "message": "Cannot delete note!"
                    });
                }
            }

            return res.status(403).send({
                "message": "You don't have any permission for this activity!",
            });
        }catch(err){
            console.error(err);
            return res.status(500).send({
                "message": "Server error!"
            });
        }
    }

}

module.exports = noteModel;
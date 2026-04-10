function ModDTO(req){
    return{
        id : req.body.id ? !isNaN(req.body.id) ?  req.body.id * 1 : 0 : 0,
        title: req.body.title ? req.body.title : `Booking from client`,
        descript : req.body.descript ? req.body.descript : "",
        bookingDate : req.body.datetime ? req.body.datetime : null,
        clientID : req.body.clientID ? req.body.clientID *1: null,
        doctorID : req.body.doctorID ? req.body.doctorID *1: null,
        status: req.body.status ? req.body.status*1 : null,
        date02: new Date()
    };
}

module.exports = {ModDTO}
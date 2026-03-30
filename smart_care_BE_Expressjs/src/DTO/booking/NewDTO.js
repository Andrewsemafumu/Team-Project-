function NewDTO(req){
    return{
        title: req.body.title ? req.body.title : `Booking`,
        descript : req.body.descript ? req.body.descript : "",
        bookingDate : req.body.datetime ? req.body.datetime : null,
        clientID : req.body.clientID ? !isNaN(req.body.clientID) ? req.body.clientID *1 : null : null,
        doctorID : req.body.doctorID ? !isNaN(req.body.doctorID) ? req.body.doctorID *1 : null : null,
        status : req.body.status ? !isNaN(req.body.status) ? req.body.status *1 : 1 : 1,
    };
}

module.exports = {NewDTO}
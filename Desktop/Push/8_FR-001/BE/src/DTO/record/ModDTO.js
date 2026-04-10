function ModDTO(req){
    return{
        userID : req.body.userID ? !isNaN(req.body.userID) ? req.body.userID * 1 : null : null,
        title: req.body.title ? req.body.title : `Untitle Diagnose`,
        descript : req.body.descript ? req.body.descript : "",
        bookingID: req.body.bookingID ? !isNaN(req.body.bookingID) ? req.body.bookingID * 1 : null : null,
        id : req.body.id ? !isNaN(req.body.id) ? req.body.id * 1 : null : null,
    };
}

module.exports = {ModDTO}
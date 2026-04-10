function NewDTO(req){
    return{
        userID : req.body.userID ? !isNaN(req.body.userID) ? req.body.userID * 1 : null : null,
        title: req.body.title ? req.body.title : `Untitle Diagnose`,
        descript : req.body.descript ? req.body.descript : "",
        bookingID: req.body.bookingID ? !isNaN(req.body.bookingID) ? req.body.bookingID * 1 : null : null,
    };
}

module.exports = {NewDTO}
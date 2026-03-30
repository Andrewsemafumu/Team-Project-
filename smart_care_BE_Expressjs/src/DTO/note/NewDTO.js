function NewDTO(req){
    return{
        userID: req.body.userID ? !isNaN(req.body.userID) ? req.body.userID * 1 : null : null,
        title: req.body.title ? req.body.title : `Untitle Note`,
        descript : req.body.descript ? req.body.descript : "Blank Descript",
        bookingID: req.body.bookingID ? !isNaN(req.body.bookingID) ? req.body.bookingID * 1 : null : null 
    };
}

module.exports = {NewDTO}
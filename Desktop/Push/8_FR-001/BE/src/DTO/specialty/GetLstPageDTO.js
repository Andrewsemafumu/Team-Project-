function GetLstPageDTO(req){
    return{
        page            : req.query.page ? req.query.page * 1 : 1,
        size            : req.query.size ? req.query.size * 1 : 8,
        search          : req.query.search || "",
    }
}

module.exports = {GetLstPageDTO};
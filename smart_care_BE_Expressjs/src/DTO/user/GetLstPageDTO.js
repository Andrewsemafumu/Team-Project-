function GetLstPageDTO(req){
    return{
        page            : req.body.page ? req.body.page * 1 : 1,
        size            : req.body.size ? req.body.size * 1 : 8,
        search          : req.body.search || "",
    }
}

module.exports = {GetLstPageDTO};
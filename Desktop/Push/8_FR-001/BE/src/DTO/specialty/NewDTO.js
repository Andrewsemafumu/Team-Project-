function NewDTO(req){
    return {
        name: req.body.name ? req.body.name : null
    }
}

module.exports = { NewDTO }
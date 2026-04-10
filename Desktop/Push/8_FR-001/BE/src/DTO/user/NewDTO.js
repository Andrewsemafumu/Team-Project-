function NewDTO(req) {
  return {
    name        : req.body.name ? req.body.name : null,
    pass        : req.body.pass ? req.body.pass : null,
    phone       : req.body.phone ? req.body.phone : null,
    mail        : req.body.mail ? req.body.mail : null,
    role        : req.body.role !== null || req.body.role !== undefined ? req.body.role * 1 : 3,
    ava         : "defaultimg.jpg",
    sex         : req.body.sex ? req.body.sex * 1 : 0,
    birthdate   : req.body.birthdate ? req.body.birthdate : null,
    address     : req.body.address ? req.body.address : null,
    specialtyID: req.body.specialtyID ? !isNaN(req.body.specialtyID) ? req.body.specialtyID * 1 : null : null,
  };
}

module.exports = {NewDTO}
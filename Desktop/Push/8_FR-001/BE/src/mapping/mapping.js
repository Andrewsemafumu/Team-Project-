function roleMapping(role){
    switch(role){
        case "0":
            return "ADMIN";
        case "1":
            return "RECEPTION";
        case "2":
            return "DOCTOR";
        case "3":
            return "CLIENT";
        default:
            return null;      
    }
}

function roleMappingRaw(role){
    switch(role){
        case "ADMIN":
            return 0;
        case "RECEPTION":
            return 1;
        case "DOCTOR":
            return 2;
        case "CLIENT":
            return 3;
        default:
            return null;      
    }
}

module.exports = {
    roleMapping,
    roleMappingRaw
}

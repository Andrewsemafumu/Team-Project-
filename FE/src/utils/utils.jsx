class utils{

    UID = localStorage.getItem("%UI%") ? localStorage.getItem("%UI%") : null;

    UNAME = localStorage.getItem("%UN%") ? localStorage.getItem("%UN%") : null;

    USEX = localStorage.getItem("%USEX%") ? localStorage.getItem("%USEX%") : null;

    UPHONE = localStorage.getItem("%UPHONE%") ? localStorage.getItem("%UPHONE%") : null;
    
    UADDRESS = localStorage.getItem("%UADDR%") ? localStorage.getItem("%UADDR%") : null;

    UMAIL = localStorage.getItem("%UM%") ? localStorage.getItem("%UM%") : null;

    UIMG = localStorage.getItem("%UAVA%") ? localStorage.getItem("%UAVA%") : null;

    UDT01 = localStorage.getItem("%UDT01%") ? localStorage.getItem("%UDT01%") : null;

    UDT02 = localStorage.getItem("%UDT02%") ? localStorage.getItem("%UDT02%") : null;

    UROLE = localStorage.getItem("%UR%") ? localStorage.getItem("%UR%") : null;

    UDESC = localStorage.getItem("%UDES%") ? localStorage.getItem("%UDES%") : null;

    UBIRTH = localStorage.getItem("%UBD%") ? localStorage.getItem("%UBD%") : null;

    USPEC = localStorage.getItem("%USPEC%") ? localStorage.getItem("%USPEC%") *1: null;

    Update_uD = ()=>{
        this.UID = localStorage.getItem("%UI%") ? localStorage.getItem("%UI%") : null;
        
        this.UNAME = localStorage.getItem("%UN%") ? localStorage.getItem("%UN%") : null;

        this.USEX = localStorage.getItem("%USEX%") ? localStorage.getItem("%USEX%") : null;

        this.UADDRESS = localStorage.getItem("%UADDR%") ? localStorage.getItem("%UADDR%") : null;

        this.UMAIL = localStorage.getItem("%UM%") ? localStorage.getItem("%UM%") : null;

        this.UPHONE = localStorage.getItem("%UPHONE%") ? localStorage.getItem("%UPHONE%") : null;

        this.UIMG = localStorage.getItem("%UAVA%") ? localStorage.getItem("%UAVA%") : null;

        this.UATYPE = localStorage.getItem("%UAT%") ? localStorage.getItem("%UAT%") : null;

        this.UDT01 = localStorage.getItem("%UDT01%") ? localStorage.getItem("%UDT01%") : null;

        this.UDT02 = localStorage.getItem("%UDT02%") ? localStorage.getItem("%UDT02%") : null;

        this.UROLE = localStorage.getItem("%UR%") ? localStorage.getItem("%UR%") : null;

        this.UDESC = localStorage.getItem("%UDES%") ? localStorage.getItem("%UDES%") : null;

        this.UBIRTH = localStorage.getItem("%UBD%") ? localStorage.getItem("%UBD%") : null;

        this.USPEC = localStorage.getItem("%USPEC%") ? localStorage.getItem("%USPEC%") *1: null;
    }

    Save_uD = async (u)=>{
        if(u.userdata.id){
            localStorage.setItem("%UI%",u.userdata.id);
            this.UID = localStorage.getItem("%UI%") ? localStorage.getItem("%UI%") : null;
        }
        if(u.userdata.name){
            localStorage.setItem("%UN%",u.userdata.name);
            this.UNAME = localStorage.getItem("%UN%") ? localStorage.getItem("%UN%") : null;
        }
        if(u.userdata.birthdate){
            localStorage.setItem("%UBD%",u.userdata.birthdate);
            this.UBIRTH = localStorage.getItem("%UBD%") ? localStorage.getItem("%UBD%") : null;
        }else{
            this.UBIRTH = null;
        }
        if(u.userdata.sex !== null){
            localStorage.setItem("%USEX%",u.userdata.sex);
            this.USEX = localStorage.getItem("%USEX%") ? localStorage.getItem("%USEX%") : null;
        }else{
            this.USEX = 0;
        }
        if(u.userdata.phone){
            localStorage.setItem("%UPHONE%",u.userdata.phone);
            this.UPHONE = localStorage.getItem("%UPHONE%") ? localStorage.getItem("%UPHONE%") : null;
        }
        if(u.userdata.address){
            localStorage.setItem("%UADDR%",u.userdata.address);
            this.UADDRESS = localStorage.getItem("%UADDR%") ? localStorage.getItem("%UADDR%") : null;
        }else{
            this.UADDRESS = null;
        }
        if(u.userdata.mail){
            localStorage.setItem("%UM%",u.userdata.mail);
            this.UMAIL = localStorage.getItem("%UM%") ? localStorage.getItem("%UM%") : null;
        }
        if(u.userdata.descript){
            localStorage.setItem("%UDES%",u.userdata.descript);
            this.UDESC = localStorage.getItem("%UDES%") ? localStorage.getItem("%UDES%") : null;
        }else{
            this.UDESC = null;
        }
        if(u.userdata.ava){
            localStorage.setItem("%UAVA%",this.URL_BE_BASE_IMG + u.userdata.ava);
            this.UIMG = localStorage.getItem("%UAVA%") ? localStorage.getItem("%UAVA%") : null;
        }
        if(u.userdata.date01){
            localStorage.setItem("%UDT01%",u.userdata.date01);
            this.UDT01 = localStorage.getItem("%UDT01%") ? localStorage.getItem("%UDT01%") : null;
        }else{
            this.UDT01 = null;
        }
        if(u.userdata.date02){
            localStorage.setItem("%UDT02%",u.userdata.date02);
            this.UDT02 = localStorage.getItem("%UDT02%") ? localStorage.getItem("%UDT02%") : null;
        }else{
            this.UDT02 = null;
        }

        if(u.tokenizer){
            localStorage.setItem("%UT%",u.tokenizer);
        }

        if(u.role){
            localStorage.setItem("%UR%",u.role);
            this.UROLE = localStorage.getItem("%UR%") ? localStorage.getItem("%UR%") : ""
        }

        if(u.userdata.specialtyID){
            localStorage.setItem("%USPEC%",u.userdata.specialtyID);
            this.USPEC = localStorage.getItem("%USPEC%") ? localStorage.getItem("%USPEC%") *1: null;
        }else{
            this.USPEC = null;
        }
  
    }

    ClearLocal     = ()=>{
        localStorage.clear();
        this.Update_uD();
    }

    RoleMap        = (type)=>{
        switch(type){
            case 1: 
                return "RECEPTIONIST";

            case 2: 
                return "DOCTOR";

            case 3:
                return "PATIENT";

            default:
                return null;
        }
    }


    // base
    URL_BE_BASE_IMG    = import.meta.env.VITE_BASE_URL_IMG;
    URL_BE_BASE        = import.meta.env.VITE_BASE_URL;

}

export default new utils();
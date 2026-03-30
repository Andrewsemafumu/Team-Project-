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

    Booking_id_to_time = (id)=>{
        switch(id){
            case 1:
                return "07:30";

            case 2:
                return "08:00";

            case 3:
                return "08:30";

            case 4:
                return "09:00";

            case 5:
                return "09:30";

            case 6:
                return "10:00";

            case 7:
                return "10:30";

            case 8:
                return "11:00";

            case 9:
                return "11:30";
            
            case 10:
                return "13:30";

            case 11:
                return "14:00";

            case 12:
                return "14:30";

            case 13:
                return "15:00";

            case 14:
                return "15:30";

            case 15:
                return "16:00";

            case 16:
                return "16:30";

            case 17:
                return "17:00";

            default:
                return null;
        }
    }

    Booking_time_to_id = (time) => {
        switch(time){
            case "07:30":
                return 1;

            case "08:00":
                return 2;

            case "08:30":
                return 3;

            case "09:00":
                return 4;

            case "09:30":
                return 5;

            case "10:00":
                return 6;

            case "10:30":
                return 7;

            case "11:00":
                return 8;

            case "11:30":
                return 9;

            case "13:30":
                return 10;

            case "14:00":
                return 11;

            case "14:30":
                return 12;

            case "15:00":
                return 13;

            case "15:30":
                return 14;

            case "16:00":
                return 15;

            case "16:30":
                return 16;

            case "17:00":
                return 17;

            default:
                return null;
        }
    };

    booking_time_json_array = ()=>{
        return [
            { id: 1, value: "07:30" },
            { id: 2, value: "08:00" },
            { id: 3, value: "08:30" },
            { id: 4, value: "09:00" },
            { id: 5, value: "09:30" },
            { id: 6, value: "10:00" },
            { id: 7, value: "10:30" },
            { id: 8, value: "11:00" },
            { id: 9, value: "11:30" },
            { id: 10, value: "13:30" },
            { id: 11, value: "14:00" },
            { id: 12, value: "14:30" },
            { id: 13, value: "15:00" },
            { id: 14, value: "15:30" },
            { id: 15, value: "16:00" },
            { id: 16, value: "16:30" },
            { id: 17, value: "17:00" }
        ];
    }

    Booking_status_mapping = (type)=>{
        switch (type) {
            case 1:
                return "Booked";

            case 2:
                return "Checked-in (Waiting)";

            case 3:
                return "Completed";

            // case 4:
            //     return "Rejected";
        
            default:
                return "Undefined";
        }
    }


    // base
    URL_BE_BASE_IMG    = import.meta.env.VITE_BASE_URL_IMG;
    URL_BE_BASE        = import.meta.env.VITE_BASE_URL;

}

export default new utils();
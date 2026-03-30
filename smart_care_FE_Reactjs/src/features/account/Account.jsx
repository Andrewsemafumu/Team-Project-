/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import InputSelect from "../../components/InputSelect";
import InputText from "../../components/InputText";
import Button from "../../components/Button";
import InputTextArea from "../../components/InputTextArea";
import utils from "../../utils/utils";
import $ from "jquery"
import { useNavigate } from "react-router";
import InputDate from "../../components/InputDate";
import { Helmet } from "react-helmet";

function Account(){

    const nav = useNavigate();

    const [specicalties, setSpecialties] = useState([])

    const [userData, setUserData] = useState({
        id: 0,
        name : "",
        phone : "",
        mail: "",
        sex : 0,
        descript : "",
        birthdate : null,
        address: ""
    });


    const change = function(e){
        if(e.target.name === "descript"){
            if(e.target.value){
                if(e.target.value.length <= 500){
                    setUserData({
                        ...userData,
                        [e.target.name]: e.target.value
                    });
                }
            }else{
                setUserData({
                    ...userData,
                    [e.target.name]: e.target.value
                });
            }
        }else if(e.target.name === "name"){
            if(e.target.value){
                if(e.target.value.length <= 50){
                    setUserData({
                        ...userData,
                        [e.target.name]: e.target.value
                    });
                }
            }else{
                setUserData({
                    ...userData,
                    [e.target.name]: e.target.value
                });
            }
        }else{
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            });
        }
    }

    useEffect(()=>{
        if(utils.UID){
            utils.Update_uD()
            var bd = null
            if(utils.UBIRTH){
                var d = new Date(utils.UBIRTH);
                bd = `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
            }
            setUserData(
                {
                    id : utils.UID,
                    mail : utils.UMAIL,
                    phone : utils.UPHONE,
                    name : utils.UNAME,
                    sex : utils.USEX*1,
                    descript : utils.UDESC,
                    birthdate: bd,
                    address: utils.UADDRESS,
                    specialtyID : utils.USPEC
                }
            );
            if(utils.UROLE === "DOCTOR"){
                get_all_specialty();
            }
        }else{
            utils.ClearLocal();
            nav("/auth/login")
        }
    }, []);

    function get_all_specialty(){
        $.ajax({
            url    : utils.URL_BE_BASE + "specialty/all" ,
            crossDomain: true,
            type   : "GET",
            timeout: 10000,
            data:{
                search: ""
            },
            success: (d)=>{
                setSpecialties(d.data)
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function update(){
        userData.birthdate = new Date(userData.birthdate).toISOString();
        $.ajax({
            url    : utils.URL_BE_BASE + "account/change" ,
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "PUT",
            data   : {
                ...userData
            },
            timeout: 10000,
            success: (d)=>{
                alert(d.message);
                utils.Save_uD(d);
                var bd = null;
                if(utils.UBIRTH){
                    var birth = new Date(utils.UBIRTH);
                    bd = `${birth.getUTCFullYear()}-${String(birth.getUTCMonth()+1).padStart(2,'0')}-${String(birth.getUTCDate()).padStart(2,'0')}`;
                }
                setUserData(
                    {
                        id : utils.UID,
                        mail : utils.UMAIL,
                        phone : utils.UPHONE,
                        name : utils.UNAME,
                        sex : utils.USEX*1,
                        descript : utils.UDESC,
                        birthdate: bd,
                        address: utils.UADDRESS,
                        specialtyID : utils.USPEC
                    }
                );
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    return(
        <>
            <Helmet><title>SMARTCARE | Account</title></Helmet>
            <div className="px-5 py-5 w-full">
                <h1 className="text-[black] font-semibold text-2xl pb-5 ">Update information</h1>
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                    <h1 className="text-[black] text-lg pb-3"><i>Information</i></h1>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText value={userData.name}  onChange={(e)=>change(e)} inputName="name" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label={`Username (${userData.name ? userData.name.length : 0}/50)`} />
                        <InputText value={userData.phone} disabled={true} InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Phone number (Not Change)" />
                        <InputText value={userData.mail} disabled={true}  InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Email (Not Change)" />
                    </div>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-stretch gap-5 pb-5 ">
                        <InputDate onChange={(e)=>change(e)} value={userData.birthdate} inputName="birthdate" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] h-full text-lg" LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="From" />
                        <InputSelect value={userData.sex*1} onChange={(e)=>{change(e)}} inputName="sex" InputclassName="h-full py-5 text-lg bg-[#e9e9e9] px-3 py-5 text-[black] border-none focus:border-[#00000082]"  
                            options={[
                                {
                                    name: "Choose gender",
                                    id:""
                                },
                                {
                                    name: "Male",
                                    id:1
                                },
                                {
                                    name: "Female",
                                    id:2
                                }
                            ]}
                        />
                        <InputText onChange={(e)=>{change(e)}} value={userData.address} inputName="address" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Address" />
                    </div>
                    {
                        utils.UROLE === "DOCTOR"
                        ?
                        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                            <InputSelect value={userData.specialtyID*1} onChange={(e)=>{change(e)}} inputName="specialtyID" InputclassName="h-full py-5 text-lg bg-[#e9e9e9] px-3 py-5 text-[black] border-none focus:border-[#00000082]"  
                                options={
                                    specicalties.length > 0
                                    ? [
                                        { name: "Specialty", id: "" },
                                        ...specicalties.map(d => ({
                                            name: d.name,
                                            id: d.id
                                        }))
                                    ]
                                    : [
                                        { name: "Specialty", id: "" }
                                    ]
                                }
                            />
                        </div>
                        :
                        null
                    }
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5">
                        <InputTextArea value={userData.descript} onChange={(e)=>change(e)} inputName="descript" InputclassName="bg-[#e9e9e9]  px-3 py-5 text-[#2C1E14] border-none focus:border-[#00000082] h-80" LabelclassName="text-[#00000098] text-[12px] peer-placeholder-shown:text-[#00000072]" label={`Description (${userData.descript ? userData.descript.length : 0}/̀500)`}/> 
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5 pt-5 px-4 w-full">
                    <Button
                        className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                        childs="Save"
                        click={()=>update()}
                    />
                    <Button
                        className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                        childs="Back"
                        click={()=>{nav("/")}}
                    />
                </div>

            </div>
        </>
        
    );
}

export default Account;
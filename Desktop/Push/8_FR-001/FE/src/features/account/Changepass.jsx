/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import InputText from "../../components/InputText";
import Button from "../../components/Button";
import utils from "../../utils/utils";
import $ from "jquery"
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

function ChangePass(){

    const nav = useNavigate();

    const [pass, setPass] = useState({
        oldPass: null,
        newPass: null
    });

    const isLogin = function(){
        if(!utils.UID){
            utils.ClearLocal();
            nav("/auth/login")
        }
    }

    const change = function(e){
        setPass({
            ...pass,
            [e.target.name]: e.target.value
        });
    }

    useEffect(()=>{
        isLogin();
    }, []);

    function update(){
        var check = false;
        
        if(check){
            return;
        }
        $.ajax({
            url    : utils.URL_BE_BASE + "account/changepass",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "PUT",
            data   : {
                id: utils.UID,
                ...pass
            },
            timeout: 10000,
            success: (d)=>{
                alert(d.message);
                setPass(
                    {
                        oldPass: "",
                        newPass: "",
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
            <Helmet><title>SMARTCARE | Change password</title></Helmet>
            <div className="px-5 py-5 w-full">
                <h1 className="text-[black] font-semibold text-2xl pb-5 ">Change password</h1>
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                    <h1 className="text-[black] text-lg pb-3"><i>Information</i></h1>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText value={pass.oldPass}  onChange={(e)=>change(e)} inputName="oldPass" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label={`Your password`} />
                        <InputText value={pass.newPass}  onChange={(e)=>change(e)} inputName="newPass" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="New password" />
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

export default ChangePass;
import { Helmet } from "react-helmet";
import utils from "../../utils/utils";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import $ from "jquery"
import Button from "../../components/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import InputText from "../../components/InputText";

export default function Specialty_manager(){

    const nav = useNavigate();
    const specFormRef = useRef();

    const [specialties, setSpecialties] = useState([]);
    const [specialty, setSpecialty] = useState({
        id: null,
        name: null
    })

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

    function change(e){
        setSpecialty({
            ...specialty,
            [e.target.name] : e.target.value ? e.target.value : null
        });
    }

    // check login funciton
    const isLogin = function(){
        if(!utils.UID){
            utils.ClearLocal();
            nav("/auth/login");
        }else{
            if(utils.UROLE !== "ADMIN"){
                alert("You don't have any permission on this page!");
                nav("/")
            }
            get_all_specialty();
        }
    }

    function cancel_update(){
        setSpecialty({
            id: null,
            name: "",
        })
    }

    function create(){

        if(!specialty.name){
            alert("Please fill specialty's name input!");
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "specialty",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "POST",
            data   : {
                ...specialty
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                cancel_update();
                get_all_specialty();
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function get_spec(specID){
        $.ajax({
            url    : utils.URL_BE_BASE + "specialty" ,
            crossDomain: true,
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            type   : "GET",
            timeout: 10000,
            data:{
                id: specID
            },
            success: (d)=>{
                setSpecialty(d.data)
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function delete_spec(specID){
        
        if(!specID){
            alert("Please choose one specialty to update!");
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "specialty" ,
            crossDomain: true,
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            type   : "DELETE",
            timeout: 10000,
            data:{
                id: specID
            },
            success: (d)=>{
                alert(d.message);
                get_all_specialty();
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function update(){

        if(!specialty.id){
            alert("Please choose one specialty to update!");
            return;
        }

        if(!specialty.name){
            alert("Please fill specialty's name input!");
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "specialty",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "PUT",
            data   : {
                ...specialty
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                cancel_update();
                get_all_specialty();
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    useEffect(()=>{
        isLogin();
    }, [])

    return(
        <>
            <Helmet><title>SMARTCARE | Specialty manager</title></Helmet>
            <div className="p-5 flex flex-col items-center justify-center gap-5 w-full">
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                    <table className="border-collapse w-full">
                        <thead className="text-[12px] text-[#000000]">
                            <th className="p-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">#</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Name</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Doctor quantity</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Created Date</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Update Date</th>
                            <th className="py-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Action</th>
                        </thead>
                        <tbody >
                            {
                                specialties.map(d => {
                                    return <tr className="border-2 text-nowrap" key={d.id}>
                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.id}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.name}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.doctor.length}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{new Date(d.date01).toLocaleString()}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.date02 ? new Date(d.date02).toLocaleString() : "Haven't updated yet!"}</td>
                                        <td className="p-2 text-center font-bold text-[#000000] text-[11px] overflow-scroll">
                                            <div className="flex justify-center items-center w-full gap-1">
                                                <Button
                                                    disabled={d.status === 3 ? true : false}
                                                    className="bg-[#464646] p-1 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                    childs={
                                                        <MdEdit/>
                                                    }
                                                    click={()=>get_spec(d.id)}
                                                />
                                                <Button
                                                    disabled={d.status === 3 ? true : false}
                                                    className="bg-[red] p-1 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                    childs={
                                                        <MdDelete/>
                                                    }
                                                    click={()=>delete_spec(d.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full" ref={specFormRef}>
                    <h1 className="text-[#000000] text-lg pb-3"><i>Specialty information</i></h1>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText onChange={(e)=>{change(e)}} value={specialty.name} inputName="name" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Name" />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 w-full">
                    {
                        specialty.id 
                        ?
                        <>
                            <Button
                                className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                childs={"Update"}
                                click={()=>{update()}}
                            />
                            <Button
                                className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                childs={"Cancel"}
                                click={()=>{cancel_update()}}
                            />
                        </>
                        :
                        <Button
                            className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                            childs={"Create"}
                            click={()=>create()}
                        />
                    }
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
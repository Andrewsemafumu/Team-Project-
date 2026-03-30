import { Helmet } from "react-helmet";
import utils from "../../utils/utils";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import $ from "jquery"
import Button from "../../components/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import InputText from "../../components/InputText";
import InputSelect from "../../components/InputSelect";
import InputDate from "../../components/InputDate";

export default function User_manager(){

    const nav = useNavigate();
    const userFormRef = useRef();

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        id: null,
        name: null,
        pass: null,
        phone: null,
        mail: null,
        role: null,
        specialtyID: null,
        address: null,
        sex: null,
        birthdate: null,
    })

    const [specicalties, setSpecialties] = useState([])
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
        if(e.target.name === "role"){
            setUser({
                ...user,
                [e.target.name] : e.target.value ? e.target.value*1 : null
            });
        }
        setUser({
            ...user,
            [e.target.name] : e.target.value ? e.target.value : null
        });
    }

    // check login funciton
    const isLogin = function(){
        if(!utils.UID){
            utils.ClearLocal();
            nav("/auth/login");
        }else{
            if(utils.UROLE !== "ADMIN" && utils.UROLE !== "RECEPTION"){
                alert("You don't have any permission on this page!")
                nav("/")
            }
            get_all_user();
            get_all_specialty();
        }
    }

    function get_all_user(){
        $.ajax({
            url    : utils.URL_BE_BASE + "user/all",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            data   : {
                search: "" 
            },
            timeout: 10000,
            success: async (d)=>{
                console.table(d.data);
                setUsers(d.data);
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function get_user(userID){
        $.ajax({
            url    : utils.URL_BE_BASE + "user",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            data   : {
                id: userID
            },
            timeout: 10000,
            success: async (d)=>{
                userFormRef.current.scrollIntoView();
                if(d.data.birthdate){
                    const birth = new Date(d.data.birthdate);
                    d.data.birthdate = `${birth.getUTCFullYear()}-${String(birth.getUTCMonth()+1).padStart(2,'0')}-${String(birth.getUTCDate()).padStart(2,'0')}`;
                }
                setUser(d.data);
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function delete_user(userID){
        $.ajax({
            url    : utils.URL_BE_BASE + "user",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "DELETE",
            data   : {
                id: userID
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                get_all_user();
                cancel_update();
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function cancel_update(){
        setUser({
            id: null,
            name: "",
            pass: "",
            phone: "",
            mail: "",
            role: null,
            specialtyID: null,
            address: "",
            sex: null,
            birthdate: null,
        })
    }

    function create(){

        if(!user.name){
            alert("Please fill user's name input!");
            return;
        }

        if(!user.mail){
            alert("Please fill user's mail input!");
            return;
        }

        if(!user.phone){
            alert("Please fill user's phone input!");
            return;
        }

        if(!user.pass){
            alert("Please fill user's pass input!");
            return;
        }

        if(!user.role){
            alert("Please select user's role!");
            return;
        }

        if(user.birthdate){
            user.birthdate = new Date(user.birthdate).toISOString();
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "user",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "POST",
            data   : {
                ...user
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                cancel_update();
                get_all_user();
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function update(){

        if(!user.id){
            alert("Please choose one user to update!");
            return;
        }

        if(!user.name){
            alert("Please fill user's name input!");
            return;
        }

        if(!user.mail){
            alert("Please fill user's mail input!");
            return;
        }

        if(!user.phone){
            alert("Please fill user's phone input!");
            return;
        }

        if(!user.role){
            alert("Please select user's role!");
            return;
        }

        if(user.birthdate){
            user.birthdate = new Date(user.birthdate).toISOString();
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "user",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "PUT",
            data   : {
                ...user
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                cancel_update();
                get_all_user();
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
            <Helmet><title>SMARTCARE | User manager</title></Helmet>
            <div className="p-5 flex flex-col items-center justify-center gap-5 w-full">
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                    <table className="border-collapse w-full">
                        <thead className="text-[12px] text-[#000000]">
                            <th className="p-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">#</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Name</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Sex</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Birthdate</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Address</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Phone</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Mail</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Role</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Created Date</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Update Date</th>
                            <th className="py-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Action</th>
                        </thead>
                        <tbody >
                            {
                                users.map(d => {
                                    return <tr className="border-2 text-nowrap" key={d.id}>
                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.id}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{`${d.name} ${d.specialty ? `(${d.specialty.name})` : ""}`}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.sex ? d.sex === 1 ? "Male" :d.sex === 2 ? "Female": "Undefined"  : "Not set"}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.birthdate ? new Date(d.birthdate).toLocaleDateString() : "No Birthdate"}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.address}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.phone}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.mail}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{utils.RoleMap(d.role)}</td>
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
                                                    click={()=>get_user(d.id)}
                                                />
                                                <Button
                                                    disabled={d.status === 3 ? true : false}
                                                    className="bg-[red] p-1 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                    childs={
                                                        <MdDelete/>
                                                    }
                                                    click={()=>delete_user(d.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full" ref={userFormRef}>
                    <h1 className="text-[#000000] text-lg pb-3"><i>User information</i></h1>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText onChange={(e)=>{change(e)}} value={user.name} inputName="name" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Name" />
                    </div>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText onChange={(e)=>{change(e)}} value={user.mail} inputName="mail" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Mail" />
                    </div>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText onChange={(e)=>{change(e)}} value={user.phone} inputName="phone" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Phone number" />
                    </div>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-stretch gap-5 pb-5 ">
                        <InputDate onChange={(e)=>change(e)} value={user.birthdate} inputName="birthdate" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] h-full text-lg" LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="From" />
                        <InputSelect value={user.sex*1} onChange={(e)=>{change(e)}} inputName="sex" InputclassName="h-full py-5 text-lg bg-[#e9e9e9] px-3 py-5 text-[black] border-none focus:border-[#00000082]"  
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
                        <InputText onChange={(e)=>{change(e)}} value={user.address} inputName="address" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Address" />
                    </div>
                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                        <InputText onChange={(e)=>{change(e)}} value={user.pass} inputName="pass" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Password" />
                    </div>
                    <div className="flex justify-center items-stretch gap-5 w-full pb-5">
                        <InputSelect value={user.role ? user.role : null} onChange={(e)=>{change(e)}} inputName="role" InputclassName="h-full py-5 text-lg bg-[#e9e9e9] px-3 py-5 text-[black] border-none focus:border-[#00000082]" 
                            options={
                                utils.UROLE === "ADMIN"
                                ?
                                    [
                                        {
                                            id: "",
                                            name: "Choose role",
                                        },
                                        {
                                            id: 1,
                                            name: "Receptionist",
                                        },
                                        {
                                            id: 2,
                                            name: "Doctor",
                                        },
                                        {
                                            id: 3,
                                            name: "Patient",
                                        }
                                    ]
                                :
                                utils.UROLE === "RECEPTION"
                                ?
                                [
                                    {
                                        id: "",
                                        value: "Choose role",
                                    },
                                    {
                                        id: 3,
                                        value: "Patient",
                                    }
                                ]
                                :
                                null
                            }
                        />
                    </div>
                    
                    {
                        user.role === 2 || user.role === "2" 
                        ?
                        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                            <InputSelect value={user.specialtyID*1} onChange={(e)=>{change(e)}} inputName="specialtyID" InputclassName="h-full py-5 text-lg bg-[#e9e9e9] px-3 py-5 text-[black] border-none focus:border-[#00000082]"  
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
                </div>

                <div className="flex items-center justify-end gap-3 w-full">
                    {
                        user.id 
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
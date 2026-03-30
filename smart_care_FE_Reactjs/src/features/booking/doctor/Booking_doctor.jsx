import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { Helmet } from "react-helmet";
import utils from "../../../utils/utils";
import { MdDelete, MdOutlineDone } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { TbProgressCheck } from "react-icons/tb";
import { LuNotebookPen } from "react-icons/lu";
import { FaNotesMedical } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import $ from "jquery";
import InputTextArea from "../../../components/InputTextArea";
import InputText from "../../../components/InputText";

export default function Booking_client(){

    const diagnoseRef = useRef(null)
    const noteRef = useRef(null)

    useEffect(()=>{
        isLogin();
    }, [])

    const nav = useNavigate();

    const [allDiagnose, setAllDiagnose] = useState([]);
    const [patientID, setPatientID] = useState(null);

    const [bookingIDForNote, setBookingIDForNote] = useState(null);

    const [notes, setNotes] = useState([])
    const [note, setNote] = useState({
        id: null,
        title: null,
        descript: null
    })

    const [diagnose, setDiagnose] = useState({
        id: null,
        title: null,
        descript: null,
        bookingID: null
    })

    const changeDiagnose = function(e){
        setDiagnose({
            ...diagnose,
            [e.target.name] : e.target.value
        });
    }

    const changeNote = function(e){
        setNote({
            ...note,
            [e.target.name] : e.target.value
        });
    }
    
    // check login funciton
    const isLogin = function(){
        if(!utils.UID){
            utils.ClearLocal();
            nav("/auth/login");
        }else{
            if(utils.UROLE !== "DOCTOR" && utils.UROLE !== "ADMIN"){
                alert("You don't have any permission on this page!")
                nav("/")
            }
            getall_booking();
        }
    }

    // booking list
    const [bookings, setBookingList] = useState([])

    function getall_booking(){
        $.ajax({
            url    : utils.URL_BE_BASE + "booking/doctor/all" ,
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            data: {
                id : utils.UID
            },
            crossDomain: true,
            type   : "GET",
            timeout: 10000,
            success: (d)=>{
                console.table(d.data)
                setBookingList(d.data)
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function update_appointment_status(id){
        $.ajax({
            url    : utils.URL_BE_BASE + "booking/status",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "PUT",
            data   : {
                id : utils.UID,
                bookingID: id  
            },
            timeout: 10000,
            success: async (d)=>{
                await getall_booking();
                alert(d.message);
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    async function delete_booking(id){
        if(confirm("Are you sure you want to delete this booking?")){
            $.ajax({
                url    : utils.URL_BE_BASE + "booking" ,
                headers: {
                    tokenizer: localStorage.getItem("%UT%")
                },
                crossDomain: true,
                type   : "DELETE",
                data:{
                    id: utils.UID,
                    bookingID: id
                },
                timeout: 10000,
                success: (d)=>{
                    alert(d.message)
                    getall_booking()
                },
                error  : (e)=>{
                    console.log(e);
                    alert(e.responseJSON?.message)
                },
            })
        }
    }

    function getDiagnose(bookID, patID){
        $.ajax({
            url    : utils.URL_BE_BASE + "diagnose",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            data   : {
                id : utils.UID,
                bookingID: bookID  
            },
            timeout: 10000,
            success: async (d)=>{
                setPatientID(patID)
                getDiagnose_history(patID);
                cancelCurrentBookingNote();
                cancelCurrentUpdateNote();
                if(d.data.recordID){
                    alert("Booking already have record diagnose");
                    setDiagnose({
                        id: d.data.recordID,
                        title: d.data.record.title,
                        descript: d.data.record.descript,
                        bookingID:  d.data.record.bookingID
                    })
                }else{
                    alert("Booking doesn't have record diagnose");
                    setDiagnose({
                        id: null,
                        title: null,
                        descript: null,
                        bookingID: d.data.id
                    })
                }

                if(diagnoseRef.current){
                    diagnoseRef.current.scrollIntoView()
                }
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function getDiagnose_history(patID){
        $.ajax({
            url    : utils.URL_BE_BASE + "diagnose/history",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            data   : {
                id : patID,
            },
            timeout: 10000,
            success: async (d)=>{
                setAllDiagnose(d.data);
                if(diagnoseRef.current){
                    diagnoseRef.current.scrollIntoView()
                }
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function createDiagnose(){
        if(!diagnose.bookingID){
            alert("Please choose one booking to add diagnose!");
            return;
        }

        if(!diagnose.title){
            alert("Please fill title diagnose!");
            return;
        }

        if(!diagnose.descript){
            alert("Please fill descript diagnose!");
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "diagnose",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "POST",
            data   : {
                userID : utils.UID,
                bookingID: diagnose.bookingID,
                title: diagnose.title,
                descript: diagnose.descript,
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                getDiagnose_history(patientID);
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function updateDiagnose(){
        if(!diagnose.id){
            alert("This booking doesn't have diagnose to update!");
            return;
        }

        if(!diagnose.bookingID){
            alert("Please choose one booking to add diagnose!");
            return;
        }

        if(!diagnose.title){
            alert("Please fill title diagnose!");
            return;
        }

        if(!diagnose.descript){
            alert("Please fill descript diagnose!");
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "diagnose",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "PUT",
            data   : {
                userID : utils.UID,
                id: diagnose.id,
                bookingID: diagnose.bookingID,
                title: diagnose.title,
                descript: diagnose.descript,
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                getDiagnose_history(patientID);
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function cancelDiagnose(){
        setDiagnose({
            id: null,
            title: null,
            descript: null,
            bookingID: null
        })
    }

    function cancelCurrentUpdateNote(){
        setNote({
            id: null,
            title: "",
            descript: "",
        })
    }

    function cancelCurrentBookingNote(){
        setBookingIDForNote(null)
        setNote({
            id: null,
            title: "",
            descript: "",
        })
    }

    function get_all_note(bookID){
        setBookingIDForNote(bookID);
        cancelDiagnose();

        $.ajax({
            url    : utils.URL_BE_BASE + "note/all",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            data   : {
                id : utils.UID,
                bookingID: bookID  
            },
            timeout: 10000,
            success: async (d)=>{
                setNotes(d.data.note)
                if(noteRef.current){
                    noteRef.current.scrollIntoView()
                }
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
        
    }

    function get_note(noteID){
        $.ajax({
            url    : utils.URL_BE_BASE + "note",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "GET",
            data   : {
                userID : utils.UID,
                bookingID : bookingIDForNote,
                id: noteID
            },
            timeout: 10000,
            success: async (d)=>{
                setNote({
                    title: d.data.title,
                    descript: d.data.descript,
                    id: d.data.id
                })
                if(noteRef.current){
                    noteRef.current.scrollIntoView()
                }
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function add_note(){
        if(!bookingIDForNote){
            alert("Please choose one booking to add note!");
            return;
        }

        if(!note.title){
            alert("Please fill note's title!");
            return;
        }

        if(!note.descript){
            alert("Please fill note's descript!");
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "note",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "POST",
            data   : {
                userID : utils.UID,
                bookingID: bookingIDForNote,
                title: note.title,
                descript: note.descript,
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                setNote({
                    id: null,
                    title: null,
                    descript: null,
                })
                get_all_note(bookingIDForNote);
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function update_note(){

        if(!note.id){
            alert("Please choose one note to update!");
            return;
        }

        if(!bookingIDForNote){
            alert("Please choose one booking to update note!");
            return;
        }

        if(!note.title){
            alert("Please fill note's title!");
            return;
        }

        if(!note.descript){
            alert("Please fill note's descript!");
            return;
        }

        $.ajax({
            url    : utils.URL_BE_BASE + "note",
            headers: {
                tokenizer: localStorage.getItem("%UT%")
            },
            crossDomain: true,
            type   : "PUT",
            data   : {
                id: note.id,
                userID : utils.UID,
                bookingID: bookingIDForNote,
                title: note.title,
                descript: note.descript,
            },
            timeout: 10000,
            success: async (d)=>{
                alert(d.message);
                setNote({
                    id: null,
                    title: null,
                    descript: null,
                })
                get_all_note(bookingIDForNote);
            },
            error  : (e)=>{
                console.log(e);
                alert(e.responseJSON?.message)
            },
        })
    }

    function delete_note(noteID){
        if(confirm("Are you sure you want to delete this note?")){
            $.ajax({
                url    : utils.URL_BE_BASE + "note",
                headers: {
                    tokenizer: localStorage.getItem("%UT%")
                },
                crossDomain: true,
                type   : "DELETE",
                data   : {
                    id: noteID,
                    userID : utils.UID,
                    bookingID: bookingIDForNote,
                },
                timeout: 10000,
                success: async (d)=>{
                    alert(d.message);
                    setNote({
                        id: null,
                        title: null,
                        descript: null,
                    })
                    get_all_note(bookingIDForNote);
                },
                error  : (e)=>{
                    console.log(e);
                    alert(e.responseJSON?.message)
                },
            })
        }
    }

    return(
        <>
            <Helmet><title>SMARTCARE | Booking Management</title></Helmet>
            <div className="p-5 flex flex-col items-center justify-center gap-5 w-full">
                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                    <table className="border-collapse overflow-scroll w-full">
                        <thead className="text-[12px] text-[#000000]">
                            <th className="p-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">#</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Title</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Descript</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Patient Info</th>
                            <th className="p-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Diagnostic</th>
                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Date</th>
                            <th className="py-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Status</th>
                            <th className="py-2 px-5 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Action</th>
                        </thead>
                        <tbody >
                            {
                                bookings.map(d => {
                                    return <tr className="border-2 text-nowrap" key={d.id}>
                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.id}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.title}</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.descript}</td>
                                        <td className="font-semibold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{`${d.client.name} - ${d.client.sex ? d.client.sex === 1 ? "Male" : "Female" : "Undefined sex"} - ${d.client.phone} - ${d.client.mail} - ${d.client.address ? d.client.address : "No Address"} - ${d.client.birthdate ? new Date(d.doctor.birthdate).toLocaleDateString() : "No Birthdate"}` }</td>
                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.record ? `${d.record.title} - ${d.record.descript}` : "..." }</td>
                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{new Date(d.bookingDate).toLocaleString()}</td>
                                        <td className="font-semibold text-center p-2 text-[#000000] text-[11px] overflow-scroll text-wrap">
                                            <Button
                                                disabled={d.status === 3 || d.status === 4 ? true : false}
                                                className="bg-[#000000] p-2 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                childs={
                                                    d.status ?
                                                    d.status === 1 ? <TbProgressCheck className="animate-pulse text-lg" title={utils.Booking_status_mapping(d.status)} /> 
                                                    :
                                                    d.status === 2 ? <FiLoader className="text-lg animate-spin" title={utils.Booking_status_mapping(d.status)} />
                                                    :
                                                    d.status === 3 ? <MdOutlineDone className="text-lg" title={utils.Booking_status_mapping(d.status)} /> 
                                                    : null : null
                                                }
                                                click={()=>update_appointment_status(d.id)}
                                            />
                                        </td>
                                        <td className="font-bold text-[#000000] text-[11px] overflow-scroll">
                                            <div className="flex justify-center items-center w-full gap-1 p-3">
                                                <Button
                                                    className="bg-[#000000] p-2 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                    childs={
                                                        <LuNotebookPen className="text-lg"/>
                                                    }
                                                    title="Diagnose"
                                                    click={()=>{getDiagnose(d.id, d.client.id)}}
                                                />
                                                <Button
                                                    className="bg-[#000000] p-2 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                    childs={
                                                        <FaNotesMedical  className="text-lg"/>
                                                    }
                                                    title="Note"
                                                    click={()=>{get_all_note(d.id)}}
                                                />
                                                <Button
                                                    disabled={d.status === 3 ? true : false}
                                                    className="bg-[red] p-2 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                    childs={
                                                        <MdDelete className="text-lg"/>
                                                    }
                                                    title="Delete"
                                                    click={()=>delete_booking(d.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                

                <div ref={noteRef} className="w-full">
                    {
                        bookingIDForNote 
                        ?
                            <div className="p-5 flex flex-col items-center justify-center gap-5 w-full">
                                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                                    <h1 className="text-[black] text-lg pb-3"><i>Notes</i></h1>
                                    <table className="border-collapse overflow-scroll w-full">
                                        <thead className="text-[12px] text-[#000000]">
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Title</th>
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Descript</th>
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Date</th>
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Update Date</th>
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll  bg-[black] text-[#ffffff]">Action</th>
                                        </thead>
                                        <tbody >
                                            {
                                                notes.map(d => {
                                                    return <tr className="border-2 text-nowrap" key={null}>
                                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.title}</td>
                                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.descript}</td>
                                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{new Date(d.date01).toLocaleString()}</td>
                                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.date02 ? new Date(d.date02).toLocaleString() : "Haven't updated yet!"}</td>
                                                        <td className="font-bold text-[#000000] text-[11px] overflow-scroll">
                                                            <div className="flex justify-center items-center w-full gap-1 p-3">
                                                                <Button
                                                                    className="bg-[#000000] p-1 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                                    childs={
                                                                        <MdEdit className="text-md"/>
                                                                    }
                                                                    title="Update note"
                                                                    click={()=>{get_note(d.id)}}
                                                                />
                                                                <Button
                                                                    className="bg-[red] p-1 rounded-full text-[#ffffff] text-[11px] font-semibold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                                                    childs={
                                                                        <MdDelete className="text-md"/>
                                                                    }
                                                                    title="Delete note"
                                                                    click={()=>delete_note(d.id)}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                                    <h1 className="text-[black] text-lg pb-3"><i>Add note for booking</i></h1>
                                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                                        <InputText value={note.title} onChange={(e)=>changeNote(e)} inputName="title" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Note title" />
                                    </div>
                                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5">
                                        <InputTextArea value={note.descript} onChange={(e)=>changeNote(e)} inputName="descript" InputclassName="bg-[#e9e9e9]  px-3 py-5 text-[#2C1E14] border-none focus:border-[#00000082] h-80" LabelclassName="text-[#00000098] text-[12px] peer-placeholder-shown:text-[#00000072]" label={`Note description`}/> 
                                    </div>
                                </div>
                            </div>
                        :
                        null
                    }
                </div>

                {/* layout of diagnose form */}
                <div ref={diagnoseRef} className="w-full">
                    {
                        diagnose.bookingID
                        ?
                            <div className="flex flex-col items-center justify-center gap-5 w-full p-5">
                                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                                    <h1 className="text-[black] text-lg pb-3"><i>Diagnose history</i></h1>
                                    <table className="border-collapse overflow-scroll w-full">
                                        <thead className="text-[12px] text-[#000000]">
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll bg-[black] text-[#ffffff]">Title</th>
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll bg-[black] text-[#ffffff]">Descript</th>
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll bg-[black] text-[#ffffff]">Doctor</th>
                                            <th className="p-2 border-2 border-[#000000] overflow-scroll bg-[black] text-[#ffffff]">Date</th>
                                        </thead>
                                        <tbody >
                                            {
                                                allDiagnose.map(d => {
                                                    return <tr className="border-2 text-nowrap" key={null}>
                                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.record ? d.record.title : "..." }</td>
                                                        <td className="font-bold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{d.record ? d.record.descript : "..."}</td>
                                                        <td className="font-semibold text-left p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{`${d.doctor.name} ${d.doctor.specialty ? `(${d.doctor.specialty.name})` : ""} - ${d.doctor.phone} - ${d.doctor.mail} - ${d.doctor.address ? d.doctor.address : "No Address"} - ${d.doctor.birthdate ? new Date(d.doctor.birthdate).toLocaleDateString() : "No Birthdate"}`}</td>
                                                        <td className="font-bold text-center p-1 text-[#000000] text-[11px] overflow-scroll text-wrap">{new Date(d.bookingDate).toLocaleString()}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bg-[#ffffff] shadow-2xl p-5 rounded-lg w-full">
                                    <h1 className="text-[black] text-lg pb-3"><i>Diagnose current booking</i></h1>
                                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5 pb-5">
                                        <InputText value={diagnose.title} onChange={(e)=>changeDiagnose(e)} inputName="title" InputclassName="bg-[#e0e0e0] text-[black] border-none focus:border-[#00000082] " LabelclassName="text-[black] peer-placeholder-shown:text-[black]" label="Diagnose title" />
                                    </div>
                                    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-start gap-5">
                                        <InputTextArea value={diagnose.descript} onChange={(e)=>changeDiagnose(e)} inputName="descript" InputclassName="bg-[#e9e9e9]  px-3 py-5 text-[#2C1E14] border-none focus:border-[#00000082] h-80" LabelclassName="text-[#00000098] text-[12px] peer-placeholder-shown:text-[#00000072]" label={`Diagnose description`}/> 
                                    </div>
                                </div>
                            </div>
                        :
                        null
                    }
                </div>

                <div className="flex items-center justify-end gap-3 w-full" >
                    {
                        diagnose.bookingID 
                        ?
                            diagnose.id !== null
                            ?
                            <>
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Update"
                                    click={()=>{updateDiagnose()}}
                                />
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Cancel"
                                    click={()=>{cancelDiagnose()}}
                                />
                            </>
                            
                            :
                            <>
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Save"
                                    click={()=>{createDiagnose()}}
                                />
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Cancel"
                                    click={()=>{cancelDiagnose()}}
                                />
                            </>
                        :
                        null
                    }
                    {
                        bookingIDForNote 
                        ?
                            note.id !== null
                            ?
                            <>
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Update"
                                    click={()=>{update_note()}}
                                />
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Cancel update note"
                                    click={()=>{cancelCurrentUpdateNote()}}
                                />
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Cancel current booking"
                                    click={()=>{cancelCurrentBookingNote()}}
                                />
                            </>
                            :
                            <>
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Add note"
                                    click={()=>{add_note()}}
                                />
                                <Button
                                    className="w-full h-12 bg-[black] text-[#ffffff] rounded-lg text-lg font-bold hover:bg-[#ffffff] hover:text-black hover:text-shadow-2xs transition-all duration-300"
                                    childs="Cancel current booking"
                                    click={()=>{cancelCurrentBookingNote()}}
                                />
                            </>
                        :
                        null
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
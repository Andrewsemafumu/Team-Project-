/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { FaFileArrowUp } from "react-icons/fa6";
import Button from "./Button";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import utils from "../utils/utils";

function FileUpload({title, desc, isMuti = false, max, id, setFiles, value = null}){

    const [preImgs, setpreImgs] = useState([]);

    // const [count, setCount] = useState(0);

    const preview = useRef();
    const fileRef = useRef();
    const upload = useRef();
    const btn = useRef();
    const loading = useRef();
    const progres = useRef();

    useEffect(()=>{
        if(value){
            setpreImgs(value ? value.map(d=>d.new ? d.isimg ? d.data : d.view : `${utils.URL_BE_BASE_IMG}${d}`) : []);
        }
    }, [value]);

    useEffect(()=>{
        if(preImgs.length > 0){
            upload.current.classList.remove("flex");
            upload.current.classList.add("hidden");

            btn.current.classList.remove("hidden");
            btn.current.classList.add("flex");
            
            preview.current.classList.remove("hidden");
            preview.current.classList.add("flex");
        }else{
            upload.current.classList.add("flex");
            upload.current.classList.remove("hidden");
            
            btn.current.classList.remove("flex");
            btn.current.classList.add("hidden");

            preview.current.classList.add("hidden");
            preview.current.classList.remove("flex");
        }
    }, [preImgs
        // , count
    ]);

    const Change = async function(e){
        // setCount(count+1);
        if(e.target.files.length > 0){
            if(isMuti){
                if(preImgs.length > 0 && (preImgs.length + e.target.files.length) > max){
                    alert(`Bạn chỉ được tải lên tối đa ${max} file!`);
                    return
                }
                if(preImgs.length === max){
                    alert(`Bạn chỉ được tải lên tối đa ${max} file!`);
                    return
                }

                if(e.target.files.length > max){
                    alert(`Bạn chỉ được tải lên tối đa ${max} file!`);
                    return
                }
                loading.current.classList.remove("hidden");
                loading.current.classList.add("flex");
                var count = 0;
                for(var i of e.target.files){
                    const reader = new FileReader();
                    reader.onload = function(f){
                        count+=1;
                        var pro = `${Math.round(count*100/e.target.files.length)}%`;
                        progres.current.style.width = pro;
                        progres.current.innerText = pro;
                    }

                    const isImage = i.type.startsWith("image/");
                    const d = await utils.convertToBase64(i);
                    if (isImage) {
                        if (setFiles) {
                        setFiles([{ new: true, isimg: isImage, data: d}]);
                        }
                    } else {
                        let icon = "/file.png";

                        if (i.type.includes("pdf")) icon = "/pdf.png";
                        if (i.type.includes("zip") || i.type.includes("rar")) icon = "/zip.png";
                        if (i.type.includes("word") || i.name.endsWith(".doc") || i.name.endsWith(".docx")) icon = "/doc.png";
                        if (i.name.endsWith(".eml")) icon = "/eml.png";
                        
                        if (setFiles) {
                        setFiles([{ new: true, isimg: isImage, view: icon, data: d}]);
                        }
                    }
                }
                setTimeout(()=>{
                    loading.current.classList.remove("flex");
                    loading.current.classList.add("hidden");
                    progres.current.innerText = "0%";
                    progres.current.style.width = "0%"
                }, 300)
            }else{
                loading.current.classList.remove("hidden");
                loading.current.classList.add("flex");

                const file = e.target.files[0];
                
                const isImage = file.type.startsWith("image/");
                const d = await utils.convertToBase64(file);
                if (isImage) {
                    if (setFiles) {
                    setFiles([{ new: true, isimg: isImage, data: d}]);
                    }
                } else {
                    let icon = "/file.png";

                    if (file.type.includes("pdf")) icon = "/pdf.png";
                    if (file.type.includes("zip") || file.type.includes("rar")) icon = "/zip.png";
                    if (file.type.includes("word") || file.name.endsWith(".doc") || file.name.endsWith(".docx")) icon = "/doc.png";
                    if (file.name.endsWith(".eml")) icon = "/eml.png";
                    
                    if (setFiles) {
                    setFiles([{ new: true, isimg: isImage, view: icon, data: d}]);
                    }
                }

                progres.current.style.width = "100%"
                loading.current.classList.remove("flex");
                loading.current.classList.add("hidden");
                progres.current.style.width = "0%"
            }
            const dt = new DataTransfer();
            e.target.files = dt.files
            fileRef.current.files = dt.files
        }
    }

    const DeleteAll = function(){
        // setCount(count+1);
        setpreImgs([]);
        setFiles([]);
        const dt = new DataTransfer();
        fileRef.current.files = dt.files;
    }

    const Delete = function(key){
        // setCount(count+1);
        setpreImgs(prev => prev.filter((_, i) => i !== key));
        setFiles(prev => prev.filter((_, i) => i !== key));
    }


    return(
        <div className="mx-auto rounded-lg w-full">
            <div className="md:flex">
                <div className="w-full p-1">
                    <div className="group relative p-5 rounded-lg border-3 border-[#F5F7FA] bg-[black] flex flex-col gap-5 justify-center items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out" >
                        <div className="flex flex-col items-center w-full" ref={upload}>
                            <FaFileArrowUp className="pb-5 text-[80px] text-[#F5F7FA]" />
                            <span className="block text-[#F5F7FA]  font-semibold">{title}</span>
                            <span className="block text-[#f5f7fa9f] font-normal mt-1">{desc}</span>
                        </div>
                        <div className="justify-center items-center flex-wrap gap-3 w-full hidden z-50" ref={preview}>
                            {
                                preImgs.length > 0 
                                ?
                                    preImgs.map((d, i)=>{
                                        return(
                                            <div key={i} className="transform transition hover:scale-105 ease-in-out">
                                                <img src={d} className="aspect-square w-20 sm:w-20 md:w-25 lg:w-30 xl:w-35 bg-transparent object-cover rounded-sm" key={i}/>
                                                <div className="h-3"></div>
                                                <Button
                                                    click={()=>{Delete(i)}}
                                                    className="bg-[#2C1E14] w-full text-sm sm:text-sm md:text-sm lg:text-lg xl:text-lg text-[white] rounded-md px-1 hover:shadow-2xl transition ease-in-out"
                                                    childs="Xóa"
                                                />
                                            </div>
                                        )
                                    })
                                :
                                <></>
                            }
                        </div>

                        <div className="relative justify-start items-center w-full h-3 text-center text-[white] text-[7px] bg-[#2C1E14] hidden rounded-2xl" ref={loading}>
                            <div className="animate-pulse absolute bg_base h- rounded-2xl transition ease-in-out" ref={progres}></div>
                        </div>
                       
                        <div className="justify-center gap-3 items-center hidden" ref={btn}>
                            <label htmlFor={id}  className="cursor-pointer aspect-square rounded-lg text-[white] p-3 border-2 border-transparent hover:border-[white] hover:scale-105 z-100 transition ease-in-out">
                                <MdOutlineFileUpload className="text-2xl"/>
                            </label>
                            <button onClick={()=>DeleteAll()} className="cursor-pointer aspect-square rounded-lg text-[white] p-3 border-2 z-100 border-transparent hover:border-[white] hover:scale-105 transition ease-in-out">
                                <MdDeleteForever className="text-2xl"/>
                            </button>
                        </div>
                        <input
                            multiple={isMuti}
                            name=""
                            id={id}
                            onChange={(e)=>Change(e)}
                            ref={fileRef}
                            className="h-full w-full absolute opacity-0 cursor-pointer z-10"
                            type="file"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
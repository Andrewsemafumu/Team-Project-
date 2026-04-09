/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight  } from "react-icons/md";

export default function Pagination({total, now, state}){

    const [displayPage, setDisplayPage] = useState([]);

    const getPageDisplay = function(){
        if(total > 3){
            if(now === total){
                setDisplayPage([1, "...",  now-2, now-1 ,now])
            }else if(now === 1){
                setDisplayPage([now, now+1 ,now+2, "...", total]);
            }else{
                if(now === 2){
                    setDisplayPage([now-1 ,now,now+1, "...", total]);
                }else if(now === total - 1){
                        setDisplayPage([1, "...", now-1 ,now,now+1]);
                }else{
                    setDisplayPage([1, "...", now-1, now ,now+1, "...", total]);
                }
            }
        }else{
            var p = []
            for(var i = 0 ; i < total; i++){
                p.push(i+1);
            }
            setDisplayPage(p)
        }
    }

    const change_page = function(p){
        if(p === "..."){
            const pChoose = prompt("Nhập trang muốn đến: ");
            if(pChoose <= total){
                state.setState(pChoose*1);
            }else{
                alert("Trang không tồn tại!");
            }
        }else{
            state.setState(p*1);
        }
    }

    useEffect(()=>{
        getPageDisplay();
    }, [now, total]);

    return(
        <div className={`flex justify-center items-center gap-3 ${total === 0 ? "hidden" : ""}`}>
            <MdOutlineKeyboardArrowLeft className="text-[black]  cursor-pointer text-3xl hover:text-[#2C1E14] hover:bg-[black] transition ease-in-out rounded-full" onClick={()=>{now > 1 ? state.setState(now-1) : null}}/>
            {
                displayPage.length
                ?
                displayPage.map((d, i)=>{
                   return  <p key={i} className={`${now && now === d ? "bg-[black] text-[#2C1E14]" : "text-[black]"} px-3 py-2 rounded-sm hover:text-[#2C1E14] hover:bg-[black] transition ease-in-out cursor-pointer`} onClick={()=>change_page(d)}>{d}</p>
                })
                :
                <></>
            }
            <MdOutlineKeyboardArrowRight className="text-[black] cursor-pointer text-3xl hover:text-[#2C1E14] hover:bg-[black] transition ease-in-out rounded-full" onClick={()=>{now < total ? state.setState(now+1) : null}}/>
        </div>
    )
}

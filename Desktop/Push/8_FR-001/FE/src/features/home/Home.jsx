import { useNavigate } from "react-router";
import utils from "../../utils/utils";
import Button from "../../components/Button";
import { Helmet } from "react-helmet";

function Home(){
        
        const nav = useNavigate();

        return(
            <>
            <Helmet><title>SMARTCARE | Home</title></Helmet>
            <div className="flex justify-evenly items-center bg-[white]">
                <div className="p-10">
                    <h1 className=" capitalize text-[#000000] text-5xl w-150 pb-5">Welcome to smart care</h1>
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-wrap text-md w-110 text-[#2C1E14]">Smartcare, where you can trust to protect your health.</p>
                        <p className="text-wrap text-sm w-110 text-[#2C1E14] pb-2">
                        {
                            utils.UID
                            ?
                            `Welcome ${utils.UNAME} (${utils.UROLE})`
                            :
                            ""
                        }
                        </p>
                        <div className="flex items-center justify-start gap-3 pt-5 flex-wrap">
                            
                            {
                                utils.UID && utils.UROLE
                                ?
                                    utils.UROLE === "ADMIN" || utils.UROLE === "RECEPTION"
                                    ?
                                        <>

                                            <Button
                                                className="text-nowrap font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Edit Account"
                                                click={()=>{nav("/account")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Change password"
                                                click={()=>{nav("/changepass")}}
                                            />
                                            <Button
                                                className="text-nowrap font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="User manager"
                                                click={()=>{nav("/user")}}
                                            />
                                            <Button
                                                className="text-nowrap font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Specialty manager"
                                                click={()=>{nav("/specialty")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Booking"
                                                click={()=>{nav("/manager/booking")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#ffffff] bg-[#e12727] px-6 py-2  rounded-lg shadow-2xl"
                                                childs="Logout"
                                                click={()=>{utils.ClearLocal(); window.location.reload()}}
                                            />
                                        </>
                                    :
                                    utils.UROLE === "DOCTOR"
                                    ?
                                        <>
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Edit Account"
                                                click={()=>{nav("/account")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Change password"
                                                click={()=>{nav("/changepass")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Booking"
                                                click={()=>{nav("/doctor/booking")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#ffffff] bg-[#e12727] px-6 py-2  rounded-lg shadow-2xl"
                                                childs="Logout"
                                                click={()=>{utils.ClearLocal(); window.location.reload()}}
                                            />
                                        </>
                                    :
                                    utils.UROLE === "CLIENT"
                                    ?
                                        <>
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Edit Account"
                                                click={()=>{nav("/account")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Change password"
                                                click={()=>{nav("/changepass")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2 rounded-lg shadow-2xl"
                                                childs="Booking"
                                                click={()=>{nav("/client/booking")}}
                                            />
                                            <Button
                                                className="font-semibold hover:scale-105 transition ease-in-out text-[#ffffff] bg-[#e12727] px-6 py-2  rounded-lg shadow-2xl"
                                                childs="Logout"
                                                click={()=>{utils.ClearLocal(); window.location.reload()}}
                                            />
                                        </>
                                    :
                                    null
                                :
                                <>
                                    <Button
                                        className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2  rounded-lg shadow-2xl"
                                        childs="Login"
                                        click={()=>{nav("/auth/login")}}
                                    />
                                    <Button
                                        className="font-semibold hover:scale-105 transition ease-in-out text-[#FFFFFF] bg-[#000000] px-6 py-2  rounded-lg shadow-2xl"
                                        childs="Register"
                                        click={()=>{nav("/auth/register")}}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex relative items-center h-screen ">
                    <img
                        src="auth1.png"
                        alt=""
                        className="rounded-xl object-cover w-full h-full transition-opacity ease-in-out duration-1000" 
                    />
            </div>
            </div>
        </>
    );
}

export default Home;
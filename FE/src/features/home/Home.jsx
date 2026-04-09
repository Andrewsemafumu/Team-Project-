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
                                            {/* this is wrapper for admin and reception */}
                                        </>
                                    :
                                    utils.UROLE === "DOCTOR"
                                    ?
                                        <>
                                            {/* this is wrapper for doctor */}
                                        </>
                                    :
                                    utils.UROLE === "CLIENT"
                                    ?
                                        <>
                                            {/* this is wrapper for client */}
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
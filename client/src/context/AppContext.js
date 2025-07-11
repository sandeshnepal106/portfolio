import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext();
axios.defaults.withCredentials = true;
export const AppContextProvider = (props)=>{
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [isLoggedin, setIsLoggedin] = useState(false)
    const checkAuth = async () =>{
        try {
            const res = await axios.post(backendUrl + '/api/admin/auth-check');
            if(res.data.success){
                setIsLoggedin(true);
            }
            else{
                if (res.data.message !== "Not Authorized. Try again") {
                    toast.error(res.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        checkAuth();
    }, []);

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin
    }
    return(
        <AppContext.Provider value= {value}>
            {props.children}
        </AppContext.Provider>
    )
}

import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();
    const {backendUrl, isLoggedin, setIsLoggedin} = useContext(AppContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async(e) =>{
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + '/api/admin/login', {adminName: name, password});
            if (data.success){
                setIsLoggedin(true);
                navigate('/');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = async(e) =>{
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + '/api/admin/logout');
            if (data.success){
                setIsLoggedin(false);
                navigate('/login');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className='h-screen flex justify-center items-center'>
        
        <div className='p-20  border-4 flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-sigmar'>Login</h1>
            <p className='text-xl py-4 '>Login status:{isLoggedin ? '✅ Logged in' : '❌ Not logged in'}</p>
            <form onSubmit={onSubmit} className='flex flex-col gap-5 items-center justify-center'>
                <input onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Admin Name' className='text-purple-800 p-2 outline-blue-600' required/>
                <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' className='text-purple-800 p-2 outline-pu-600' required/>
                <button type='submit' className=' w-1/2 px-3 py-2 bg-[#bb3ea6] rounded-lg '>Log in</button>
            
            </form>
        </div>
      
    </div>
  )
}

export default Login

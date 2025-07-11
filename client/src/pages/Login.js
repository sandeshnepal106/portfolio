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
                navigate('/projects');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div>
        <h1>Login</h1>
        <p>{isLoggedin ? '✅ Logged in' : '❌ Not logged in'}</p>
        <form onSubmit={onSubmit}>
            <input onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Admin Name'  required/>
            <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required/>
            <button type='submit'>Log in</button>
            

        </form>
      
    </div>
  )
}

export default Login

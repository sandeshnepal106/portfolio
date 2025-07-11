import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';


function Contact() {
  const {backendUrl, isLoggedin} = useContext(AppContext);
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: ""
    })

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl + '/api/visitor/contact', {name: formData.name, email: formData.email, message: formData.message})
        if(data.success){
        toast.success("Message sent successfully.")
      }
      else{
        toast.error(data.message)
      }
      } catch (error) {
        toast.error(error.message)
      }
      
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
  return (
    
    <div className='flex flex-col gap-6 p-16 bg-black/40 rounded-xl text-white'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-2'>Contact Us</h1>
        <p className='text-sm text-white/70 hidden md:block'>_________________________________________________________________________</p>
        <p className='text-sm text-white/70  md:hidden'>____________________________________________</p>
      </div>

      <form onSubmit={onSubmit} className='flex flex-col gap-5'>
        <input
          type='text'
          placeholder='Name'
          value={formData.name}
          name='name'
          onChange={handleChange}
          className='p-3 rounded border border-white/20 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400'
        />

        <input
          type='email'
          placeholder='Email Id'
          value={formData.email}
          name='email'
          onChange={handleChange}
          className='p-3 rounded border border-white/20 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400'
        />

        <textarea
          placeholder='Message'
          value={formData.message}
          name='message'
          onChange={handleChange}
          rows={5}
          className='p-3 rounded border border-white/20 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400'
        ></textarea>

        <button
          type='submit'
          className='mt-4 bg-purple-600 hover:bg-purple-700 transition-all py-3 px-6 rounded font-semibold text-white'
        >
          Submit
        </button>
      </form>
    </div>

  )
}

export default Contact

import axios from 'axios'
import React, { useContext,  useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify';


function Contact() {
  const {backendUrl, isLoggedin} = useContext(AppContext);
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

    const getContacts = async (page = 1) => {
      try {
        const res = await axios.get(backendUrl + `/api/admin/contacts?page=${page}&limit=5`, { withCredentials: true });

        if (res.data.success) {
          const { contacts = [], totalPages = 1 } = res.data;
          setContacts(contacts);
          setTotalPages(totalPages);
          setCurrentPage(page);
        } else {
          toast.error(res.data.message || "Failed to fetch contacts");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };


    useEffect(() => {
      if (isLoggedin) {
        getContacts(currentPage);
      }
    }, [isLoggedin, currentPage]);





  return (
    
    <div className='max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl'>
      <div className='flex flex-col gap-6 p-8 bg-black/40 rounded-xl text-white'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-2 font-sigmar'>Contact Us</h1>
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
        <div>
          {isLoggedin&&(
              <div>
                <div className='w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-8 '>
                  <table className="min-w-[1000px] mt-10 text-left text-white border border-white/20">
                    <thead className="bg-white/10">
                      <tr>
                        <th className="p-2 border border-white/20">S.N.</th>
                        <th className="p-2 border border-white/20">Name</th>
                        <th className="p-2 border border-white/20">Email</th>
                        <th className="p-2 border border-white/20">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(contacts) && contacts.map((c, index) => (
                        <tr key={c._id} className="bg-white/5">
                          <td className="p-2 border border-white/20">{(currentPage - 1) * 5 + index + 1}</td>
                          <td className="p-2 border border-white/20">{c.name}</td>
                          <td className="p-2 border border-white/20">{c.email}</td>
                          <td className="p-2 border border-white/20">{c.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                      <div className="flex justify-center mt-4 gap-2">
                        <button
                          className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
                          onClick={() => getContacts(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i}
                            className={`px-3 py-1 rounded ${
                              currentPage === i + 1
                                ? 'bg-white text-black font-bold'
                                : 'bg-purple-600 text-white'
                            }`}
                            onClick={() => getContacts(i + 1)}
                          >
                            {i + 1}
                          </button>
                        ))}

                        <button
                          className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
                          onClick={() => getContacts(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    )}
              </div>
              
              
            )}
        </div>

    </div>

  )
}

export default Contact

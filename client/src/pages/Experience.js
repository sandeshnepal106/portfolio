import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Experience() {
    const navigate = useNavigate();
    const { backendUrl, isLoggedin } = useContext(AppContext);
    const [experience, setExperience] = useState([]);
    const [toggleForm, setToggleForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [cardId, setCardId] = useState('');
    const [editLoading, setEditLoading] = useState(false);

    const [formData, setFormData] = useState({
        company: '',
        role: '',
        startDate: '', // Changed to string for date input
        endDate: '',   // Changed to string for date input
        location: '',
        description: '',
        techStack: [],
        techInput: '', // Added for tech input field management
        logoUrl: '',
    });
     const [editData, setEditData] = useState({
        company: '',
        role: '',
        startDate: '', // Changed to string for date input
        endDate: '',   // Changed to string for date input
        location: '',
        description: '',
        techStack: [],
        techInput: '', // Added for tech input field management
        logoUrl: '',
    });

    // Function to remove a tech from the techStack
    const removeTech = (techToRemove) => {
        if (editForm && cardId) {
            setEditData((prev) => ({
                ...prev,
                techStack: prev.techStack.filter((tech) => tech !== techToRemove),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                techStack: prev.techStack.filter((tech) => tech !== techToRemove),
            }));
        }
    };


    const handleTech = () => {
        const tech = formData.techInput.trim();
        if (tech && !formData.techStack.includes(tech)) {
            setFormData((prev) => ({
                ...prev,
                techStack: [...prev.techStack, tech],
                techInput: '', // Clear the tech input field after adding
            }));
        }
    };

    const handleEditTech = () => {
        const tech = editData.techInput.trim();
        if (tech && !editData.techStack.includes(tech)) {
            setEditData((prev) => ({
                ...prev,
                techStack: [...prev.techStack, tech],
                techInput: '',
            }));
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };


    const editButton = async (id) => {
        setCardId(id);
        setEditLoading(true); // show loading if needed

        try {
            const res = await axios.get(backendUrl + `/api/admin/experience/${id}`);
            const dataArray = res.data;

            const data = dataArray.find((item) => item._id === id);

            if (!data) {
                toast.error("Experience not found.");
                return;
            }

            setEditData({
                company: data.company,
                role: data.role,
                startDate: data.startDate ? data.startDate.substring(0, 10) : '',
                endDate: data.endDate ? data.endDate.substring(0, 10) : '',
                location: data.location || '',
                description: data.description || '',
                techStack: data.techStack || [],
                techInput: '',
                logoUrl: data.logoUrl || '',
            });

            setEditForm(true);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setEditLoading(false);
        }
    };


    const getExperience = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/visitor/experience');
            setExperience(res.data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const postExperience = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                company: formData.company,
                role: formData.role,
                startDate: formData.startDate,
                endDate: formData.endDate,
                location: formData.location,
                description: formData.description,
                techStack: formData.techStack,
                logoUrl: `https://images.weserv.nl/?url=${formData.logoUrl}&w=20&output=webp`
            };

            const { data } = await axios.post(backendUrl + '/api/admin/experience', payload);

            if (data.success) {
                toast.success('Experience Added Successfully.');
                setToggleForm(false);
                // Clear form data after successful submission
                setFormData({
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    location: '',
                    description: '',
                    techStack: [],
                    techInput: '',
                    logoUrl: '',
                });
                getExperience(); // Re-fetch experience data to update the list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const putExperience = async (id) =>{
        try {
            const payload = {
                company: editData.company,
                role: editData.role,
                startDate: editData.startDate,
                endDate: editData.endDate,
                location: editData.location,
                description: editData.description,
                techStack: editData.techStack,
                logoUrl: `https://images.weserv.nl/?url=${editData.logoUrl}&w=200&output=webp`
            };
            const { data } = await axios.put(backendUrl + `/api/admin/experience/${id}` , payload);
            if (data.success){
                toast.success("Successfully edited.");
                setEditForm(false);
                setCardId(null);
                getExperience();
                setEditData({
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    location: '',
                    description: '',
                    techStack: [],
                    techInput: '',
                    logoUrl: '',
                });

            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }

    }

    const deleteExperience = async(id) =>{
        try {
            const res = await axios.delete(backendUrl + `/api/admin/experience/${id}`);
            if(res.data.success){
                toast.success("Deleted successfully.");
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }





    useEffect(() => {
        getExperience();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="container mx-auto px-4 py-8">
            
            {/* Experience Section Heading */}
            <div>
                <h1 className="py-5 text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wider font-sigmar">
                    Experience
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            
            {/* Experience Cards Display */}
            {/* Added max-w-4xl to limit overall width on very large screens for better readability */}
            <div className="space-y-8 mt-8 flex flex-col items-center max-w-4xl mx-auto">
                {experience.length > 0 ? (
                    experience.map((exp) => (
                        <div
                            key={exp._id}
                            // Using full width on small screens, then scaling up to a controlled max-width
                            // on larger screens for better aesthetics.
                            // The md:flex-row allows the content to switch from stacked to side-by-side.
                            className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-full bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-indigo-200"
                        >
                            {exp.logoUrl && (
                                <img loading="lazy"
                                    src={exp.logoUrl}
                                    alt={`${exp.company} Logo`}
                                    // Adjusted logo size for better responsiveness
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full flex-shrink-0 border p-1"
                                />
                            )}
                            <div className="flex-grow text-center md:text-left">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{exp.role}</h2>
                                <h3 className="text-xl text-indigo-700 font-semibold mb-2">{exp.company}</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    {new Date(exp.startDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                    })}{' '}
                                    -{' '}
                                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                    }) : 'Present'}
                                    {exp.location && <span className="ml-2 text-gray-500">| {exp.location}</span>}
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">{exp.description}</p>
                                {exp.techStack && exp.techStack.length > 0 && (
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                        {exp.techStack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                
                            </div>
                            {isLoggedin &&(
                                <div className='flex flex-col gap-y-2'>
                                    <button className='px-6 py-2 bg-green-500 rounded-lg' onClick={() => editButton(exp._id)}>Edit</button>
                                    { cardId === exp._id && editForm && (
                                        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
                                            <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                                                <form onSubmit={(e) => { e.preventDefault(); putExperience(cardId); }} className="mt-6 space-y-4 p-4">
                                                    <h1 className='text-2xl font-bold text-gray-800'>Edit Experience</h1>
                                                    <div>
                                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                                        <input
                                                            id="company"
                                                            onChange={handleEditChange}
                                                            type="text"
                                                            placeholder='Company Name'
                                                            value={editData.company }
                                                            name="company"
                                                            required
                                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                                        <input
                                                            id="role"
                                                            onChange={handleEditChange}
                                                            type="text"
                                                            placeholder="e.g., Software Engineer"
                                                            value={editData.role}
                                                            name="role"
                                                            required
                                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                                            <input
                                                                id="startDate"
                                                                onChange={handleEditChange}
                                                                type="date"
                                                                value={editData.startDate?.substring(0, 10)}
                                                                name="startDate"
                                                                required
                                                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date (or leave blank for Present)</label>
                                                            <input
                                                                id="endDate"
                                                                onChange={handleEditChange}
                                                                type="date"
                                                                value={editData.endDate?.substring(0, 10) || ''}
                                                                name="endDate"
                                                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                        <input
                                                            id="location"
                                                            onChange={handleEditChange}
                                                            type="text"
                                                            placeholder="e.g., New York, NY"
                                                            value={editData.location}
                                                            name="location"
                                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                        <textarea
                                                            id="description"
                                                            onChange={handleEditChange}
                                                            placeholder="Brief description of responsibilities and achievements."
                                                            value={editData.description}
                                                            name="description"
                                                            rows="4"
                                                            required
                                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y text-black "
                                                        ></textarea>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="techInput" className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                                                        <div className="flex flex-col sm:flex-row gap-3">
                                                            <input
                                                                id="techInput"
                                                                onChange={handleEditChange}
                                                                type="text"
                                                                placeholder="Type a tech (e.g., React, Node.js) and click Add"
                                                                value={editData.techInput}
                                                                name="techInput"
                                                                className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={handleEditTech}
                                                                className="px-5 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
                                                            >
                                                                Add Tech
                                                            </button>
                                                        </div>
                                                        {(editData.techStack && editData.techStack.length) > 0 && (
                                                            <div className="flex flex-wrap gap-2 mt-3 text-sm">
                                                                {editData.techStack.map((tech, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full flex items-center gap-1"
                                                                    >
                                                                        {tech}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeTech(tech)}
                                                                            className="text-indigo-600 hover:text-indigo-900 ml-1 font-bold"
                                                                        >
                                                                            &times;
                                                                        </button>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">Company Logo URL</label>
                                                        <input
                                                            id="logoUrl"
                                                            onChange={handleEditChange}
                                                            type="text"
                                                            placeholder="URL of company logo (optional)"
                                                            value={editData.logoUrl}
                                                            name="logoUrl"
                                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                                        />
                                                    </div>
                                                    <div className="flex gap-3 pt-4">
                                                        <button
                                                            type="submit"
                                                            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-md"
                                                        >
                                                            Save Changes
                                                        </button>
                                                        <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditForm(false);
                                                            setCardId(null);
                                                        }}
                                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105"
                                                                                                        >
                                                        Cancel
                                                                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                    <button className='px-6 py-2 bg-red-500 rounded-lg' onClick={()=>{deleteExperience(exp._id)}}>Delete</button>
                                </div>
                                
                            )}
                            

                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-lg py-10">No experience data available.</p>
                )}
            </div>

            
            {/* Admin Display Section */}
            {isLoggedin && (
                <div id="adminDisplay" className="mt-12 p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200 max-w-4xl mx-auto">
                    <button
                        onClick={() => setToggleForm((prev) => !prev)}
                        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out shadow-md"
                    >
                        {toggleForm ? 'Close Form' : 'Add New Experience +'}
                    </button>

                    {toggleForm && (
                        <form onSubmit={postExperience} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <input
                                    id="company"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Company Name"
                                    value={formData.company}
                                    name="company"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                <input
                                    id="role"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="e.g., Software Engineer"
                                    value={formData.role}
                                    name="role"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        id="startDate"
                                        onChange={handleChange}
                                        type="date"
                                        value={formData.startDate}
                                        name="startDate"
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                    />
                                </div>
                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date (or leave blank for Present)</label>
                                    <input
                                        id="endDate"
                                        onChange={handleChange}
                                        type="date"
                                        value={formData.endDate}
                                        name="endDate"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    id="location"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="e.g., New York, NY"
                                    value={formData.location}
                                    name="location"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    id="description"
                                    onChange={handleChange}
                                    placeholder="Brief description of responsibilities and achievements."
                                    value={formData.description}
                                    name="description"
                                    rows="4"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y text-black "
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="techInput" className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        id="techInput"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Type a tech (e.g., React, Node.js) and click Add"
                                        value={formData.techInput}
                                        name="techInput"
                                        className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTech}
                                        className="px-5 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
                                    >
                                        Add Tech
                                    </button>
                                </div>
                                {formData.techStack && formData.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3 text-sm">
                                        {formData.techStack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full flex items-center gap-1"
                                            >
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTech(tech)}
                                                    className="text-indigo-600 hover:text-indigo-900 ml-1 font-bold"
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">Company Logo URL</label>
                                <input
                                    id="logoUrl"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="URL of company logo (optional)"
                                    value={formData.logoUrl}
                                    name="logoUrl"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black "
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-md"
                            >
                                Submit Experience
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

export default Experience;
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Projects() {
    const navigate = useNavigate();
    const { backendUrl, isLoggedin } = useContext(AppContext);
    const [projects, setProjects] = useState([]);
    const [toggleForm, setToggleForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: [],
        githubUrl: '',
        imageUrl: '',
        techInput: '',
    });

    // Function to remove a tech from the techStack
    const removeTech = (techToRemove) => {
        setFormData((prev) => ({
            ...prev,
            techStack: prev.techStack.filter((tech) => tech !== techToRemove),
        }));
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

    const getProjects = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/visitor/project');
            setProjects(res.data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const postProjects = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                techStack: formData.techStack,
                githubUrl: formData.githubUrl,
                imageUrl: formData.imageUrl,
            };

            const { data } = await axios.post(backendUrl + '/api/admin/projects', payload);

            if (data.success) {
                toast.success("Project Added Successfully.");
                setToggleForm(false);
                // Clear form data after successful submission
                setFormData({
                    title: '',
                    description: '',
                    techStack: [],
                    githubUrl: '',
                    imageUrl: '',
                    techInput: '',
                });
                getProjects(); // Re-fetch project data to update the list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 gap-y-8 ">
            
            {/* Projects Section Heading */}
            <h1 className="py-16 text-center text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
                Projects
            </h1>

            
            {/* Projects Horizontal Scroll Display */}
            <div className="relative">
                <div className="w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 px-12 snap-x snap-mandatory scroll-smooth">
                    <div className="flex gap-6">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div
                                    key={project._id}
                                    className="snap-center min-w-[85%] sm:min-w-[300px] md:min-w-[400px] w-[45px] sm:w-[300px] md:w-[400px] flex-shrink-0 bg-white rounded-xl shadow-xl border border-gray-200 p-4 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]"
                                >
                                    <h2 className="text-xl font-semibold text-indigo-700 mb-2 h-12 ">
                                        {project.title}
                                    </h2>
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="h-60 w-full object-cover rounded-md mb-3"
                                    />
                                    <p className="text-gray-600 text-lg mb-2">
                                        {project.description}
                                    </p>
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.techStack.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {/* Project Action Link (GitHub only) */}
                                    <div className="mt-4 flex gap-3">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                GitHub
                                                {/* Optional: Add GitHub SVG icon here */}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 text-lg py-10 w-full">No projects found. Check back soon!</p>
                        )}
                    </div>
                </div>
            </div>

            
            {/* Admin Display Section */}
            {isLoggedin && (
                <div id='adminDisplay' className="mt-12 p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                    <button
                        onClick={() => setToggleForm(prev => !prev)}
                        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out shadow-md"
                    >
                        {toggleForm ? 'Close Form' : 'Add New Project +'}
                    </button>

                    {toggleForm && (
                        <form onSubmit={postProjects} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                                <input
                                    id="title"
                                    onChange={handleChange}
                                    type='text'
                                    placeholder='Project Title'
                                    value={formData.title}
                                    name='title'
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                                <textarea
                                    id="description"
                                    onChange={handleChange}
                                    placeholder='A brief description of the project'
                                    value={formData.description}
                                    name='description'
                                    rows="4"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="techInput" className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        id="techInput"
                                        onChange={handleChange}
                                        type='text'
                                        placeholder='Type a tech (e.g., React, Node.js) and click Add'
                                        value={formData.techInput}
                                        name='techInput'
                                        className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <button
                                        type='button'
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
                                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                                <input
                                    id="githubUrl"
                                    onChange={handleChange}
                                    type='text'
                                    placeholder='GitHub Repository URL'
                                    value={formData.githubUrl}
                                    name='githubUrl'
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    id="imageUrl"
                                    onChange={handleChange}
                                    type='text'
                                    placeholder='URL of project screenshot/image'
                                    value={formData.imageUrl}
                                    name='imageUrl'
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <button
                                type='submit'
                                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-md"
                            >
                                Submit Project
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

export default Projects;
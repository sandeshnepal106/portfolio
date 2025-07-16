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
    const [cardId, setCardId] = useState(null);
    const [editForm, setEditForm] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: [],
        githubUrl: '',
        imageUrl: '',
        techInput: '',
    });
    const [editData, setEditData] = useState({
        title: '',
        description: '',
        techStack: [],
        githubUrl: '',
        imageUrl: '',
        techInput: '',
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
                techInput: '',
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

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
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
                setFormData({
                    title: '',
                    description: '',
                    techStack: [],
                    githubUrl: '',
                    imageUrl: '',
                    techInput: '',
                });
                getProjects();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const editButton = async (id) => {
        setCardId(id);
        setEditLoading(true);

        try {
            const res = await axios.get(backendUrl + `/api/admin/projects/${id}`);
            const dataArray = res.data;
            const data = dataArray.find((item) => item._id === id);

            if (!data) {
                toast.error("Project not found.");
                return;
            }

            setEditData({
                title: data.title,
                description: data.description,
                techStack: data.techStack,
                githubUrl: data.githubUrl,
                imageUrl: data.imageUrl,
                techInput: ''
            });

            setEditForm(true);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setEditLoading(false);
        }
    };

    const putProjects = async (id) => {
        try {
            const payload = {
                title: editData.title,
                description: editData.description,
                techStack: editData.techStack,
                githubUrl: editData.githubUrl,
                imageUrl: editData.imageUrl,
            };
            const { data } = await axios.put(backendUrl + `/api/admin/projects/${id}`, payload);
            if (data.success) {
                toast.success("Successfully edited.");
                setEditForm(false);
                setCardId(null);
                getProjects();
                setEditData({
                    title: '',
                    description: '',
                    techStack: [],
                    githubUrl: '',
                    imageUrl: '',
                    techInput: '',
                });
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteProject = async (id) => {
        try {
            const res = await axios.delete(backendUrl + `/api/admin/projects/${id}`);
            if (res.data.success) {
                toast.success("Deleted successfully.");
                getProjects();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl -full box-border mx-auto py-8 sm:py-16 space-y-12 overflow-x-hidden">

            {/* Section Heading */}
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wider font-sigmar mb-4">
                    Projects
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Projects Grid - Responsive Layout */}
            <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[60%] lg:auto-cols-[30%] gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-visible snap-x snap-mandatory scroll-smooth p-4 relative">

                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project._id} className="group snap-center overflow-visible">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:rounded-2xl hover:z-50 flex flex-col h-full">
                                {/* Project Image */}
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-48 sm:h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                                        {project.title}
                                    </h2>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    {project.techStack?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.techStack.slice(0, 4).map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200 transition-all duration-200 hover:from-blue-200 hover:to-indigo-200"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 4 && (
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                    +{project.techStack.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-medium rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 text-center transform hover:scale-105"
                                            >
                                                View on GitHub
                                            </a>
                                        )}
                                        
                                        {isLoggedin && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => editButton(project._id)}
                                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteProject(project._id)}
                                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Edit Form Modal */}
                            {cardId === project._id && editForm && (
                                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        <div className="p-6 border-b border-gray-200">
                                            <h3 className="text-2xl font-bold text-gray-800">Edit Project</h3>
                                        </div>
                                        
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            putProjects(project._id);
                                        }} className="p-6 space-y-6">
                                            {/* Title */}
                                            <div>
                                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Project Title
                                                </label>
                                                <input
                                                    id="title"
                                                    name="title"
                                                    value={editData.title}
                                                    onChange={handleEditChange}
                                                    required
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black transition-all duration-200"
                                                />
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Project Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    value={editData.description}
                                                    onChange={handleEditChange}
                                                    rows="4"
                                                    required
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y text-black transition-all duration-200"
                                                />
                                            </div>

                                            {/* Tech Stack */}
                                            <div>
                                                <label htmlFor="techInput" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Technologies Used
                                                </label>
                                                <div className="flex gap-3">
                                                    <input
                                                        id="techInput"
                                                        name="techInput"
                                                        value={editData.techInput}
                                                        onChange={handleEditChange}
                                                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black transition-all duration-200"
                                                        placeholder="Enter technology..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleEditTech}
                                                        className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                
                                                {editData.techStack.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {editData.techStack.map((tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full flex items-center gap-2 text-sm border border-indigo-200"
                                                            >
                                                                {tech}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeTech(tech)}
                                                                    className="text-indigo-600 hover:text-indigo-900 font-bold text-lg leading-none"
                                                                >
                                                                    ×
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* GitHub URL */}
                                            <div>
                                                <label htmlFor="githubUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    GitHub URL
                                                </label>
                                                <input
                                                    id="githubUrl"
                                                    name="githubUrl"
                                                    value={editData.githubUrl}
                                                    onChange={handleEditChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black transition-all duration-200"
                                                    placeholder="https://github.com/..."
                                                />
                                            </div>

                                            {/* Image URL */}
                                            <div>
                                                <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Image URL
                                                </label>
                                                <input
                                                    id="imageUrl"
                                                    name="imageUrl"
                                                    value={editData.imageUrl}
                                                    onChange={handleEditChange}
                                                    required
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black transition-all duration-200"
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4">
                                                <button
                                                    type="submit"
                                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
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
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <div className="text-gray-400 text-6xl mb-4">📂</div>
                        <p className="text-gray-500 text-xl font-medium">No projects found</p>
                        <p className="text-gray-400 text-sm mt-2">Check back soon for new projects!</p>
                    </div>
                )}
            </div>

            {/* Admin Add Project Form */}
            {isLoggedin && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <button
                        onClick={() => setToggleForm(prev => !prev)}
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        {toggleForm ? '✕ Close Form' : 'Add New Project'}
                    </button>

                    {toggleForm && (
                        <form onSubmit={postProjects} className="mt-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Project Title
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black transition-all duration-200"
                                        placeholder="Enter project title..."
                                    />
                                </div>

                                {/* GitHub URL */}
                                <div>
                                    <label htmlFor="githubUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                                        GitHub URL
                                    </label>
                                    <input
                                        id="githubUrl"
                                        name="githubUrl"
                                        value={formData.githubUrl}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black transition-all duration-200"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Project Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y text-black transition-all duration-200"
                                    placeholder="Describe your project..."
                                />
                            </div>

                            {/* Tech Stack */}
                            <div>
                                <label htmlFor="techInput" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Technologies Used
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        id="techInput"
                                        name="techInput"
                                        value={formData.techInput}
                                        onChange={handleChange}
                                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black transition-all duration-200"
                                        placeholder="Enter technology..."
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTech}
                                        className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                                    >
                                        Add Tech
                                    </button>
                                </div>
                                
                                {formData.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.techStack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full flex items-center gap-2 text-sm border border-indigo-200"
                                            >
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTech(tech)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-bold text-lg leading-none"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Image URL */}
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black transition-all duration-200"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                🚀 Submit Project
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

export default Projects;
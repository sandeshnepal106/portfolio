// src/pages/Projects.js

import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useContext, useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

// --- SWIPER IMPORTS ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// --- END SWIPER IMPORTS ---

import Modal from '../components/Modal';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';

// Skeleton Loader remains the same
const ProjectSkeleton = () => (
    <div className="w-full bg-white/10 rounded-2xl shadow-lg p-4 animate-pulse">
        <div className="h-52 bg-gray-500/30 rounded-lg"></div>
        <div className="mt-4 h-6 bg-gray-500/30 rounded w-3/4"></div>
        <div className="mt-2 h-4 bg-gray-500/30 rounded"></div>
        <div className="mt-2 h-4 bg-gray-500/30 rounded w-1/2"></div>
        <div className="mt-4 flex gap-2">
            <div className="h-8 bg-gray-500/30 rounded w-full"></div>
        </div>
    </div>
);

function Projects() {
    // All your existing state and functions (getProjects, handleOpenModal, etc.) remain the same...
    const { backendUrl, isLoggedin } = useContext(AppContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const getProjects = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendUrl}/api/visitor/project`);
            setProjects(res.data);
        } catch (error) {
            toast.error("Failed to fetch projects.");
        } finally {
            setLoading(false);
        }
    }, [backendUrl]);

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    const handleOpenModal = (project = null) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handleFormSubmit = async (formData) => {
        try {
            let response;
            if (selectedProject) {
                response = await axios.put(`${backendUrl}/api/admin/projects/${selectedProject._id}`, formData);
                toast.success("Project updated successfully!");
            } else {
                response = await axios.post(`${backendUrl}/api/admin/projects`, formData);
                toast.success("Project added successfully!");
            }

            if (response.data.success) {
                getProjects();
                handleCloseModal();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    };

    const deleteProject = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                const res = await axios.delete(`${backendUrl}/api/admin/projects/${id}`);
                if (res.data.success) {
                    toast.success("Project deleted successfully.");
                    getProjects();
                }
            } catch (error) {
                toast.error("Failed to delete project.");
            }
        }
    };


    return (
        <>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Section Heading remains the same */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider font-sigmar">
                        My Projects
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {isLoggedin && (
                    <div className="text-center mb-12">
                        <button
                            onClick={() => handleOpenModal()}
                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
                        >
                            ✨ Add New Project
                        </button>
                    </div>
                )}

                {/* --- NEW SWIPER SLIDESHOW --- */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 3 }).map((_, index) => <ProjectSkeleton key={index} />)}
                    </div>
                ) : projects.length > 0 ? (
                    <Swiper
                        // Import Swiper modules
                        modules={[Autoplay, Pagination, Navigation]}
                        // --- Configuration ---
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 2500, // Time in ms between slides
                            disableOnInteraction: false, // Autoplay will not be disabled after user interactions
                        }}
                        pagination={{
                            clickable: true, // Adds clickable dots at the bottom
                        }}
                        navigation={true} // Adds Next/Prev arrows
                        // Responsive breakpoints
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}
                        className="w-full py-4"
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project._id}>
                                <ProjectCard
                                    project={project}
                                    onEdit={handleOpenModal}
                                    onDelete={deleteProject}
                                    isLoggedin={isLoggedin}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    // Message when no projects are found
                    <div className="col-span-full text-center py-20 bg-white/5 rounded-lg">
                        <p className="text-gray-400 text-xl font-medium">No projects found</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedProject ? "Edit Project" : "Add New Project"}
            >
                <ProjectForm
                    initialData={selectedProject}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </>
    );
}

export default Projects;
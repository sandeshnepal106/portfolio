// src/pages/Experience.js

import { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

import Modal from '../components/Modal'; // Re-use this
import ExperienceForm from '../components/ExperienceForm'; // New
import ExperienceCard from '../components/ExperienceCard'; // New

// Skeleton Loader for the timeline
const ExperienceSkeleton = ({ index }) => {
  const alignment = index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse';
  return (
    <div className={`flex justify-between items-center w-full animate-pulse ${alignment}`}>
      <div className="hidden md:block w-5/12"></div>
      <div className="relative h-24 w-6"><div className="absolute inset-0 flex items-center justify-center"><div className="h-full w-1 bg-gray-600"></div></div></div>
      <div className="bg-gray-700/50 rounded-xl p-6 w-full md:w-5/12 space-y-3">
        <div className="flex gap-4 items-center"><div className="w-12 h-12 rounded-full bg-gray-600"></div><div className="w-4/5 h-6 rounded bg-gray-600"></div></div>
        <div className="h-4 rounded bg-gray-600 w-3/4"></div>
        <div className="h-4 rounded bg-gray-600 w-full"></div>
        <div className="h-4 rounded bg-gray-600 w-5/6"></div>
      </div>
    </div>
  );
};

function Experience() {
  const { backendUrl, isLoggedin } = useContext(AppContext);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const getExperience = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/visitor/experience`);
      setExperience(res.data);
    } catch (error) {
      toast.error("Failed to fetch experience.");
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    getExperience();
  }, [getExperience]);

  const handleOpenModal = (exp = null) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      let payload = { ...formData };
      const { logoUrl } = formData;
      if (logoUrl && !logoUrl.startsWith('https://images.weserv.nl')) {
        const optimizedLogoUrl = `https://images.weserv.nl/?url=${encodeURIComponent(logoUrl)}&w=200&output=webp`;
        payload.logoUrl = optimizedLogoUrl;
      }

      if (selectedExperience) {
        await axios.put(`${backendUrl}/api/admin/experience/${selectedExperience._id}`, payload);
        toast.success("Experience updated!");
      } else {
        await axios.post(`${backendUrl}/api/admin/experience`, payload);
        toast.success("Experience added!");
      }
      getExperience();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const deleteExperience = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await axios.delete(`${backendUrl}/api/admin/experience/${id}`);
        toast.success("Experience deleted.");
        getExperience();
      } catch (error) {
        toast.error("Failed to delete experience.");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider font-sigmar">
            Career Journey
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        {isLoggedin && (
          <div className="text-center mb-12">
            <button onClick={() => handleOpenModal()} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg">
              💼 Add New Experience
            </button>
          </div>
        )}

        {/* --- The Timeline Container --- */}
        <div className="relative flex flex-col items-center gap-8 md:gap-0 p-2 h-full">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => <ExperienceSkeleton key={index} index={index} />)
          ) : experience.length > 0 ? (
            experience.map((exp, index) => (
              <ExperienceCard
                key={exp._id}
                experience={exp}
                onEdit={handleOpenModal}
                onDelete={deleteExperience}
                isLoggedin={isLoggedin}
                index={index}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg py-10">No experience data yet.</p>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedExperience ? 'Edit Experience' : 'Add New Experience'}>
        <ExperienceForm initialData={selectedExperience} onSubmit={handleFormSubmit} onCancel={handleCloseModal} />
      </Modal>
    </>
  );
}

export default Experience;
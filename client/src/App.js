import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext, lazy, Suspense } from 'react';
import { AppContext } from './context/AppContext';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Login = lazy(() => import('./pages/Login'));
const Contact = lazy(() => import('./pages/Contact'));

const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-black text-white gap-y-4'>
      <div className='w-16 h-16 border-8 border-dashed rounded-full animate-spin border-pink-400'></div>
      <p className='text-xl font-semibold tracking-wider'>Initializing...</p>
    </div>
  );
};

function App() {
  const { loading, isLoggedin } = useContext(AppContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=' bg-400 w-full min-h-screen  flex flex-col items-center justify-center text-white'>
      <ToastContainer />
      <Suspense fallback={<div className="text-center py-10 text-xl h-screen">Loading page...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

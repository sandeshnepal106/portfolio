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

function App() {
  const { loading, isLoggedin } = useContext(AppContext);

  if (loading) {
    return (
      <div className='bg-black font-sigmar text-center h-screen text-5xl md:text-7xl text-white'>
        Loading...
      </div>
    );
  }

  return (
    <div className='bg-elite-gradient-2 bg-400 w-full animate-gradient-tilted flex flex-col items-center justify-center text-white'>
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

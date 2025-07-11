import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div className='bg-elite-gradient-2 bg-400 w-full animate-gradient-tilted flex flex-col items-center justify-center text-white  overflow-hidden'>
      <ToastContainer/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/about' element= {<About/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/experience' element={<Experience/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path ='/contact' element= {<Contact/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

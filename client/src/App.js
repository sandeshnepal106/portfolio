import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';

import { useEffect } from 'react';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function App() {
  // Prevent tsParticles click effect from firing when clicking buttons or interactive elements
  useEffect(() => {
    const stopper = (e) => {
      if (e.target.closest('button, a, input, textarea, form, .proj-card, .glass, .glass-card, [role="button"], img, svg')) {
        e.stopPropagation();
      }
    };
    const events = ['click', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'touchstart', 'touchend'];
    events.forEach(ev => document.body.addEventListener(ev, stopper));
    return () => events.forEach(ev => document.body.removeEventListener(ev, stopper));
  }, []);

  return (
    <div className='bg-400 w-full min-h-screen flex flex-col items-center justify-center text-white'>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

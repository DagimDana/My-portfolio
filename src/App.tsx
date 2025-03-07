import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Admin from './pages/Admin';

function Layout({ isAuthenticated }: { isAuthenticated: boolean }) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Update active section based on current path
    const path = location.pathname.split('/')[1] || 'home';
    setActiveSection(path);
  }, [location]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated}  />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Layout isAuthenticated={isAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { supabase } from './lib/supabase';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Projects from './pages/Projects';
// import ProjectDetail from './pages/ProjectDetail';
// import Admin from './pages/Admin';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setIsAuthenticated(!!session);
//     };

//     checkAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setIsAuthenticated(!!session);
//     });
//     const [activeSection, setActiveSection] = useState("admin");  
//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <Router>
//       <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
//         <Routes>
//           <Route
//             path="/*"
//             element={
//               <>
//                 <Navbar isAuthenticated={isAuthenticated} activeSection={activeSection} />
//                 <div className="flex-grow">
//                   <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/contact" element={<Contact />} />
//                     <Route path="/projects" element={<Projects />} />
//                     <Route path="/projects/:id" element={<ProjectDetail />} />
//                   </Routes>
//                 </div>
//                 <Footer />
//               </>
//             }
//           />
//           <Route path="/admin" element={<Admin />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
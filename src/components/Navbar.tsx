import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
}

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleHireMe = () => {
    window.location.href = 'mailto:dagimdana1@gmail.com';
  };

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen ? 'bg-[#0a0a0a]/95 backdrop-blur-sm shadow-lg' : ''
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-mono z-50 relative" onClick={handleNavClick}>
            <Code2 className="text-[#00ff9d]" />
            <span>Dagim<span className="text-[#00ff9d]">.</span></span>
          </Link>
          
          <button 
            className="md:hidden z-50 relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} className="text-[#00ff9d]" /> : <Menu size={24} className="text-[#00ff9d]" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={handleNavClick}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={handleNavClick}>
              About
            </Link>
            <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`} onClick={handleNavClick}>
              Projects
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={handleNavClick}>
              Contact
            </Link>
            {isAuthenticated && (
              <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} onClick={handleNavClick}>
                Admin
              </Link>
            )}
            <button 
              onClick={handleHireMe}
              className="bg-[#00ff9d] text-black px-6 py-2 rounded-full hover:bg-[#00cc7d] transition-colors font-medium"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`
            md:hidden fixed inset-0 bg-[#0a0a0a]/98 backdrop-blur-lg
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}>
            <div className="flex flex-col items-center justify-center h-full gap-8 text-xl">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''} text-2xl`} onClick={handleNavClick}>
                Home
              </Link>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''} text-2xl`} onClick={handleNavClick}>
                About
              </Link>
              <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''} text-2xl`} onClick={handleNavClick}>
                Projects
              </Link>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''} text-2xl`} onClick={handleNavClick}>
                Contact
              </Link>
              {isAuthenticated && (
                <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''} text-2xl`} onClick={handleNavClick}>
                  Admin
                </Link>
              )}
              <button 
                onClick={handleHireMe}
                className="bg-[#00ff9d] text-black px-8 py-3 rounded-full hover:bg-[#00cc7d] transition-colors font-medium text-xl mt-4"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-mono mb-4">
              <Code2 className="text-[#00ff9d]" />
              <span>Dagim<span className="text-[#00ff9d]">.</span></span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Passionate full stack developer specializing in creating modern, 
              responsive web applications with cutting-edge technologies.
            </p>
            <div className="flex gap-4 pt-4">
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border-2 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border-2 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:dagimdana1@gmail.com"
                className="p-2 rounded-full border-2 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300"
                aria-label="Email Contact"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Addis Ababa, Ethiopia</span>
              </li>
              <li>
                <a href="mailto:dagimdana1@gmail.com" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                  dagimdana1@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                  +251925546881
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Copyright */}
        <div className="flex justify-center">
          <p className="text-gray-400 text-sm">
            © 2025 Dagim Dana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
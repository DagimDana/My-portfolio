'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  const profileRefDesktop = useRef<HTMLDivElement>(null);
  const profileRefMobile = useRef<HTMLDivElement>(null);
  const particlesRefDesktop = useRef<HTMLDivElement>(null);
  const particlesRefMobile = useRef<HTMLDivElement>(null);
  const dashedBorderRefDesktop = useRef<HTMLDivElement>(null);
  const dashedBorderRefMobile = useRef<HTMLDivElement>(null);
  
  // State for counter values
  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  
  // Handle CV download
  const handleDownloadCV = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/Dagim-Resume.pdf';
    link.download = 'Dagim-CV.pdf'; // The name that will be used when downloading
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Counter animation effect
  useEffect(() => {
    const animateCounter = (
      startValue: number, 
      endValue: number, 
      setter: React.Dispatch<React.SetStateAction<number>>,
      duration: number = 2000
    ) => {
      // Calculate step based on duration (assuming 60fps)
      const totalFrames = duration / (1000 / 60);
      const step = (endValue - startValue) / totalFrames;
      
      let currentValue = startValue;
      let frame = 0;
      
      const animate = () => {
        frame++;
        currentValue += step;
        
        // For percentage values, we need to round to nearest integer
        // For other values, we can use Math.floor to ensure we don't exceed the target
        const isPercentage = endValue > 90; // Assuming percentages are > 90
        const newValue = isPercentage 
          ? Math.round(Math.min(currentValue, endValue)) 
          : Math.floor(Math.min(currentValue, endValue));
        
        setter(newValue);
        
        if (currentValue < endValue) {
          requestAnimationFrame(animate);
        } else {
          setter(endValue);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    // Start animations with slight delays for visual interest
    setTimeout(() => animateCounter(0, 2, setYearsCount), 500);
    setTimeout(() => animateCounter(0, 2, setProjectsCount), 700);
    setTimeout(() => animateCounter(0, 95, setFeedbackCount), 900);
    setTimeout(() => animateCounter(0, 98, setCompletedCount), 1100);
    
  }, []);
  
  // Create dashed border animation for both mobile and desktop
  useEffect(() => {
    const createDashedBorder = (borderContainer: HTMLDivElement | null) => {
      if (!borderContainer) return null;
      
      // Create SVG element
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.overflow = 'visible';
      
      // Create circle path
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '50');
      circle.setAttribute('cy', '50');
      circle.setAttribute('r', '49');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', '#00ff9d');
      circle.setAttribute('stroke-width', '0.5');
      circle.setAttribute('stroke-dasharray', '3,3');
      
      svg.appendChild(circle);
      borderContainer.appendChild(svg);
      
      return { svg, circle };
    };
    
    const desktopElements = createDashedBorder(dashedBorderRefDesktop.current);
    const mobileElements = createDashedBorder(dashedBorderRefMobile.current);
    
    // Animation variables
    let rotation = 0;
    let direction = 1; // 1 for forward, -1 for backward
    let speed = 0.5;
    let dashLength = 3;
    let gapLength = 3;
    let dashChangeDirection = 1; // 1 for increasing, -1 for decreasing
    
    // Animation function
    const animate = () => {
      // Change direction occasionally
      if (Math.random() < 0.005) {
        direction *= -1;
      }
      
      // Vary speed
      speed = 0.2 + Math.sin(Date.now() / 2000) * 0.3;
      
      // Update rotation
      rotation += speed * direction;
      
      // Update dash length
      dashLength += 0.05 * dashChangeDirection;
      if (dashLength > 10) {
        dashChangeDirection = -1;
      } else if (dashLength < 1) {
        dashChangeDirection = 1;
      }
      
      // Update gap length (inverse to dash length for interesting effect)
      gapLength = 12 - dashLength;
      
      // Apply animations to desktop elements
      if (desktopElements) {
        desktopElements.svg.style.transform = `rotate(${rotation}deg)`;
        desktopElements.circle.setAttribute('stroke-dasharray', `${dashLength},${gapLength}`);
      }
      
      // Apply animations to mobile elements
      if (mobileElements) {
        mobileElements.svg.style.transform = `rotate(${rotation}deg)`;
        mobileElements.circle.setAttribute('stroke-dasharray', `${dashLength},${gapLength}`);
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      
      // Clean up desktop elements
      if (desktopElements && dashedBorderRefDesktop.current) {
        if (dashedBorderRefDesktop.current.contains(desktopElements.svg)) {
          dashedBorderRefDesktop.current.removeChild(desktopElements.svg);
        }
      }
      
      // Clean up mobile elements
      if (mobileElements && dashedBorderRefMobile.current) {
        if (dashedBorderRefMobile.current.contains(mobileElements.svg)) {
          dashedBorderRefMobile.current.removeChild(mobileElements.svg);
        }
      }
    };
  }, []);
  
  // Create particles effect for both mobile and desktop
  useEffect(() => {
    const createParticles = (particlesContainer: HTMLDivElement | null) => {
      if (!particlesContainer) return;
      
      // Clear existing particles
      particlesContainer.innerHTML = '';
      
      const particleCount = 20;
      
      // Create new particles
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position around the circle
        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        const startX = Math.cos(angle) * (Math.random() * 20);
        const startY = Math.sin(angle) * (Math.random() * 20);
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        // Set custom properties for animation
        particle.style.setProperty('--tx', `${endX}px`);
        particle.style.setProperty('--ty', `${endY}px`);
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Random duration
        const duration = 5 + Math.random() * 5;
        particle.style.animationDuration = `${duration}s`;
        
        // Random opacity
        const opacity = 0.3 + Math.random() * 0.7;
        particle.style.opacity = opacity.toString();
        
        // Position
        particle.style.left = `50%`;
        particle.style.top = `50%`;
        particle.style.transform = `translate(${startX}px, ${startY}px)`;
        
        particlesContainer.appendChild(particle);
      }
      
      // Create sparkles
      for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position on the border
        const angle = Math.random() * Math.PI * 2;
        const radius = 140; // Radius of the profile circle
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        sparkle.style.left = `calc(50% + ${x}px)`;
        sparkle.style.top = `calc(50% + ${y}px)`;
        
        // Random delay
        const delay = Math.random() * 5;
        sparkle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(sparkle);
      }
    };
    
    // Create particles for both desktop and mobile
    createParticles(particlesRefDesktop.current);
    createParticles(particlesRefMobile.current);
    
    return () => {
      if (particlesRefDesktop.current) {
        particlesRefDesktop.current.innerHTML = '';
      }
      if (particlesRefMobile.current) {
        particlesRefMobile.current.innerHTML = '';
      }
    };
  }, []);
  
  // Interactive effect on mouse move for both mobile and desktop
  useEffect(() => {
    const setupInteractiveEffect = (profileElement: HTMLDivElement | null) => {
      if (!profileElement) return;
      
      // const handleMouseMove = (e: MouseEvent) => {
      //   if (!profileElement) return;
        
      //   const rect = profileElement.getBoundingClientRect();
      //   const centerX = rect.left + rect.width / 2;
      //   const centerY = rect.top + rect.height / 2;
        
      //   // Calculate distance from center
      //   const distX = (e.clientX - centerX) / 20;
      //   const distY = (e.clientY - centerY) / 20;
        
      //   // Limit the tilt effect
      //   const maxTilt = 10;
      //   const tiltX = Math.max(-maxTilt, Math.min(maxTilt, distY));
      //   const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -distX));
        
      //   // Apply the tilt effect
      //   profileElement.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${profileElement.style.getPropertyValue('--float-offset') || '0px'})`;
      // };
      
      const handleMouseLeave = () => {
        // Reset the transform when mouse leaves
        profileElement.style.transform = `translateY(${profileElement.style.getPropertyValue('--float-offset') || '0px'})`;
      };
      
      profileElement.addEventListener('mouseleave', handleMouseLeave);
      
      return { handleMouseLeave };
    };
    
    // Setup for desktop and mobile
    const desktopHandlers = setupInteractiveEffect(profileRefDesktop.current);
    const mobileHandlers = setupInteractiveEffect(profileRefMobile.current);
    
    // Update float animation for both
    let floatOffset = 0;
    const updateFloat = () => {
      floatOffset = Math.sin(Date.now() / 1000) * 10;
      
      const updateProfileFloat = (profileElement: HTMLDivElement | null) => {
        if (!profileElement) return;
        
        profileElement.style.setProperty('--float-offset', `${floatOffset}px`);
        
        if (profileElement.style.transform.includes('perspective')) {
          // Keep the tilt if it exists
        } else {
          profileElement.style.transform = `translateY(${floatOffset}px)`;
        }
      };
      
      updateProfileFloat(profileRefDesktop.current);
      updateProfileFloat(profileRefMobile.current);
      
      requestAnimationFrame(updateFloat);
    };
    
    const animationId = requestAnimationFrame(updateFloat);
    
    // Add mouse move listener to document
    const handleMouseMove = (e: MouseEvent) => {
      if (profileRefDesktop.current) {
        const rect = profileRefDesktop.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distX = (e.clientX - centerX) / 20;
        const distY = (e.clientY - centerY) / 20;
        
        // Limit the tilt effect
        const maxTilt = 10;
        const tiltX = Math.max(-maxTilt, Math.min(maxTilt, distY));
        const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -distX));
        
        // Apply the tilt effect
        profileRefDesktop.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${profileRefDesktop.current.style.getPropertyValue('--float-offset') || '0px'})`;
      }
      
      if (profileRefMobile.current) {
        const rect = profileRefMobile.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distX = (e.clientX - centerX) / 20;
        const distY = (e.clientY - centerY) / 20;
        
        // Limit the tilt effect
        const maxTilt = 10;
        const tiltX = Math.max(-maxTilt, Math.min(maxTilt, distY));
        const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -distX));
        
        // Apply the tilt effect
        profileRefMobile.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${profileRefMobile.current.style.getPropertyValue('--float-offset') || '0px'})`;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (profileRefDesktop.current && desktopHandlers) {
        profileRefDesktop.current.removeEventListener('mouseleave', desktopHandlers.handleMouseLeave);
      }
      
      if (profileRefMobile.current && mobileHandlers) {
        profileRefMobile.current.removeEventListener('mouseleave', mobileHandlers.handleMouseLeave);
      }
      
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Tech stack data with icons
  const techStack = [
    { 
      name: 'JavaScript', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    { 
      name: 'TypeScript', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    { 
      name: 'TailwindCSS',
      icon: 'https://w7.pngwing.com/pngs/293/485/png-transparent-tailwind-css-hd-logo.png'
    },
    { 
      name: 'React', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    { 
      name: 'Next.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    },
    { 
      name: 'Node.js', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    { 
      name: 'Python', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    { 
      name: 'Django', 
      icon: 'https://w7.pngwing.com/pngs/10/113/png-transparent-django-web-development-web-framework-python-software-framework-django-text-trademark-logo.png'
    },
    { 
      name: 'PostgreSQL', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    },
    { 
      name: 'MongoDB', 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    { 
      name: 'Supabase', 
      icon: 'https://logowik.com/content/uploads/images/supabase-icon1721342077.logowik.com.webp'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Circle for Mobile - Shown only on mobile */}
          <div className="relative order-1 md:hidden w-full flex justify-center mb-8">
            <div className="profile-glow"></div>
            <div 
              ref={profileRefMobile}
              className="w-[220px] h-[220px] mx-auto profile-circle relative"
            >
              <div ref={dashedBorderRefMobile} className="dashed-border absolute inset-0"></div>
              <div ref={particlesRefMobile} className="particles absolute inset-0"></div>
              <img 
                src="/Dagi.png"
                alt="Professional headshot"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="animate-fade-in space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <h2 className="text-lg font-mono text-[#00ff9d]">Full Stack Developer</h2>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hi, I'm 
                <span className="gradient-text" style={{ whiteSpace: "pre" }}> DAGIM</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                Passionate about building exceptional web applications with modern technologies.
                Specializing in full-stack development with React, Node.js, and cloud technologies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button 
                onClick={handleDownloadCV}
                className="group flex items-center gap-2 bg-[#00ff9d] text-black px-6 py-3 rounded-full hover:bg-[#00cc7d] transition-all duration-300"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                Download CV
              </button>
              <div className="flex gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300 hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:your.email@example.com"
                  className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300 hover:scale-110"
                  aria-label="Email Contact"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Circle for Desktop - Hidden on mobile */}
          <div className="relative hidden md:block order-2">
            <div className="profile-glow"></div>
            <div 
              ref={profileRefDesktop}
              className="w-[400px] h-[400px] mx-auto profile-circle relative"
            >
              <div ref={dashedBorderRefDesktop} className="dashed-border absolute inset-0"></div>
              <div ref={particlesRefDesktop} className="particles absolute inset-0"></div>
              <img 
                src="/Dagi.png"
                alt="Professional headshot"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#00ff9d]">{yearsCount}</h3>
            <p className="text-gray-400">Years of Experience</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#00ff9d]">{projectsCount}</h3>
            <p className="text-gray-400">Projects on GitHub</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#00ff9d]">{feedbackCount}%</h3>
            <p className="text-gray-400">Positive feedback</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#00ff9d]">{completedCount}%</h3>
            <p className="text-gray-400">Projects completed</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section with Beautiful Background */}
      <section className="py-24 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1922] to-[#0a0a0a] opacity-90"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
          
          {/* Animated Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00ff9d] opacity-10 blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#00ccff] opacity-10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 inline-block relative">
              <span className="relative z-10">Areas of </span>
              <span className="relative z-10 gradient-text">Expertise</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00ff9d] to-transparent"></span>
            </h2>
            <p className="text-gray-300 text-center text-lg max-w-3xl mx-auto mt-6">
              Making Magic Happen With Cutting Edge Technologies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div 
                key={tech.name}
                className="bg-[#111a22]/80 backdrop-blur-sm p-8 rounded-xl text-center animate-fade-in hover:scale-105 transition-all duration-300 flex flex-col items-center gap-4 border border-gray-800/50 hover:border-[#00ff9d]/30 hover:shadow-[0_0_15px_rgba(0,255,157,0.15)] group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 flex items-center justify-center p-4 rounded-full bg-[#0a1017] group-hover:bg-gradient-to-br group-hover:from-[#0a1017] group-hover:to-[#0f2027] transition-all duration-300 mb-2">
                  <img 
                    src={tech.icon} 
                    alt={`${tech.name} logo`} 
                    className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-[#00ff9d] font-mono text-lg group-hover:text-white transition-colors duration-300">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#00ff9d]/10 to-[#00ccff]/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            I'm currently available for freelance work or full-time positions.
            If you're interested in working together, let's connect!
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-[#00ff9d] text-black px-8 py-4 rounded-full hover:bg-[#00cc7d] transition-colors font-medium text-lg"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}
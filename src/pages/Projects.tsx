import { Github, ExternalLink, Code } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Define project types
type ProjectCategory = 'All' | 'Web Development' | 'Mobile Apps' | 'UI/UX Design';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: ProjectCategory[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export default function Projects() {
  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "DESSALEGN WOLDEYESUSS AUTHORIZED ACCOUNTANT AND CONSULTING",
      description: "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
      image: "/DW.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: ["All", "Web Development"],
      githubUrl: "https://github.com/DagimDana/DW-Audit-Consult",
      liveUrl: "https://dwauditcom.vercel.app/",
      featured: true
    },
    {
      id: 2,
      title: " Marefiya - Find a home",
      description: "Marefiya (ማረፍያ) is a full-stack platform designed to make property searching and listing more efficient and user-friendly. It allows users to search, filter, and save properties based on their preferences, making it easier to find suitable options.",
      image: "/Marr.webp",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      category: ["All", "Web Development"],
      liveUrl: "https://marefiya.vercel.app/",
      featured: true
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern portfolio website showcasing my projects and skills with a clean, responsive design.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      category: ["All", "Web Development", "UI/UX Design"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: false
    }
  ];

  const categories: ProjectCategory[] = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design'];
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = projects.filter(project => 
    project.category.includes(activeCategory)
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Projects Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Here's a selection of projects I've worked on. Each project represents a unique challenge
            and showcases different aspects of my technical skills and problem-solving abilities.
          </p>
        </div>
      </section>

      {/* All Projects */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8">
          All <span className="gradient-text">Projects</span>
        </h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-[#00ff9d] text-black'
                  : 'bg-[#1a1a1a] text-white hover:bg-[#00ff9d]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link 
  to={`/projects/${project.id}`} 
  className="block"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-[#00ff9d]/10 text-[#00ff9d] rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="px-6 pb-6">
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Stats */}
      <section className="container mx-auto px-6 py-20 bg-[#0f0f0f]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2 animate-fade-in">
            <div className="flex justify-center">
              <Code className="w-8 h-8 text-[#00ff9d]" />
            </div>
            <h3 className="text-3xl font-bold text-white">50+</h3>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-center">
              <Github className="w-8 h-8 text-[#00ff9d]" />
            </div>
            <h3 className="text-3xl font-bold text-white">1000+</h3>
            <p className="text-gray-400">Commits</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-center">
              <ExternalLink className="w-8 h-8 text-[#00ff9d]" />
            </div>
            <h3 className="text-3xl font-bold text-white">20+</h3>
            <p className="text-gray-400">Live Websites</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00ff9d]">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white">15+</h3>
            <p className="text-gray-400">UI/UX Designs</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#00ff9d]/10 to-[#00ccff]/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            I'm always looking for new and exciting projects to work on. If you have an idea or a project that needs development expertise, let's discuss how we can bring it to life.
          </p>
          <Link 
            to="/contact"
            className="bg-[#00ff9d] text-black px-8 py-4 rounded-full hover:bg-[#00cc7d] transition-colors font-medium text-lg inline-block"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}



// import { Github, ExternalLink, Code } from 'lucide-react';
// import { useState } from 'react';

// // Define project types
// type ProjectCategory = 'All' | 'Web Development' | 'Mobile Apps' | 'UI/UX Design';

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   technologies: string[];
//   category: ProjectCategory[];
//   githubUrl?: string;
//   liveUrl?: string;
//   featured: boolean;
// }

// export default function Projects() {
//   // Sample projects data
//   const projects: Project[] = [
//     {
//       id: 1,
//       title: "DESSALEGN WOLDEYESUSS AUTHORIZED ACCOUNTANT AND CONSULTING",
//       description: "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
//       image: "/DW.png",
//       technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//       category: ["All", "Web Development"],
//       githubUrl: "https://github.com/DagimDana/DW-Audit-Consult",
//       liveUrl: "https://dwauditcom.vercel.app/",
//       featured: true
//     },
//     {
//       id: 2,
//       title: " Marefiya - Find a home",
//       description: "Marefiya (ማረፍያ) is a full-stack platform designed to make property searching and listing more efficient and user-friendly. It allows users to search, filter, and save properties based on their preferences, making it easier to find suitable options. For homeowners, the platform provides a streamlined process to list properties, ensuring they can reach potential renters or buyers with minimal effort. Marefiya combines intuitive design with powerful features, creating an organized space where property seekers and owners can connect. With its range of tools, the platform addresses the challenges of navigating the real estate market, offering a simplified solution for both sides.",
//       image: "/Marr.webp",
//       technologies: ["React", "Firebase", "Tailwind CSS"],
//       category: ["All", "Web Development"],
//       // githubUrl: "https://github.com",
//       liveUrl: "https://marefiya.vercel.app/",
//       featured: true
//     },
//     // {
//     //   id: 3,
//     //   title: "Fitness Tracker Mobile App",
//     //   description: "A mobile application for tracking workouts, nutrition, and fitness progress with personalized recommendations.",
//     //   image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//     //   technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
//     //   category: ["All", "Mobile Apps"],
//     //   githubUrl: "https://github.com",
//     //   featured: false
//     // },
//     {
//       id: 4,
//       title: "Portfolio Website",
//       description: "A modern portfolio website showcasing my projects and skills with a clean, responsive design.",
//       image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//       technologies: ["React", "Next.js", "Tailwind CSS"],
//       category: ["All", "Web Development", "UI/UX Design"],
//       githubUrl: "https://github.com",
//       liveUrl: "https://example.com",
//       featured: false
//     },
//     // {
//     //   id: 5,
//     //   title: "Weather Dashboard",
//     //   description: "A weather dashboard that displays current and forecasted weather data with interactive visualizations.",
//     //   image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//     //   technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
//     //   category: ["All", "Web Development"],
//     //   githubUrl: "https://github.com",
//     //   liveUrl: "https://example.com",
//     //   featured: false
//     // },
//     // {
//     //   id: 6,
//     //   title: "Restaurant Booking System",
//     //   description: "An online reservation system for restaurants with table management and customer notifications.",
//     //   image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//     //   technologies: ["React", "Node.js", "PostgreSQL", "Twilio API"],
//     //   category: ["All", "Web Development"],
//     //   githubUrl: "https://github.com",
//     //   liveUrl: "https://example.com",
//     //   featured: true
//     // }
//   ];

//   const categories: ProjectCategory[] = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design'];
//   const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

//   const filteredProjects = projects.filter(project => 
//     project.category.includes(activeCategory)
//   );

//   return (
//     <div className="min-h-screen pt-20">
//       {/* Projects Hero Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">
//             My <span className="gradient-text">Projects</span>
//           </h1>
//           <p className="text-gray-400 text-lg leading-relaxed">
//             Here's a selection of projects I've worked on. Each project represents a unique challenge
//             and showcases different aspects of my technical skills and problem-solving abilities.
//           </p>
//         </div>
//       </section>

//       {/* Featured Projects */}
//       {/* <section className="container mx-auto px-6 py-10">
//         <h2 className="text-3xl font-bold mb-12">
//           Featured <span className="gradient-text">Work</span>
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.filter(project => project.featured).map((project, index) => (
//             <div 
//               key={project.id}
//               className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="h-48 overflow-hidden">
//                 <img 
//                   src={project.image} 
//                   alt={project.title}
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//                 <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.technologies.map((tech, techIndex) => (
//                     <span
//                       key={techIndex}
//                       className="px-2 py-1 bg-[#00ff9d]/10 text-[#00ff9d] rounded-full text-xs"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-3">
//                   {project.githubUrl && (
//                     <a 
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 rounded-full border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors"
//                       aria-label={`GitHub repository for ${project.title}`}
//                     >
//                       <Github size={18} />
//                     </a>
//                   )}
//                   {project.liveUrl && (
//                     <a 
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 rounded-full border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors"
//                       aria-label={`Live demo for ${project.title}`}
//                     >
//                       <ExternalLink size={18} />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section> */}

//       {/* All Projects */}
//       <section className="container mx-auto px-6 py-20">
//         <h2 className="text-3xl font-bold mb-8">
//           All <span className="gradient-text">Projects</span>
//         </h2>
        
//         {/* Category Filter */}
//         <div className="flex flex-wrap gap-4 mb-12">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-6 py-2 rounded-full transition-colors ${
//                 activeCategory === category
//                   ? 'bg-[#00ff9d] text-black'
//                   : 'bg-[#1a1a1a] text-white hover:bg-[#00ff9d]/20'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
        
//         {/* Projects Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project, index) => (
//             <div 
//               key={project.id}
//               className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="h-48 overflow-hidden">
//                 <img 
//                   src={project.image} 
//                   alt={project.title}
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//                 <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.technologies.map((tech, techIndex) => (
//                     <span
//                       key={techIndex}
//                       className="px-2 py-1 bg-[#00ff9d]/10 text-[#00ff9d] rounded-full text-xs"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-3">
//                   {project.githubUrl && (
//                     <a 
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 rounded-full border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors"
//                       aria-label={`GitHub repository for ${project.title}`}
//                     >
//                       <Github size={18} />
//                     </a>
//                   )}
//                   {project.liveUrl && (
//                     <a 
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 rounded-full border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors"
//                       aria-label={`Live demo for ${project.title}`}
//                     >
//                       <ExternalLink size={18} />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Project Stats */}
//       <section className="container mx-auto px-6 py-20 bg-[#0f0f0f]">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//           <div className="text-center space-y-2 animate-fade-in">
//             <div className="flex justify-center">
//               <Code className="w-8 h-8 text-[#00ff9d]" />
//             </div>
//             <h3 className="text-3xl font-bold text-white">50+</h3>
//             <p className="text-gray-400">Projects Completed</p>
//           </div>
//           <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
//             <div className="flex justify-center">
//               <Github className="w-8 h-8 text-[#00ff9d]" />
//             </div>
//             <h3 className="text-3xl font-bold text-white">1000+</h3>
//             <p className="text-gray-400">Commits</p>
//           </div>
//           <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
//             <div className="flex justify-center">
//               <ExternalLink className="w-8 h-8 text-[#00ff9d]" />
//             </div>
//             <h3 className="text-3xl font-bold text-white">20+</h3>
//             <p className="text-gray-400">Live Websites</p>
//           </div>
//           <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
//             <div className="flex justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00ff9d]">
//                 <path d="M12 20h9"></path>
//                 <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
//               </svg>
//             </div>
//             <h3 className="text-3xl font-bold text-white">15+</h3>
//             <p className="text-gray-400">UI/UX Designs</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="bg-gradient-to-r from-[#00ff9d]/10 to-[#00ccff]/10 rounded-2xl p-12 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Have a Project in Mind?
//           </h2>
//           <p className="text-gray-400 max-w-2xl mx-auto mb-8">
//             I'm always looking for new and exciting projects to work on. If you have an idea or a project that needs development expertise, let's discuss how we can bring it to life.
//           </p>
//           <button 
//             onClick={() => window.location.href = '/contact'}
//             className="bg-[#00ff9d] text-black px-8 py-4 rounded-full hover:bg-[#00cc7d] transition-colors font-medium text-lg"
//           >
//             Get In Touch
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }
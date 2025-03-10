import { useParams } from 'react-router-dom';
import { Github, ExternalLink, Clock, Tag } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string[];
  image: string;
  images: string[];
  technologies: string[];
  additionalTools?: string[];
  category: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  objective: string;
  details: string[];
  startDate: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "DESSALEGN WOLDEYESUSS AUTHORIZED ACCOUNTANT AND CONSULTING",
    description: [
      "Name: Marefiya - Find a home",
      "Type: Full-stack Web app",
      "Website: https://marefiya.vercel.app"
    ],
    image: "/DW.png",
    images: [
      "/DW.png",
      "/Da1.png",
      "/Da2.png",
      "/Da3.png"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    additionalTools: ["VS Code", "Git", "Postman"],
    category: ["All", "Web Development"],
    githubUrl: "https://github.com/DagimDana/DW-Audit-Consult",
    liveUrl: "https://dwauditcom.vercel.app/",
    featured: true,
    objective: "To create a professional and user-friendly website for an authorized accountant and consulting firm, showcasing their services and expertise while providing easy access to information for potential clients.",
    details: [
      "Implemented responsive design for optimal viewing across all devices",
      "Created an intuitive navigation system for easy access to different services",
      "Integrated contact forms for client inquiries",
      "Optimized website performance and loading speed",
      "Implemented SEO best practices for better visibility"
    ],
    startDate: "2023-09"
  },
  {
    id: 2,
    title: "Marefiya - Find a home",
    description: [
      "Name: Marefiya - Find a home",
      "Type: Full-stack Web app",
      "Website: https://marefiya.vercel.app"
    ],
    image: "/Marr.webp",
    images: [
      "/Marr.webp",
      "/Mar1.webp",
      "/Mar2.webp"
    ],
    technologies: ["Next.js", "TailwindCSS", "Postgresql", "Drizzle", "Git", "Figma" ],
    category: ["All", "Web Development"],
    liveUrl: "https://marefiya.vercel.app/",
    featured: true,
    objective: "The objective of Marefiya was to improve my practical knowledege of Next.js on a large scale project. I was also experimenting with new technologies like Algolia Search, Redis and others.",
    details: [
      "Marefiya (ማረፍያ) is a full-stack platform designed to make property searching and listing more efficient and user-friendly. It allows users to search, filter, and save properties based on their preferences, making it easier to find suitable options. For homeowners, the platform provides a streamlined process to list properties, ensuring they can reach potential renters or buyers with minimal effort. Marefiya combines intuitive design with powerful features, creating an organized space where property seekers and owners can connect. With its range of tools, the platform addresses the challenges of navigating the real estate market, offering a simplified solution for both sides.",
      "At the core of Marefiya’s functionality are several cutting-edge features. It offers full authentication options, allowing users to sign in with credentials or OAuth, powered by NextAuth. The platform's search and filtering capabilities are enhanced with Algolia Search, providing fast and accurate results. Marefiya also includes real-time chat functionality using Redis and Pusher, ensuring smooth communication between users and property owners. Interactive geolocation filtering is made possible with React Leaflet, allowing users to find properties based on their preferred location visually. For homeowners and property managers, comprehensive analytics are displayed through Recharts, providing insights into property views and engagement. These features, along with many others, make Marefiya a powerful tool for anyone involved in property searching or listing."
    ],
    startDate: "2023-11"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:[
      "Name: Dagim-projects",
      "Type: Full-stack Web app",
      "Website: https://marefiya.vercel.app"
    ],
    image: "/p1.png",
    images: [
      "/p1.png",
      "/p2.png",
      "/p3.png"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    category: ["All", "Web Development", "UI/UX Design"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    objective: "To create a personal portfolio that effectively showcases my work, skills, and professional journey in web development.",
    details: [
      "Designed and implemented a modern, minimalist interface",
      "Created interactive project showcases",
      "Integrated a contact form for potential clients",
      "Optimized for performance and SEO",
      "Implemented responsive design principles"
    ],
    startDate: "2024-01"
  }
];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
  }

  const allTools = [
    ...project.technologies,
    ...(project.additionalTools || [])
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          {/* Title and Links Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            <div className="flex gap-4 md:mt-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1a1a1a] text-white hover:text-[#00ff9d] px-4 py-2 rounded-full transition-colors"
                >
                  <Github size={20} />
                  <span className="inline">Github</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1a1a1a] text-white hover:text-[#00ff9d] px-4 py-2 rounded-full transition-colors"
                >
                  <ExternalLink size={20} />
                  <span className="inline">Demo</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#00ff9d]/10 text-[#00ff9d] rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Images Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {project.images.map((image, index) => (
            <div 
              key={index} 
              className={`rounded-xl overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              <img 
                src={image} 
                alt={`${project.title} - View ${index + 1}`}
                className="w-full h-full object-cover aspect-video"
              />
            </div>
          ))}
        </div>

        {/* Project Info */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Left Column */}
            <div>
              {/* About Project */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About Project</h2>
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
              </section>

              {/* Objective */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Objective</h2>
                <p className="text-gray-400 leading-relaxed">{project.objective}</p>
              </section>

              {/* Tools & Technologies */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tools & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {allTools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#1a1a1a] text-gray-300 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div>
              {/* Project Info */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Info</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={20} />
                    <span>Started: {new Date(project.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Tag size={20} />
                    <span>Category: {project.category.filter(cat => cat !== 'All').join(', ')}</span>
                  </div>
                </div>
              </section>

              {/* Details */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  {project.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}













// import { useParams } from 'react-router-dom';
// import { Github, ExternalLink, Clock, Tag } from 'lucide-react';

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   images: string[];
//   technologies: string[];
//   category: string[];
//   githubUrl?: string;
//   liveUrl?: string;
//   featured: boolean;
//   objective: string;
//   details: string[];
//   startDate: string;
// }

// const projects: Project[] = [
//   {
//     id: 1,
//     title: "DESSALEGN WOLDEYESUSS AUTHORIZED ACCOUNTANT AND CONSULTING",
//     description: "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
//     image: "/DW.png",
//     images: [
//       "/DW.png",
//       "/Da1.png",
//       "/Da2.png",
//       "/Da3.png"
//     ],
//     technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//     category: ["All", "Web Development"],
//     githubUrl: "https://github.com/DagimDana/DW-Audit-Consult",
//     liveUrl: "https://dwauditcom.vercel.app/",
//     featured: true,
//     objective: "To create a professional and user-friendly website for an authorized accountant and consulting firm, showcasing their services and expertise while providing easy access to information for potential clients.",
//     details: [
//       "Implemented responsive design for optimal viewing across all devices",
//       "Created an intuitive navigation system for easy access to different services",
//       "Integrated contact forms for client inquiries",
//       "Optimized website performance and loading speed",
//       "Implemented SEO best practices for better visibility"
//     ],
//     startDate: "2023-09"
//   },
//   {
//     id: 2,
//     title: "Marefiya - Find a home",
//     description: "Marefiya (ማረፍያ) is a full-stack platform designed to make property searching and listing more efficient and user-friendly.",
//     image: "/Marr.webp",
//     images: [
//       "/Marr.webp",
//       "/Mar1.webp",
//       "/Mar2.webp"
//     ],
//     technologies: ["React", "Firebase", "Tailwind CSS"],
//     category: ["All", "Web Development"],
//     liveUrl: "https://marefiya.vercel.app/",
//     featured: true,
//     objective: "To develop a comprehensive property search and listing platform that simplifies the process of finding and listing properties in Ethiopia.",
//     details: [
//       "Built a robust search functionality with multiple filtering options",
//       "Implemented user authentication and profile management",
//       "Created an intuitive property listing interface",
//       "Integrated real-time updates for property status",
//       "Developed a responsive design for mobile-first experience"
//     ],
//     startDate: "2023-11"
//   },
//   {
//     id: 4,
//     title: "Portfolio Website",
//     description: "A modern portfolio website showcasing my projects and skills with a clean, responsive design.",
//     image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=2066&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop"
//     ],
//     technologies: ["React", "Next.js", "Tailwind CSS"],
//     category: ["All", "Web Development", "UI/UX Design"],
//     githubUrl: "https://github.com",
//     liveUrl: "https://example.com",
//     featured: false,
//     objective: "To create a personal portfolio that effectively showcases my work, skills, and professional journey in web development.",
//     details: [
//       "Designed and implemented a modern, minimalist interface",
//       "Created interactive project showcases",
//       "Integrated a contact form for potential clients",
//       "Optimized for performance and SEO",
//       "Implemented responsive design principles"
//     ],
//     startDate: "2024-01"
//   }
// ];

// export default function ProjectDetail() {
//   const { id } = useParams();
//   const project = projects.find(p => p.id === Number(id));

//   if (!project) {
//     return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
//   }

//   return (
//     <div className="min-h-screen pt-20">
//       <div className="container mx-auto px-6 py-12">
//         {/* Hero Section */}
//         <div className="max-w-4xl mx-auto">
//           <div className="flex justify-between items-start mb-8">
//             <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
//             <div className="flex gap-4">
//               {project.githubUrl && (
//                 <a
//                   href={project.githubUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 bg-[#1a1a1a] text-white hover:text-[#00ff9d] px-4 py-2 rounded-full transition-colors"
//                 >
//                   <Github size={20} />
//                   <span className="hidden md:inline">Github</span>
//                 </a>
//               )}
//               {project.liveUrl && (
//                 <a
//                   href={project.liveUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 bg-[#1a1a1a] text-white hover:text-[#00ff9d] px-4 py-2 rounded-full transition-colors"
//                 >
//                   <ExternalLink size={20} />
//                   <span className="hidden md:inline">Demo</span>
//                 </a>
//               )}
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-4 mb-8">
//             {project.technologies.map((tech, index) => (
//               <span
//                 key={index}
//                 className="px-3 py-1 bg-[#00ff9d]/10 text-[#00ff9d] rounded-full text-sm"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Project Images Grid */}
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//           {project.images.map((image, index) => (
//             <div 
//               key={index} 
//               className={`rounded-xl overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}
//             >
//               <img 
//                 src={image} 
//                 alt={`${project.title} - View ${index + 1}`}
//                 className="w-full h-full object-cover aspect-video"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Project Info */}
//         <div className="max-w-4xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//             {/* Left Column */}
//             <div>
//               {/* About Project */}
//               <section className="mb-8">
//                 <h2 className="text-2xl font-bold mb-4">About Project</h2>
//                 <p className="text-gray-400 leading-relaxed">{project.description}</p>
//               </section>

//                 {/* Objective */}
//               <section className="mb-8">
//                 <h2 className="text-2xl font-bold mb-4">Objective</h2>
//                 <p className="text-gray-400 leading-relaxed">{project.objective}</p>
//               </section>

//               {/* Tools & Technologies */}
//               <section className="mb-8">
//                 <h2 className="text-2xl font-bold mb-4">Tools & Technologies</h2>
//                 <div className="flex flex-wrap gap-2">
//                   {project.technologies.map((tech, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-[#1a1a1a] text-gray-300 rounded-full text-sm"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </section>
//             </div>

//             {/* Right Column */}
//             <div>

//             {/* Project Info */}
//             <section className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Project Info</h2>
//             <div className="space-y-3">
//             <div className="flex items-center gap-2 text-gray-400">
//               <Clock size={20} />
//               <span>Started: {new Date(project.startDate).toLocaleDateString('en-US', { 
//                 year: 'numeric',
//                 month: 'long'
//               })}</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-400">
//               <Tag size={20} />
//               <span>Category: {project.category.filter(cat => cat !== 'All').join(', ')}</span>
//             </div>
//             </div>
//             </section>

//             {/* Details */}
//             <section>
//               <h2 className="text-2xl font-bold mb-4">Details</h2>
//               <ul className="list-disc list-inside text-gray-400 space-y-2">
//                 {project.details.map((detail, index) => (
//                   <li key={index}>{detail}</li>
//                 ))}
//               </ul>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }

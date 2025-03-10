import { Code, Database, Server,} from 'lucide-react';

export default function About() {
  const skills = [
    {
      icon: <Code className="w-6 h-6 text-[#00ff9d]" />,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      icon: <Server className="w-6 h-6 text-[#00ff9d]" />,
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs with Node.js and Python.",
      technologies: ["Node.js", "Express", "Python", "Django"]
    },
    {
      icon: <Database className="w-6 h-6 text-[#00ff9d]" />,
      title: "Database Management",
      description: "Designing and optimizing database structures for scalable applications.",
      technologies: ["PostgreSQL", "MongoDB", "Supabase", "MySQL"]
    },
    // {
    //   icon: <Globe className="w-6 h-6 text-[#00ff9d]" />,
    //   title: "Web Technologies",
    //   description: "Implementing modern web standards and best practices for optimal performance.",
    //   technologies: ["HTML5", "CSS3", "JavaScript", "WebSockets"]
    // },
    // {
    //   icon: <Sparkles className="w-6 h-6 text-[#00ff9d]" />,
    //   title: "UI/UX Design",
    //   description: "Creating intuitive and beautiful user interfaces with attention to detail.",
    //   technologies: ["Figma", "Adobe XD", "Responsive Design", "Animation"]
    // },
    // {
    //   icon: <Zap className="w-6 h-6 text-[#00ff9d]" />,
    //   title: "DevOps",
    //   description: "Setting up CI/CD pipelines and managing cloud infrastructure.",
    //   technologies: ["Docker", "AWS", "GitHub Actions", "Kubernetes"]
    // }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* About Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="relative z-10">About </span>
          <span className="relative z-10 gradient-text">Me</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
          Hi, I’m Dagim, a computer engineering graduate with several years of experience in web development, specializing in React.js and more recently, Next.js. I also have strong proficiency with the MERN stack and Django. I’m always eager to learn new technologies and take on exciting projects to further expand my skill set.

I'm also interested in AI, specially the recent developments in the field of LLMs. I like to experiment with the recent text and image generation models. I also dabble a little in hardware.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <div className="px-6 py-3 bg-[#1a1a1a] rounded-full">
              <span className="text-[#00ff9d] font-mono">2 Years Experience</span>
            </div>
            <div className="px-6 py-3 bg-[#1a1a1a] rounded-full">
              <span className="text-[#00ff9d] font-mono">2 Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-6 py-20 bg-[#0f0f0f]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Technical <span className="gradient-text">Expertise</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                {skill.icon}
                <h3 className="text-xl font-bold">{skill.title}</h3>
              </div>
              <p className="text-gray-400 mb-4">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-[#00ff9d]/10 text-[#00ff9d] rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            My <span className="gradient-text">Journey</span>
          </h2>
          <div className="space-y-12">
            <div className="bg-[#1a1a1a] p-8 rounded-xl animate-fade-in">
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#00ff9d] font-mono">2019 - 2024</p>
                  <p className="font-bold">BSc in Computer Engineering</p>
                  <p className="text-gray-400">Arba Minch University</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] p-8 rounded-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold mb-4">Work Experience</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[#00ff9d] font-mono">2023 - 2024</p>
                  <p className="font-bold">Space Science and Geospatial Institute</p>
                  <p className="text-gray-400">Software Engineer</p>
                </div>
                {/* <div>
                  <p className="text-[#00ff9d] font-mono">2020 - 2022</p>
                  <p className="font-bold">Full Stack Developer</p>
                  <p className="text-gray-400">Digital Solutions Ltd.</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#00ff9d]/10 to-[#00ccff]/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interested in Working Together?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          
        <button 
          onClick={() => window.location.href = '/contact'}
          className="bg-[#00ff9d] text-black px-8 py-4 rounded-full hover:bg-[#00cc7d] transition-colors font-medium text-lg"
        >
          Let's Connect
        </button>
        </div>
      </section>
    </div>
  );
}

import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setSubmitStatus({
        success: true,
        message: "Thank you! We'll get back to you soon."
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "Failed to send message"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Contact Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 inline-block relative">
          <span className="relative z-10">Get In </span>
          <span className="relative z-10 gradient-text">Touch</span>
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00ff9d] to-transparent"></span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            I'm always interested in hearing about new projects, opportunities, or just connecting with fellow developers.
            Feel free to reach out using the form below or through my social media channels.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#1a1a1a] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-[#00ff9d]/10 rounded-full">
                <Mail className="w-6 h-6 text-[#00ff9d]" />
              </div>
              <h3 className="text-xl font-bold">Email</h3>
              <a href="mailto:dagimdana1@gmail.com" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                dagimdana1@gmail.com
              </a>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-[#00ff9d]/10 rounded-full">
                <Phone className="w-6 h-6 text-[#00ff9d]" />
              </div>
              <h3 className="text-xl font-bold">Phone</h3>
              <a href="tel:+251925546881" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
                +251925546881
              </a>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-[#00ff9d]/10 rounded-full">
                <MapPin className="w-6 h-6 text-[#00ff9d]" />
              </div>
              <h3 className="text-xl font-bold">Location</h3>
              <p className="text-gray-400">
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-3xl font-bold mb-6">
                Let's <span className="gradient-text">Connect</span>
              </h2>
              <p className="text-gray-400 mb-8">
                Whether you have a question about my services, want to discuss a potential project, 
                or just want to say hello, I'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
                    <Github size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">GitHub</h3>
                    <a 
                      href="https://github.com/DagimDana/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      Connect on GitHub
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/dagim-dana/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
                    <Twitter size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Twitter</h3>
                    <a 
                      href="https://twitter.com/dagim_dana" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      Connect on Twitter
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Instagram</h3>
                    <a 
                      href="https://instagram.com/dagim_dana" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      Connect on Instagram
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <a 
                      href="mailto:dagimdana1@gmail.com" 
                      className="text-gray-400 hover:text-[#00ff9d] transition-colors"
                    >
                      Connect on Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1a1a] p-8 rounded-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
                    placeholder="Alex Hailu"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
                    placeholder="Alex@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
                    placeholder="Hello, I'd like to discuss a project..."
                  ></textarea>
                </div>
                
                {submitStatus && (
                  <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00ff9d] text-black px-6 py-4 rounded-lg hover:bg-[#00cc7d] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-[#1a1a1a] p-4 rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="aspect-video w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126766.39636748476!2d38.68703422560553!3d9.010793900000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1716232345678!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Location Map - Addis Ababa, Ethiopia"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#00ff9d]/10 to-[#00ccff]/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            I'm currently available for freelance work and full-time positions.
            Let's create something amazing together!
          </p>
          <button 
            onClick={() => window.location.href = 'mailto:dagimdana1@gmail.com'}
            className="bg-[#00ff9d] text-black px-8 py-4 rounded-full hover:bg-[#00cc7d] transition-colors font-medium text-lg"
          >
            Hire Me Now
          </button>
        </div>
      </section>
    </div>
  );
}

// import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
// import { useState } from 'react';

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<{
//     success: boolean;
//     message: string;
//   } | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitStatus({
//         success: true,
//         message: "Thank you! Your message has been sent successfully."
//       });
      
//       // Reset form after successful submission
//       setFormData({
//         name: '',
//         email: '',
//         subject: '',
//         message: ''
//       });
      
//       // Clear success message after 5 seconds
//       setTimeout(() => {
//         setSubmitStatus(null);
//       }, 5000);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen pt-20">
//       {/* Contact Hero Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">
//             Get In <span className="gradient-text">Touch</span>
//           </h1>
//           <p className="text-gray-400 text-lg leading-relaxed">
//             I'm always interested in hearing about new projects, opportunities, or just connecting with fellow developers.
//             Feel free to reach out using the form below or through my social media channels.
//           </p>
//         </div>
//       </section>

//       {/* Contact Information */}
//       <section className="container mx-auto px-6 py-10">
//         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           <div className="bg-[#1a1a1a] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in">
//             <div className="flex flex-col items-center text-center gap-4">
//               <div className="p-4 bg-[#00ff9d]/10 rounded-full">
//                 <Mail className="w-6 h-6 text-[#00ff9d]" />
//               </div>
//               <h3 className="text-xl font-bold">Email</h3>
//               <a href="mailto:dagimdana1@gmail.com" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
//                 dagimdana1@gmail.com
//               </a>
//             </div>
//           </div>
          
//           <div className="bg-[#1a1a1a] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
//             <div className="flex flex-col items-center text-center gap-4">
//               <div className="p-4 bg-[#00ff9d]/10 rounded-full">
//                 <Phone className="w-6 h-6 text-[#00ff9d]" />
//               </div>
//               <h3 className="text-xl font-bold">Phone</h3>
//               <a href="tel:+1234567890" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
//               +251925546881
//               </a>
//             </div>
//           </div>
          
//           <div className="bg-[#1a1a1a] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
//             <div className="flex flex-col items-center text-center gap-4">
//               <div className="p-4 bg-[#00ff9d]/10 rounded-full">
//                 <MapPin className="w-6 h-6 text-[#00ff9d]" />
//               </div>
//               <h3 className="text-xl font-bold">Location</h3>
//               <p className="text-gray-400">
//                 Addis Ababa, Ethiopia
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12">
//             <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
//               <h2 className="text-3xl font-bold mb-6">
//                 Let's <span className="gradient-text">Connect</span>
//               </h2>
//               <p className="text-gray-400 mb-8">
//                 Whether you have a question about my services, want to discuss a potential project, 
//                 or just want to say hello, I'd love to hear from you.
//               </p>
              
//               <div className="space-y-6">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
//                     <Github size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold">GitHub</h3>
//                     <a 
//                       href="https://github.com/DagimDana/" 
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-gray-400 hover:text-[#00ff9d] transition-colors"
//                     >
//                       Connect on GitHub
//                     </a>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
//                     <Linkedin size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold">LinkedIn</h3>
//                     <a 
//                       href="https://www.linkedin.com/in/dagim-dana/" 
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-gray-400 hover:text-[#00ff9d] transition-colors"
//                     >
//                       Connect on LinkedIn
//                     </a>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
//                     <Twitter size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold">Twitter</h3>
//                     <a 
//                       href="https://twitter.com/dagim_dana" 
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-gray-400 hover:text-[#00ff9d] transition-colors"
//                     >
//                       Connect on Twitter
//                     </a>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
//                     <Instagram size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold">Instagram</h3>
//                     <a 
//                       href="https://instagram.com/dagim_dana" 
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-gray-400 hover:text-[#00ff9d] transition-colors"
//                     >
//                       Connect on Instagram
//                     </a>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-full border-2 border-[#00ff9d] text-[#00ff9d]">
//                     <Mail size={20} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold">Email</h3>
//                     <a 
//                       href="mailto:dagimdana1@gmail.com" 
//                       className="text-gray-400 hover:text-[#00ff9d] transition-colors"
//                     >
//                      Connect on Email
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-[#1a1a1a] p-8 rounded-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
//                     placeholder="Alex Hailu"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
//                     Your Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
//                     placeholder="Alex@example.com"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
//                     placeholder="Project Inquiry"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={5}
//                     className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
//                     placeholder="Hello, I'd like to discuss a project..."
//                   ></textarea>
//                 </div>
                
//                 {submitStatus && (
//                   <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
//                     {submitStatus.message}
//                   </div>
//                 )}
                
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-[#00ff9d] text-black px-6 py-4 rounded-lg hover:bg-[#00cc7d] transition-colors font-medium flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={18} />
//                       Send Message
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Map Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="bg-[#1a1a1a] p-4 rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.5s' }}>
//           <div className="aspect-video w-full">
//             <iframe 
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126766.39636748476!2d38.68703422560553!3d9.010793900000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1716232345678!5m2!1sen!2sus" 
//               width="100%" 
//               height="100%" 
//               style={{ border: 0 }} 
//               allowFullScreen 
//               loading="lazy"
//               title="Location Map - Addis Ababa, Ethiopia"
//             ></iframe>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="bg-gradient-to-r from-[#00ff9d]/10 to-[#00ccff]/10 rounded-2xl p-12 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Ready to Start Your Next Project?
//           </h2>
//           <p className="text-gray-400 max-w-2xl mx-auto mb-8">
//             I'm currently available for freelance work and full-time positions.
//             Let's create something amazing together!
//           </p>
//           <button 
//             onClick={() => window.location.href = 'mailto:dagimdana1@gmail.com'}
//             className="bg-[#00ff9d] text-black px-8 py-4 rounded-full hover:bg-[#00cc7d] transition-colors font-medium text-lg"
//           >
//             Hire Me Now
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }
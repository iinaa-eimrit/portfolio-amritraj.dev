import React, { useState } from 'react';
import { Github, Linkedin, Mail, FileText, Code, Book, Briefcase, Settings, Terminal, Server, Shield, Cloud, Circle, Layers, Share2, Coffee, Code2, Monitor, Database, ExternalLink } from 'lucide-react';

// Social button component
const SocialButton = ({ href, icon, label }) => (
  <a
    href={href}
    className="mx-2 text-gray-600 hover:text-blue-600 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    {icon}
  </a>
);


// Custom button component
const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// New SkillCard component
const SkillCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-blue-600" />
    </div>
    <h4 className="text-xl font-bold mb-3">{title}</h4>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

// Project Card Component
const ProjectCard = ({ project, onClick }) => (
  <div 
    className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
    onClick={onClick}
  >
    <div className="aspect-video overflow-hidden">
      <img
        src={project.imageUrl || "/api/placeholder/800/400"}
        alt={project.title}
        className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
      <p className="line-clamp-2 text-sm text-gray-600">
        {Array.isArray(project.description) ? project.description[0] : project.description}
      </p>
    </div>
  </div>
);

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h3 className="mb-2 text-3xl font-bold tracking-tight">{project.title}</h3>
          {project.subtitle && (
            <p className="text-lg text-gray-600">{project.subtitle}</p>
          )}
        </div>

        <div className="mb-6 overflow-hidden rounded-lg">
          <img
            src={project.imageUrl || "/api/placeholder/800/400"}
            alt={project.title}
            className="w-full transform object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {project.date && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{project.date}</span>
            </div>
          )}
          {project.author && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{project.author}</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          {Array.isArray(project.description) ? (
            project.description.map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-gray-600">{project.description}</p>
          )}
        </div>

        {project.technologies && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <h4 className="font-semibold">Technologies Used:</h4>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ExternalLink className="h-5 w-5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);


  const navLinks = [
    { href: '#about', text: 'About' },
    { href: '#skills', text: 'Skills' },
    { href: '#projects', text: 'Projects' },
    { href: '#timeline', text: 'Timeline' },
    { href: '#contact', text: 'Contact' }
  ];

  const socialLinks = [
    { 
      href: 'https://github.com/iinaa-eimrit',
      icon: <Github className="h-6 w-6" />,
      label: 'GitHub'
    },
    {
      href: 'https://www.linkedin.com/in/amrit-raj-8a30b8247/',
      icon: <Linkedin className="h-6 w-6" />,
      label: 'LinkedIn'
    },
    {
      href: 'mailto:a16raj@gmail.com',
      icon: <Mail className="h-6 w-6" />,
      label: 'Email'
    }
  ];

  const navigationButtons = [
    {
      href: "https://drive.google.com/file/d/1YpzO17_2CP78jcxFC6d0QK6I3Lfvpnbj/view?usp=sharing",
      text: "Resume",
      icon: <FileText className="h-5 w-5" />,
      target: "_blank"
  },
    {
      href: "#projects",
      text: "Projects",
      icon: <Code className="h-5 w-5" />
    },
    {
      href: "#skills",
      text: "Skills",
      icon: <Book className="h-5 w-5" />
    },
    {
      href: "#timeline",
      text: "Work Experience",
      icon: <Briefcase className="h-5 w-5" />
    }
  ];

  // New skills data
  const skills = [
    {
      icon: Monitor,
      title: "JavaScript, TypeScript, Node.js",
      description: "Proficient in full-stack development with extensive experience in JavaScript and TypeScript. Developed robust applications using Node.js and frameworks like Express, enhancing backend performance and scalability."
    },
    {
      icon: Layers,
      title: "React, Next.js",
      description: "Skilled in building dynamic user interfaces and complex web applications using React and Next.js, implementing state management, routing, and server-side rendering for optimized performance."
    },
    {
      icon: Server,
      title: "DevOps, CI/CD",
      description: "Expertise in DevOps practices, including Docker, Kubernetes, and AWS, with hands-on experience in CI/CD pipeline implementation to streamline deployments and improve development efficiency."
    },
    {
      icon: Database,
      title: "MongoDB, PostgreSQL",
      description: "Experienced in designing and managing databases using MongoDB and PostgreSQL, with a focus on performance optimization and data integrity in high-scale applications."
    },
    {
      icon: Shield,
      title: "Authentication & Security",
      description: "Implemented secure authentication mechanisms using JWT, OAuth, and OpenID Connect, ensuring robust security standards for user data and application access."
    },
    {
      icon: Terminal,
      title: "Backend Architecture & Middleware",
      description: "Built scalable backend architectures with asynchronous programming, middleware integration, and RESTful APIs, enabling efficient server-side functionality and seamless communication with front-end systems."
    },
    {
      icon: Cloud,
      title: "Cloud Services & Serverless",
      description: "Experienced with cloud platforms like AWS, specializing in serverless architectures and load balancing solutions to optimize resource allocation and cost-effectiveness."
    },
    {
      icon: Code,
      title: "CI/CD Pipelines & Monitoring",
      description: "Developed CI/CD pipelines with Jenkins and GitHub Actions, utilizing monitoring tools like Prometheus and Grafana to track system performance and reliability."
    },
    {
      icon: Code2,
      title: "TypeScript, Zod",
      description: "In-depth experience with TypeScript for static type checking, along with Zod for schema validation, contributing to robust and error-free codebases in complex applications."
    },
    {
      icon: Code2,
      title: "C++",
      description: "2+ years of C++ programming experience, focusing on game engines and computer vision applications."
    },
    
  ];

// Example projects data
const projects = [
  {
    title: "Financial App Landing Page",
    subtitle: "Modern and responsive financial application landing page",
    description: "A fully responsive financial app landing page using React JS and Tailwind CSS!",
    imageUrl: "/E - Batua.png",
    technologies: ["React", "Tailwind CSS", "Responsive Design"],
    date: "2024",
    author: "Amrit Raj",
    githubUrl: "https://github.com/iinaa-eimrit/Financial-App-Landing-Page",
    liveUrl: "https://financial-app-landing-page.vercel.app/"
  },
  {
    "title": "An Interactive Kanban Board Application",
    "subtitle": "Dynamic and responsive Kanban board with custom grouping and sorting",
    "description": "An interactive Kanban board application built with ReactJS, allowing users to group and sort tasks dynamically using the provided API.",
    "imageUrl": "/kanban interface.png",
    "technologies": ["React", "JavaScript", "Tailwind - CSS", "Responsive Design"],
    "date": "2024",
    "author": "Amrit Raj",
    "githubUrl": "https://github.com/iinaa-eimrit/An-Interactive-Kanban-Board-Application",
    "liveUrl": "https://an-interactive-kanban-board-application-ceoc.vercel.app/"
},
{
    "title": "Pen Pulse",
    "subtitle": "Social Journalism and Blog Hosting Platform - a scalable, serverless API for managing blog posts",
    "description": "A serverless Blog API built with Cloudflare Workers, Prisma, and Zod, featuring JWT authentication, CRUD operations for blogs, and a monorepo structure with shared types for scalable and validated data handling.",
    "imageUrl": "/pen pulse blog.png",
    "technologies": ["Cloudflare Workers", "Prisma", "Zod", "JWT Authentication", "Monorepo"],
    "date": "2024",
    "author": "Amrit Raj",
    "githubUrl": "https://github.com/iinaa-eimrit/Pen-Pulse",
    "liveUrl": "https://pen-pulse-roan.vercel.app/"
}
];

  const timelineData = [
    {
      id: 1,
      date: "June'23 - August'23",
      title: "CSIR-NAL",
      location: "Bengaluru, India",
      description: "Starting with a Summer 2023 engineering internship from June to August at CSIR-National Aerospace Laboratories, my work involved designing and developing automated tools for detecting and mitigating jamming, as well as implementing countermeasures to enhance the resilience of communication systems.",
      link: "https://www.nal.res.in/",
      isInverted: true
    },
    {
      id: 2,
      date: "2021 - Present",
      title: "Indian Institute of Information Technology, Ranchi",
      location: "Jharkhand, India",
      description: "As a undergraduate of the Class of 2021 and a B.Tech. candidate Electronics & Communication Engineering, I continue to take advantage of many of the interesting learning opportunities that IIIT Ranchi has to offer. I am particularly interested in artificial intelligence and machine learning, and have spent much of my time here focusing on these fields.",
      link: "https://iiitranchi.ac.in/",
      isInverted: false
    }
  ];


  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-transparent z-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <a href="#top" className="text-2xl font-bold text-white">
          Amrit Raj
        </a>
      </div>

      {/* Mobile menu button */}
      <div className="flex items-center sm:hidden">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="p-2 rounded-md text-white hover:text-gray-300"
          aria-expanded={isNavOpen}
          aria-label="Toggle menu"
        >
          {isNavOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop navigation */}
      <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-white hover:text-gray-300"
              >
                {link.text}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1YpzO17_2CP78jcxFC6d0QK6I3Lfvpnbj/view?usp=sharing"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Add your hamburger icon here */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`sm:hidden transition-all duration-200 ease-in-out ${
          isNavOpen ? 'max-h-96' : 'max-h-0'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.text}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-white hover:text-gray-300 rounded-md"
              onClick={() => setIsNavOpen(false)}
            >
              {link.text}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1YpzO17_2CP78jcxFC6d0QK6I3Lfvpnbj/view?usp=sharing"
            className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsNavOpen(false)}
          >
            Resume
          </a>
    </div>
  </div>
</nav>


      {/* Header */}
      <header className="relative pt-24 pb-16 bg-cover bg-center" style={{ backgroundImage: "url('/back_bay.jpg')" }}>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  <div className="relative max-w-7xl mx-auto px-4 text-center">
    <div className="mb-8">
      <img
        src="/profile.png"
        alt="Amrit Raj"
        className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 md:border-8 border-white mx-auto object-cover shadow-lg"
      />
    </div>
    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Amrit Raj</h1>
    <p className="text-lg md:text-2xl text-white/90 leading-relaxed">
      Software Engineer @ IIIT Ranchi
      <br />
      Electronics and Communications Engineering
    </p>
    <div className="mt-8 flex justify-center space-x-6">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-white hover:text-white/80 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  </div>
</header>


      {/* Clients */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <a
                href="https://iiitranchi.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <img
                  src="/IIITR.png"
                  alt="IIIT Ranchi"
                  className="h-12 md:h-16 object-contain"
                />
              </a>
              <a
                href="https://www.nal.res.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <img
                  src="/csir-nal.png"
                  alt="CSIR-NAL"
                  className="h-12 md:h-16 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Profile Image Column */}
            <div className="lg:col-span-4">
              <div className="text-center">
                <img
                  src="/profile.png"
                  alt="Amrit Raj"
                  className="rounded-full border-8 border-white w-64 h-64 mx-auto object-cover"
                />
                <div className="mt-4 flex justify-center">
                  {socialLinks.map((link, index) => (
                    <SocialButton key={index} {...link} />
                  ))}
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-2">Amrit Raj</h2>
                <p className="text-xl font-semibold text-gray-700 mb-4">
                  IIIT Ranchi '25, B.Tech. Student, Electronics & Communication Engineering
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  I'm an undergraduate of IIIT Ranchi's Class of 2025 and my passion is Computer Science.
                  My interests include software design and development, artificial intelligence, machine learning,
                  computer vision, and natural language processing.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  I'm currently an undergraduate student working towards my Bachelor of Technology (B.Tech.)
                  degree in Electronics & Communication Engineering.
                </p>
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">
                    Indian Institute of Information Technology, Ranchi (IIIT Ranchi)
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="text-lg text-gray-600">
                      Bachelor of Technology in Electronics & Communication Engineering
                    </li>
                    <li className="text-lg text-gray-600">
                      Certificate of Advanced Undergraduate Research in Jamming and Its Countermeasures
                      at CSIR - National Aerospace Laboratories
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-6">Learn more about my:</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {navigationButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target={button.target}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all hover:scale-105 
                    ${button.href === "https://drive.google.com/file/d/1YpzO17_2CP78jcxFC6d0QK6I3Lfvpnbj/view?usp=sharing" ? 
                      "bg-blue-600 text-white hover:bg-blue-700" : 
                      "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {button.icon}
                  {button.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Skills</h2>
            <p className="text-lg text-gray-600">
              Below are some of my skills, and I'm always looking to learn more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
              />
            ))}
          </div>
        </div>
      </section>

{/* Projects Section */}
<section id="projects" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">Portfolio</h3>
          <h2 className="text-3xl font-bold mb-4">Personal Projects</h2>
          <p className="text-lg text-gray-600 mb-2">
            Here you can see some of the projects I've done on my own time.
          </p>
          <p className="text-gray-500 italic">
            (Somewhat ongoing, will update soon. Undergrad student life is very busy!)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <div className="text-center mt-12 space-y-8">
          <p className="text-lg text-gray-600">
            In my free time, I continue to work on personal projects and have many ideas just waiting to be realized.
          </p>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">To see more of my projects...</h2>
            <a
              href="https://github.com/iinaa-eimrit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Github className="w-5 h-5" />
              Visit My GitHub
            </a>
          </div>
        </div>

        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>

<section className="py-16 bg-gray-50" id="timeline">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Timeline</h2>
          <p className="text-lg text-gray-600">A short summary of my work experience..</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row ${
                  item.isInverted ? 'md:flex-row-reverse' : ''
                } items-center`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${
                  item.isInverted ? 'md:pl-8' : 'md:pr-8'
                }`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <span className="text-sm text-blue-600 font-semibold">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-bold mt-2">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors duration-300"
                      >
                        {item.title}
                      </a>
                    </h3>
                    <h4 className="text-gray-600 mb-4">{item.location}</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Circle Marker */}
                <div className="flex justify-center w-full md:w-2/12 py-4 md:py-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                </div>

                {/* Spacer for non-inverted items */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

{/* Contact Section */}
<section id="contact" className="py-20 bg-gradient-to-br from-gray-200 to-gray-100">
  <div className="container max-w-2xl mx-auto text-center">
    <h2 className="text-4xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
    <p className="text-xl text-gray-700 mb-4">
      I'd love to hear from you! Whether it’s a project or just a friendly chat, feel free to reach out.
    </p>
    <div className="bg-white shadow-lg rounded-lg py-8 px-6 md:px-12">
      <p className="text-lg text-gray-800 mb-3">
        <span className="font-medium">Email:</span>
        <a href="mailto:amrit.21ug2053@iiitranchi.ac.in" className="text-blue-700 hover:underline ml-2">amrit.21ug2053@iiitranchi.ac.in</a>
        {" | "}
        <a href="mailto:a16raj@gmail.com" className="text-blue-700 hover:underline">a16raj@gmail.com</a>
      </p>
      <p className="text-lg text-gray-800 mb-6">
        <span className="font-medium">Phone:</span>
        <a href="tel:+916202469148" className="text-blue-700 hover:underline ml-2">+91 6202469148</a>
      </p>
      <button className="px-6 py-3 mt-4 bg-blue-700 text-white font-semibold rounded-md shadow-md hover:bg-blue-800 transition duration-200">
        <a href="mailto:a16raj@gmail.com">Contact Me</a>
      </button>
    </div>
  </div>
</section>

        {/* Footer */}
        <footer className="py-8 bg-gray-900 text-white">
          <div className="container mx-auto text-center">
            <div className="mb-4">
              <span>&copy; 2024 Amrit Raj</span>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              {socialLinks.map((link, index) => (
                <a href={link.href} target="blank" aria-label={link.label} className="text-white hover:text-gray-400">
                  {link.icon}
                </a>
              ))}
            </div>
            <div>
              <a href="#about" className="text-white hover:text-gray-400 mx-2">About</a> |
              <a href="#contact" className="text-white hover:text-gray-400 mx-2">Contact</a> |
              <a href="https://drive.google.com/file/d/1YpzO17_2CP78jcxFC6d0QK6I3Lfvpnbj/view?usp=sharing" target="blank" className="text-white hover:text-gray-400 mx-2">Resume</a>
            </div>
          </div>
        </footer>


    </div>
  );
};

export default Portfolio;
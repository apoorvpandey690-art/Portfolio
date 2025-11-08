import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const projects = [
  {
    title: "Loan Management System",
    description:
      "The Loan Management System is a full-stack ASP.NET Core MVC application with MySQL as the database, designed to streamline the entire loan processing workflow — from lead generation to commission management.It supports role-based access for admins, marketing, and office teams, ensuring that each user only sees and manages data relevant to their role. The system provides real-time notifications, document verification workflows, audit logging, soft deletion (GDPR-compliant), and dashboard analytics for performance tracking.",
    src: "rock.jpg",
    link: "https://i.postimg.cc/BvfJ0Dqs/Screenshot-2025-11-08-at-4-05-17-PM.png",
    color: "#5196fd",
    videoId: "3uf39KSf400", // Use YouTube video ID instead of full URL
  },
  // {
  //   title: "A sleek portfolio built with React and Tailwind CSS ",
  //   description:
  //     "A sleek portfolio built with React and Tailwind CSS to showcase your skills, projects, and experience in a modern design.",
  //   src: "tree.jpg",
  //   link: "https://i.postimg.cc/3xVz5HF4/Screenshot-2025-11-08-at-4-13-50-PM.png",
  //   color: "#8f89ff",
  //   videoId: "BhA5LKWLLl4", // Replace with your actual YouTube video ID
  // },
  {
    title: "NyayAI",
    description:
      "NyayaAI is an AI-powered legal document analysis system designed to identify hidden obligations, risks, and unfavorable clauses within contracts and agreements. It leverages advanced natural language processing and retrieval-augmented generation (RAG) techniques to interpret complex legal language, highlight potentially misleading or risky terms, and provide users with clear, context-based insights for better legal understanding and decision-making.💻✨",
    src: "house.jpg",
    link: "https://i.postimg.cc/4xyTRPkk/Screenshot-2025-11-08-at-4-17-44-PM.png",
    color: "#ed649e",
    videoId: "BhA5LKWLLl4", // Replace with your actual YouTube video ID
  },
    {
    title: "SATMS",
    description:
      "Students Academics Tracking And Monitoring System, delivers an easy, automated and effective way for faculty, students, and HOD to visualize, edit and track the academic performance",
    src: "house.jpg",
    link: "https://i.postimg.cc/VNN2wYd2/Screenshot-2025-11-08-at-6-02-23-PM.png",
    color: "#ed649e",
    videoId: "GDxJlDBLXDA", // Replace with your actual YouTube video ID
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Add specific styles for 1366x768 resolution
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);

    // Resolution check function
    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty("--project-scale", "0.85");
        document.documentElement.style.setProperty("--project-margin", "-5vh");
      } else {
        document.documentElement.style.setProperty("--project-scale", "1");
        document.documentElement.style.setProperty("--project-margin", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                videoId={project.videoId}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  videoId,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  // Function to extract YouTube ID from various URL formats
  const getYouTubeEmbedUrl = (videoId) => {
    // If it's already just an ID, use it directly
    if (videoId && videoId.length === 11) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    
    // If it's a full URL, try to extract the ID
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
      /youtube\.com\/embed\/([^?]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = videoId.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
      }
    }
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  return (
    <>
      <div
        ref={container}
        className="h-screen flex items-center justify-center sticky top-0 project-container"
      >
        <motion.div
          style={{
            scale,
            top: `calc(-5vh + ${i * 25}px)`,
            transform: `scale(var(--project-scale, 1))`,
            marginTop: "var(--project-margin, 0)",
          }}
          className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
          whileHover={{
            y: -8,
            transition: { duration: 0.3 },
          }}
        >
          {/* Modern split card design */}
          <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
            {/* Image section - full width on mobile, 55% on desktop */}
            <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden">
              <motion.img
                src={url}
                alt={title}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />

              {/* Colored overlay on hover */}
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: color, mixBlendMode: "overlay" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />

              {/* Project number */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                Project {i + 1}
              </div>
            </div>

            {/* Content section - full width on mobile, 45% on desktop */}
            <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
                </div>

                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                  {title}
                </h2>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                  {description}
                </p>
              </div>

              <div className="mt-4 md:mt-auto pt-4">
                <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />

                <div className="flex items-center gap-4">
                  {/* Video Demo Button */}
                  <motion.button
                    onClick={openVideo}
                    className="group flex items-center gap-2 cursor-pointer"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Watch Demo
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* YouTube Video Modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-2 rounded-full transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* YouTube Embed */}
            <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
              <iframe
                src={getYouTubeEmbedUrl(videoId)}
                className="absolute inset-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${title} Demo`}
              ></iframe>
            </div>

            {/* Video Title */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white text-center">
                {title} - Demo
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// Updated PropTypes validation
Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  videoId: PropTypes.string.isRequired,
};
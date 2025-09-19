import { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const portfolioRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Corporate Brand Film",
      category: "corporate",
      description: "High-end corporate video with cinematic storytelling",
      duration: "2:30",
      tags: ["4K", "Color Grading", "Motion Graphics"],
    },
    {
      id: 2,
      title: "Music Video Production",
      category: "music",
      description: "Dynamic music video with creative transitions",
      duration: "3:45",
      tags: ["Creative Edit", "VFX", "Sound Design"],
    },
    {
      id: 3,
      title: "Documentary Series",
      category: "documentary",
      description: "Multi-episode documentary with narrative flow",
      duration: "25:00",
      tags: ["Long Form", "Storytelling", "Archive"],
    },
    {
      id: 4,
      title: "Product Commercial",
      category: "commercial",
      description: "High-impact product showcase commercial",
      duration: "0:60",
      tags: ["Product Shot", "3D Integration", "Fast Cut"],
    },
    {
      id: 5,
      title: "Wedding Highlight Reel",
      category: "wedding",
      description: "Emotional wedding story with cinematic feel",
      duration: "4:20",
      tags: ["Cinematic", "Emotional", "Music Sync"],
    },
    {
      id: 6,
      title: "Event Coverage",
      category: "events",
      description: "Multi-camera event editing and highlights",
      duration: "8:15",
      tags: ["Multi-Cam", "Live Event", "Quick Turn"],
    },
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "corporate", name: "Corporate" },
    { id: "commercial", name: "Commercial" },
    { id: "music", name: "Music Videos" },
    { id: "documentary", name: "Documentary" },
    { id: "wedding", name: "Wedding" },
    { id: "events", name: "Events" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToAnimate =
      portfolioRef.current?.querySelectorAll(".animate-on-scroll");
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="portfolio-section" ref={portfolioRef}>
      <div className="container">
        <div className="portfolio-header animate-on-scroll">
          <h2 className="section-title">Portfolio</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Discover my latest work spanning across multiple genres and formats
          </p>
        </div>

        <div className="portfolio-filters animate-on-scroll">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(category.id);
                setVisibleProjects(6);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="portfolio-grid animate-on-scroll">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={project.id}
              className="portfolio-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="portfolio-card">
                <div className="portfolio-thumbnail">
                  <div className="thumbnail-overlay">
                    <div className="play-button">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="duration-badge">{project.duration}</div>
                  </div>
                  <div className="film-grain"></div>
                </div>

                <div className="portfolio-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button className="btn-watch">Watch Now</button>
                    <button className="btn-details">Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProjects < filteredProjects.length && (
          <div className="portfolio-load-more animate-on-scroll">
            <button
              className="btn-load-more"
              onClick={() => setVisibleProjects((prev) => prev + 3)}
            >
              Load More Projects
            </button>
          </div>
        )}

        <div className="demo-reel-section animate-on-scroll">
          <div className="demo-reel-card">
            <div className="demo-reel-content">
              <h3>Complete Demo Reel</h3>
              <p>
                Watch my comprehensive showcase featuring the best of my work
              </p>
              <button className="btn-demo-reel">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo Reel
              </button>
            </div>
            <div className="demo-reel-visual">
              <div className="reel-animation">
                <div className="reel-circle"></div>
                <div className="reel-film"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

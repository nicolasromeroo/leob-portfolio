import { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const portfolioRef = useRef(null);
  const projects = [
    {
      id: 1,
      title: "Video para Influencer de Fitness",
      category: "influencer",
      description: "Producción y edición de rutina de entrenamiento para Instagram y YouTube.",
      duration: "5:20",
      tags: ["Fitness", "Redes Sociales", "Edición Rápida"],
    },
    {
      id: 2,
      title: "Trabajo Práctico Universitario",
      category: "educativo",
      description: "Video documental sobre impacto ambiental realizado para una materia universitaria.",
      duration: "12:00",
      tags: ["Documental", "Educativo", "Narración"],
    },
    {
      id: 3,
      title: "Entrevista a Deportista Destacado",
      category: "deportes",
      description: "Entrevista y highlights de jugador profesional de fútbol con repercusión nacional.",
      duration: "7:30",
      tags: ["Entrevista", "Deportes", "Highlights"],
    },
    {
      id: 4,
      title: "Campaña para Marca de Ropa",
      category: "comercial",
      description: "Video promocional para lanzamiento de nueva colección de ropa urbana.",
      duration: "1:10",
      tags: ["Moda", "Promocional", "Creatividad"],
    },
    {
      id: 5,
      title: "Vlog de Viaje Influencer",
      category: "influencer",
      description: "Edición de vlog de viaje por Europa para influencer con miles de seguidores.",
      duration: "8:45",
      tags: ["Vlog", "Viajes", "Storytelling"],
    },
    {
      id: 6,
      title: "Cobertura de Evento Deportivo",
      category: "deportes",
      description: "Resumen y edición de torneo de pádel con participación de figuras reconocidas.",
      duration: "6:30",
      tags: ["Evento", "Deportes", "Cobertura"],
    },
  ];

  const categories = [
    { id: "all", name: "Todos los Proyectos" },
    { id: "influencer", name: "Influencers" },
    { id: "comercial", name: "Comercial" },
    { id: "educativo", name: "Educativos" },
    { id: "deportes", name: "Deportes" },
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
            Descubre mis últimos trabajos en distintos géneros y formatos
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
                    <button className="btn-watch">Ver ahora</button>
                    <button className="btn-details">Detalles</button>
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
              Cargar más proyectos
            </button>
          </div>
        )}

        <div className="demo-reel-section animate-on-scroll">
          <div className="demo-reel-card">
            <div className="demo-reel-content">
              <h3>Demo Reel Completo</h3>
              <p>
                Mira mi reel completo con lo mejor de mi trabajo
              </p>
              <button className="btn-demo-reel">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Ver Demo Reel
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

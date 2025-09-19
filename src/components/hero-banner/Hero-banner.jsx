import { useEffect, useRef, useState } from "react";
import "./HeroBanner.css";

const HeroBanner = () => {
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const particlesRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const showcaseRef = useRef(null);
  const animationFrameRef = useRef(null);

  // TODO: - cambiar por URLs reales
  const portfolioVideos = [
    {
      id: 1,
      title: "Corporate Brand Film",
      thumbnail:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
      type: "Corporate",
    },
    {
      id: 2,
      title: "Music Video Production",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      type: "Music Video",
    },
    {
      id: 3,
      title: "Commercial Campaign",
      thumbnail:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
      type: "Commercial",
    },
    {
      id: 4,
      title: "Documentary Series",
      thumbnail:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
      type: "Documentary",
    },
  ];

  useEffect(() => {
    // loader cinematografico
    const loaderTimeout = setTimeout(() => {
      setLoading(false);

      // animacion secuencial de entrada
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.classList.add("animate-in");
        }
      }, 500);

      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.classList.add("animate-in");
        }
      }, 1000);

      setTimeout(() => {
        const elements = document.querySelectorAll(".hero-element");
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("animate-in");
            el.style.transition =
              "opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, index * 250);
        });
      }, 2000); // delay mayor para suavizar la entrada
    }, 2200); // loader dura un poco más

    // Carrusel automático de videos
    const videoInterval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % portfolioVideos.length);
    }, 4000);

    // Parallax effect mejorado con múltiples capas y RAF
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const scrollProgress = Math.min(scrolled / heroHeight, 1);

      setScrollY(scrolled);
    };

    // Optimización con RAF para animaciones fluidas
    const updateAnimations = () => {
      if (!heroRef.current) return;

      const scrolled = scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollProgress = Math.min(scrolled / heroHeight, 1);

      // Parallax multicapa con diferentes velocidades y easing
      const parallaxLayers = [
        { element: backgroundRef.current, speed: 0.5, rotation: 0.1 },
        { element: particlesRef.current, speed: 0.8, rotation: -0.2 },
        {
          element: contentRef.current,
          speed: 0.3,
          scale: 1 - scrollProgress * 0.1,
        },
        { element: showcaseRef.current, speed: 0.6, rotation: 0.05 },
      ];

      parallaxLayers.forEach(({ element, speed, rotation = 0, scale = 1 }) => {
        if (element) {
          const translateY = scrolled * speed;
          const rotateZ = scrolled * rotation;
          const scaleValue = scale;

          element.style.transform = `
            translate3d(0, ${translateY}px, 0) 
            rotateZ(${rotateZ}deg) 
            scale(${scaleValue})
          `;
        }
      });

      // Efectos 3D en elementos individuales
      const elements = heroRef.current.querySelectorAll(".hero-element");
      elements.forEach((el, index) => {
        const delay = index * 0.1;
        const progress = Math.max(0, scrollProgress - delay);
        const translateX = Math.sin(progress * Math.PI) * 20;
        const rotateX = progress * 15;
        const opacity = 1 - Math.max(0, (progress - 0.7) * 3.33);

        el.style.transform = `
          perspective(1000px) 
          translateX(${translateX}px) 
          rotateX(${rotateX}deg)
        `;
        el.style.opacity = opacity;
      });

      // Efecto de distorsión en el título
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        chars.forEach((char, i) => {
          const charProgress = scrollProgress + i * 0.02;
          const translateY = Math.sin(charProgress * Math.PI * 2) * 10;
          const rotateY = charProgress * 360;

          char.style.transform = `
            translateY(${translateY}px) 
            rotateY(${rotateY}deg)
          `;
        });
      }

      // Morphing del carrusel de videos
      const videoSlides = heroRef.current.querySelectorAll(".video-slide");
      videoSlides.forEach((slide, index) => {
        const slideProgress = (scrollProgress + index * 0.1) % 1;
        const scale = 1 + Math.sin(slideProgress * Math.PI) * 0.1;
        const rotateY = slideProgress * 10;

        slide.style.transform = `
          perspective(1000px) 
          scale(${scale}) 
          rotateY(${rotateY}deg)
        `;
      });

      animationFrameRef.current = requestAnimationFrame(updateAnimations);
    };

    // Mouse parallax para interactividad adicional
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setMousePosition({ x, y });

      // Parallax basado en mouse
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll(".particle");
        particles.forEach((particle, index) => {
          const speed = (index + 1) * 0.5;
          const translateX = x * speed * 10;
          const translateY = y * speed * 10;

          particle.style.transform = `
            translate3d(${translateX}px, ${translateY}px, 0) 
            rotate(${x * speed * 5}deg)
          `;
        });
      }

      // Efecto de inclinación en el showcase
      if (showcaseRef.current) {
        const tiltX = y * 5;
        const tiltY = x * 5;

        showcaseRef.current.style.transform = `
          perspective(1000px) 
          rotateX(${tiltX}deg) 
          rotateY(${tiltY}deg)
        `;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Iniciar animaciones
    updateAnimations();

    return () => {
      clearTimeout(loaderTimeout);
      clearInterval(videoInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [portfolioVideos.length, scrollY]);

  // Intersection Observer para efectos de reveal
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50px",
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Efectos especiales para diferentes elementos
          if (entry.target.classList.contains("hero-stats")) {
            // Los contadores ya se animan en otro useEffect
            entry.target.querySelectorAll(".stat").forEach((stat, index) => {
              setTimeout(() => {
                stat.style.transform = "translateY(0) rotateX(0deg)";
                stat.style.opacity = "1";
              }, index * 200);
            });
          }

          if (entry.target.classList.contains("hero-buttons")) {
            entry.target.querySelectorAll("button").forEach((btn, index) => {
              setTimeout(() => {
                btn.style.transform = "translateY(0) scale(1)";
                btn.style.opacity = "1";
              }, index * 300);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observar elementos cuando el componente está listo
    setTimeout(() => {
      const elements = document.querySelectorAll(
        ".hero-element:not(.hero-title):not(.hero-subtitle)"
      );
      elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px) rotateX(30deg)";
        observer.observe(el);
      });
    }, 3500); // Después de las animaciones iniciales

    return () => observer.disconnect();
  }, [loading]);

  // Efecto de mouse movement para elementos 3D adicionales
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      // Efecto de inclinación en el título
      if (titleRef.current) {
        const tiltX = y * 2;
        const tiltY = x * 2;
        titleRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      // Efecto en elementos estadísticos
      const stats = document.querySelectorAll(".stat");
      stats.forEach((stat, index) => {
        const depth = (index + 1) * 0.5;
        const moveX = x * depth * 3;
        const moveY = y * depth * 3;
        stat.style.transform = `translate3d(${moveX}px, ${moveY}px, ${
          depth * 5
        }px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [loading]);

  // Función para efectos de typing con split de caracteres
  const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.innerHTML = "";

    // Crear spans para cada carácter para animaciones individuales
    const chars = text
      .split("")
      .map(
        (char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
      );

    const timer = setInterval(() => {
      if (i < chars.length) {
        element.innerHTML += chars[i];

        // Animar el carácter recién agregado
        const newChar = element.lastElementChild;
        if (newChar) {
          newChar.style.transform = "translateY(20px) rotateX(90deg)";
          newChar.style.opacity = "0";

          requestAnimationFrame(() => {
            newChar.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
            newChar.style.transform = "translateY(0) rotateX(0deg)";
            newChar.style.opacity = "1";
          });
        }

        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  };

  useEffect(() => {
    if (!loading && titleRef.current && subtitleRef.current) {
      setTimeout(() => {
        typeWriter(titleRef.current, "LEO BUSTOS", 100);
      }, 800);

      setTimeout(() => {
        typeWriter(
          subtitleRef.current,
          "CINEMATIC STORYTELLER & VISUAL ARTIST",
          60
        );
      }, 2500);

      // Animar contadores
      setTimeout(() => {
        animateCounters();
      }, 3000);
    }
  }, [loading]);

  // Función para animar contadores
  const animateCounters = () => {
    const counters = document.querySelectorAll(".stat-number[data-count]");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + "+";
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + "+";
        }
      };

      updateCounter();
    });
  };

  if (loading) {
    return (
      <div className="hero-loader">
        <div className="loader-content">
          <div className="film-reel">
            <div className="reel-outer">
              <div className="reel-inner"></div>
            </div>
          </div>
          <div className="loader-text">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
        </div>
        <div className="loader-particles"></div>
      </div>
    );
  }

  return (
    <section id="home" className="hero-banner" ref={heroRef}>
      {/* Fondo mejorado con múltiples capas parallax */}
      <div className="hero-background" ref={backgroundRef}>
        <div className="hero-overlay"></div>
        <div className="hero-particles" ref={particlesRef}>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle floating"></div>
          <div className="particle floating"></div>
          <div className="particle rotating"></div>
          <div className="particle rotating"></div>
          <div className="particle pulsing"></div>
        </div>
        <div className="hero-grid"></div>
        <div className="hero-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
      </div>

      <div className="hero-content" ref={contentRef}>
        <div className="hero-text">
          <div className="hero-badge hero-element">
            <span>EDITOR PREMIADO</span>
            <div className="badge-glow"></div>
          </div>

          <h1 className="hero-title" ref={titleRef}></h1>
          <p className="hero-subtitle" ref={subtitleRef}></p>

          <p className="hero-description hero-element">
            Transformando material en bruto en obras maestras cinematográficas
            mediante
            <span className="highlight"> edición experta</span>,
            <span className="highlight"> corrección de color</span> y
            <span className="highlight"> narración visual</span> que cautiva
            audiencias en todo el mundo.
          </p>

          <div className="hero-stats hero-element">
            <div className="stat">
              <span className="stat-number" data-count="500">
                0
              </span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-count="8">
                0
              </span>
              <span className="stat-label">Años</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-count="50">
                0
              </span>
              <span className="stat-label">Premios</span>
            </div>
          </div>

          <div className="hero-buttons hero-element">
            <button
              className="btn-primary btn-glow"
              onClick={() =>
                document
                  .getElementById("portfolio")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>Ver mi trabajo</span>
              <div className="btn-bg"></div>
              <div className="btn-particles">
                <div className="btn-particle"></div>
                <div className="btn-particle"></div>
                <div className="btn-particle"></div>
              </div>
            </button>
            <button
              className="btn-secondary btn-outline"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>Colaboremos</span>
              <div className="btn-ripple"></div>
            </button>
          </div>
        </div>

        {/* Carrusel de videos con efectos 3D */}
        <div className="hero-showcase" ref={showcaseRef}>
          <div className="video-carousel">
            <div className="carousel-container">
              {portfolioVideos.map((video, index) => (
                <div
                  key={video.id}
                  className={`video-slide ${
                    index === currentVideo ? "active" : ""
                  } ${
                    index ===
                    (currentVideo - 1 + portfolioVideos.length) %
                      portfolioVideos.length
                      ? "prev"
                      : ""
                  } ${
                    index === (currentVideo + 1) % portfolioVideos.length
                      ? "next"
                      : ""
                  }`}
                >
                  <div className="video-frame">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="video-overlay">
                      <div className="play-button-large">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <div className="play-ripple"></div>
                      </div>
                    </div>
                    <div className="video-info">
                      <span className="video-type">{video.type}</span>
                      <h3 className="video-title">{video.title}</h3>
                    </div>
                    <div className="video-border-glow"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              {portfolioVideos.map((_, index) => (
                <button
                  key={index}
                  className={`control-dot ${
                    index === currentVideo ? "active" : ""
                  }`}
                  onClick={() => setCurrentVideo(index)}
                >
                  <div className="dot-inner"></div>
                  <div className="dot-glow"></div>
                </button>
              ))}
            </div>
          </div>

          <div className="showcase-decoration">
            <div className="deco-line"></div>
            <div className="deco-circle rotating-slow"></div>
            <div className="deco-triangle pulsing"></div>
            <div className="deco-hexagon floating"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator con animación avanzada */}
      <div className="hero-scroll-indicator hero-element">
        <div className="scroll-text">DISCOVER MORE</div>
        <div className="scroll-arrow">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

import { useEffect, useRef } from "react";
import "./About.css";

const About = () => {
  const aboutRef = useRef(null);

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
      aboutRef.current?.querySelectorAll(".animate-on-scroll");
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="container">
        <div className="about-content">
          <div className="about-text animate-on-scroll">
            <h2 className="section-title">About Me</h2>
            <div className="title-underline"></div>

            <p className="about-description">
              With over 8 years of experience in professional video editing, I
              specialize in creating compelling visual narratives that captivate
              audiences and deliver results.
            </p>

            <p className="about-description">
              From corporate videos to cinematic productions, I bring technical
              expertise and creative vision to every project, ensuring your
              story is told with maximum impact and professional polish.
            </p>

            <div className="expertise-list">
              <div className="expertise-item">
                <div className="expertise-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                  </svg>
                </div>
                <div>
                  <h4>Advanced Editing</h4>
                  <p>Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve</p>
                </div>
              </div>

              <div className="expertise-item">
                <div className="expertise-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <h4>Color Grading</h4>
                  <p>Professional color correction and cinematic grading</p>
                </div>
              </div>

              <div className="expertise-item">
                <div className="expertise-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z" />
                  </svg>
                </div>
                <div>
                  <h4>Motion Graphics</h4>
                  <p>After Effects animations and visual effects</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-stats animate-on-scroll">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Completed</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">Years Experience</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support Available</div>
              </div>
            </div>

            <div className="about-image">
              <div className="image-frame">
                <div className="image-overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

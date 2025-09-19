import { useEffect, useRef } from "react";
import "./Services.css";

const Services = () => {
  const servicesRef = useRef(null);

  const services = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
      ),
      title: "Video Editing",
      description:
        "Professional video editing with seamless transitions, perfect timing, and compelling storytelling.",
      features: [
        "Multi-camera editing",
        "Advanced transitions",
        "Narrative flow",
        "Sync optimization",
      ],
      price: "From $150/hour",
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      ),
      title: "Color Grading",
      description:
        "Cinematic color correction and grading to enhance mood, atmosphere, and visual consistency.",
      features: [
        "Color correction",
        "Cinematic looks",
        "Mood enhancement",
        "Consistency matching",
      ],
      price: "From $200/project",
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Motion Graphics",
      description:
        "Eye-catching animations, titles, and visual effects to elevate your video content.",
      features: [
        "Title animations",
        "Logo animations",
        "Visual effects",
        "Graphic elements",
      ],
      price: "From $300/project",
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      ),
      title: "Audio Post-Production",
      description:
        "Professional audio editing, mixing, and sound design for crystal clear audio quality.",
      features: [
        "Audio cleanup",
        "Sound mixing",
        "Music synchronization",
        "Voice enhancement",
      ],
      price: "From $100/hour",
    },
    {
      id: 5,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-2.5l-1.9-3.8c-.1-.2-.3-.2-.5-.2H8.9c-.2 0-.4.1-.5.2L6.5 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
        </svg>
      ),
      title: "Documentary Editing",
      description:
        "Specialized in long-form documentary editing with compelling narrative structure.",
      features: [
        "Story structuring",
        "Interview editing",
        "B-roll integration",
        "Pacing optimization",
      ],
      price: "From $250/hour",
    },
    {
      id: 6,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19v2h-1.5v17.5c0 .83-.67 1.5-1.5 1.5H8c-.83 0-1.5-.67-1.5-1.5V4H5V2h4.5V.5c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5V2h4.5v2z" />
        </svg>
      ),
      title: "Rush Delivery",
      description:
        "Expedited editing services for time-sensitive projects without compromising quality.",
      features: [
        "24-48 hour delivery",
        "Priority support",
        "Quality guarantee",
        "Flexible scheduling",
      ],
      price: "Premium rates apply",
    },
  ];

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
      servicesRef.current?.querySelectorAll(".animate-on-scroll");
    elementsToAnimate?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services-section" ref={servicesRef}>
      <div className="container">
        <div className="services-header animate-on-scroll">
          <h2 className="section-title">Services</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Professional video editing services tailored to bring your vision to
            life
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="service-icon">{service.icon}</div>

              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>

                <div className="service-price">{service.price}</div>

                <button className="service-cta">
                  Get Quote
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </button>
              </div>

              <div className="service-glow"></div>
            </div>
          ))}
        </div>

        <div className="services-cta animate-on-scroll">
          <div className="cta-content">
            <h3>Ready to Start Your Project?</h3>
            <p>
              Let's discuss your vision and create something extraordinary
              together
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Get Free Consultation</button>
              <button className="btn-secondary">View Pricing</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

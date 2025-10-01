import { useEffect, useRef } from "react";
import "./Services.css";

const Services = () => {
  const servicesRef = useRef(null);

  const services = [
    // ... (tu array de servicios permanece igual)
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
          <h2 className="section-title">Servicios</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Servicios profesionales de edición de video adaptados para hacer realidad tu visión
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
                  Solicitar presupuesto
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
            <h3>¿Listo para comenzar tu proyecto?</h3>
            <p>
              Hablemos sobre tu visión y creemos algo extraordinario juntos
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Solicitar consulta gratuita</button>
              <button className="btn-secondary">Ver precios</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

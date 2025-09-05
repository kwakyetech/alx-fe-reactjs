function Services() {
  return (
    <div className="page-container">
      <h1>Our Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">💻</div>
          <h3>Web Development</h3>
          <p>Custom websites and web applications built with modern technologies</p>
        </div>
        <div className="service-card">
          <div className="service-icon">📱</div>
          <h3>Mobile Apps</h3>
          <p>iOS and Android application development for all your mobile needs</p>
        </div>
        <div className="service-card">
          <div className="service-icon">💡</div>
          <h3>Consulting</h3>
          <p>Technology consulting and strategy to help your business grow</p>
        </div>
        <div className="service-card">
          <div className="service-icon">🛠️</div>
          <h3>Support</h3>
          <p>24/7 technical support and maintenance for peace of mind</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
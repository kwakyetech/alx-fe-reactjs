function Home() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>
          Welcome to <span className="highlight">Our Company</span>
        </h1>
        <p className="hero-text">
          We are a leading company in our industry, providing excellent services 
          and solutions to our clients worldwide. Our team is dedicated to 
          delivering quality and innovation in everything we do.
        </p>
        <div className="hero-cta">
          <button className="hero-btn-primary">Get Started</button>
          <button className="hero-btn-secondary">Learn More</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-graphic"></div>
      </div>
    </div>
  );
}

export default Home;
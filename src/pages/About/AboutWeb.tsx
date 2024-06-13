const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Game</h1>
      <p>Welcome to the About page of my exciting arcade game!</p>
      
      <div className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>3 Main Fighters with unique abilities and stats</li>
          <li>Multiple game modes including LocalPlay, NetPlay (Still in construction...), and PracticePlay</li>
        </ul>
      </div>
      
      <div className="team-section">
        <h2>The Developer:</h2>
        <p>Álvaro José Granados Valencia</p>
      </div>
      
      <div className="mission-section">
        <h2>My Mission</h2>
        <p>Create a completely free open source game </p>
      </div>
    </div>
  );
};

export default About;

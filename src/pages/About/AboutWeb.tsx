const About = () => {
    return (
        <>
            <div className="container-fluid my-4 d-flex align-items-center justify-content-center text-white">
                <div className="text-center">
                    <h1 className="display-4 mb-4">About the proyect</h1>
                    <div className="about-container">
                        <p>Welcome to the About page of my exciting arcade game!</p>

                        <div className="team-section">
                            <h2>The Developer:</h2>
                            <p className="lead">Álvaro José Granados Valencia</p>
                        </div>

                        <div className="mission-section">
                            <h2>Why did you do this?</h2>
                            <p>I wanted to give something back to the gaming community</p>
                            <p>I wanted to know my limits aswell. And I definetely found them haha. I had to learn typescript from scratch to be able to use Phaser efficiently.</p>
                            <p>Not only that but I had to learn to use supabase aswell and synchronise all the technologies together</p>
                        </div>

                        <div className="techstack-section">
                            <h2>Tech Stack</h2>
                            <p>I used Vite + React + Phaser + Supabase + Typescript</p>
                        </div>

                        <div className="whatlearned-section">
                            <h2>What did you learn?</h2>
                            <p>Managing time for this kind of proyects is difficult. It was my first time doing this kind of proyect. And it took a big toll on the overall quality of the page. But I am happy with how much I learned...</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default About;

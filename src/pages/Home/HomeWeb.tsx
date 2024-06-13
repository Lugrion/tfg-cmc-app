import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="container-fluid text-white">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <div className="mt-4">
                        <h1 className="display-4">Welcome to C.M.C. Home!!</h1>
                        <h2 className="display-6">It's good to see you back...</h2>
                        <div className="mt-5">
                            <Link to="/play-ccm" className="btn btn-primary btn-lg">Play the Game!!</Link>
                            <h3 className="p-4 display-6">Game Assets:</h3>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="card bg-secondary">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Assets for Core</h5>
                                            <a href="https://pixelfrog-assets.itch.io/pixel-adventure-1" className="text-white text-decoration-none">
                                                <img src="/assets/core.gif" alt="core-asset-gif" className="img-fluid mt-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="card bg-secondary">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Assets for Mantle</h5>
                                            <a href="https://creativekind.itch.io/nightborne-warrior" className="text-white text-decoration-none">
                                                <img src="/assets/mantle.gif" alt="mantle-asset-gif" className="img-fluid mt-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="card bg-secondary">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Asset for Crust</h5>
                                            <a href="https://luizmelo.itch.io/martial-hero" className="text-white text-decoration-none">
                                                <img src="/assets/crust.gif" alt="crust-asset-gif" className="img-fluid mt-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="card bg-secondary">
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Asset for Backgrounds</h5>
                                            <a href="https://norma-2d.itch.io/space-backgrounds-pack" className="text-white text-decoration-none">
                                                <img src="/assets/bg.png" alt="space-background-asset-img" className="img-fluid mt-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3>GitHub Repository:</h3>
                            <p><a href="https://github.com/Lugrion/tfg-cmc-app" className="text-white">Open sourced!</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

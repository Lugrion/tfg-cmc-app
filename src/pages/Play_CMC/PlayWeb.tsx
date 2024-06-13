import { Link } from "react-router-dom";
import GameApp from "../../cmc-main-game/GameWrapper";
import useSession from "../../hooks/useSession";

const Play = () => {
    const { session } = useSession();

    return (
        session ? (
            <div className="d-flex justify-content-center align-items-center">
                <GameApp />
            </div>
        ) : (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
                <div className="alert alert-warning" role="alert">
                    <h1 className="mb-4">Please Login to Play</h1>
                    <p className="description mb-3">
                        <Link to="/account/signup" className="btn btn-primary">Don't have an account? Sign Up</Link>
                    </p>
                    <p className="description mb-3">
                        <Link to="/account/login" className="btn btn-secondary">Login to your account</Link>
                    </p>
                    <p className="description mb-3">
                        <Link to="/account/pwd_reset" className="btn btn-danger">Forgot your Password?</Link>
                    </p>
                </div>
            </div>
        )
    );
};

export default Play;

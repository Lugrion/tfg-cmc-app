import { Link } from "react-router-dom";
import GameApp from "../../cmc-main-game/GameWrapper";
import useSession from "../../hooks/useSession";

const Play = () => {
    const { session } = useSession()

    return (
        session ?
            <div>
                <GameApp />
            </div>

            :

            <div>
                <h1>Please Login to play</h1>
                <p className="description">
                    <Link to="/account/signup">Don't have an account?</Link>
                </p>
                <p className="description">
                    <Link to="/account/login">Login to your account</Link>
                </p>
                <p className="description">
                    <Link to="/account/pwd_reset">Forgot your Password?</Link>
                </p>
            </div>
    );
};

export default Play;

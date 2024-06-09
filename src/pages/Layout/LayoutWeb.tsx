import { Outlet, Link } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { supabase } from "../../components/SupaBase/supabaseClient";


const Layout = () => {
    const { session } = useSession()

    return (
        <>
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/play-ccm">Play CCM</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        {
                            session ?
                                <>
                                    <button type="button" onClick={() => supabase.auth.signOut()}> Log Out </button>
                                    <li>
                                        <Link to="/account/profile">My Profile</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link to="/account/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/account/signup">Sign Up</Link>
                                    </li>
                                </>
                        }

                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;

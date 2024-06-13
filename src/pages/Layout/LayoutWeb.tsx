import { Outlet, Link } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { supabase } from "../../components/SupaBase/supabaseClient";


const Layout = () => {
    const { session } = useSession()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src="/favicon.png" alt="Brand" width="30" height="30" className="d-inline-block align-text-top me-2" />
                        <span>C. M. C.</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/play-ccm">Play CCM</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/about">About</Link>
                            </li>
                            {session ? (
                                <>
                                    <li className="nav-item">
                                        <button className="btn btn-outline-light" type="button" onClick={() => supabase.auth.signOut()}>Log Out</button>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/account/profile">My Profile</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/account/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-light" to="/account/signup">Sign Up</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;

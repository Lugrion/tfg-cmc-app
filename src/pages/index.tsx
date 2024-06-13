import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/LayoutWeb";
import NoPage from "./Error/NoPage";
import Home from "./Home/HomeWeb";
import About from "./About/AboutWeb";
import SignUp from "./Account/SignUp/SignUpWeb";
import Login from "./Account/Login/LoginWeb";
import Profile from "./Account/Profile/ProfileWeb";
import ResetPasswd from "./Account/PasswordReset/ResetPasswd";
import useSession from "../hooks/useSession";
import Play from "./Play_CMC/PlayWeb";




function Index() {
    const { session } = useSession()

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="play-ccm" element={<Play />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />

                    {/* Account */}
                    <Route path="account/profile" element={session ? <Profile /> : <Navigate to="/account/login" />} />

                    <Route path="account/login" element={session ? <Navigate to="/account/profile" /> : <Login />} />
                    <Route path="account/signup" element={session ? <Navigate to="/account/profile" /> : <SignUp />} />
                    <Route path="account/pwd_reset" element={<ResetPasswd />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Index;
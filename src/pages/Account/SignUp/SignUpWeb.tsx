import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../components/SupaBase/supabaseClient";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:5173/',
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('SignUp Email sent!!');
        }
        setLoading(false);
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="form-widget p-4 bg-dark text-light rounded">
                    <h1 className="text-center mb-4">CCM Sign Up</h1>
                    <p className="text-center mb-4">Minimum of 6 characters. Using letters and numbers.</p>
                    <form onSubmit={handleSignUp}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Your email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Your Password"
                                value={password}
                                required
                                onChange={(e) => setPwd(e.target.value)}
                            />
                        </div>
                        {message && (
                            <div className={`alert ${message.includes('sent') ? 'alert-success' : 'alert-danger'}`} role="alert">
                                {message}
                            </div>
                        )}
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? 'Loading...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-3 text-center">
                        <Link to="/account/login" className="d-block text-light">Already have an account?</Link>

                        <Link to="/account/pwd_reset" className="d-block text-light">Forgot your Password?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../components/SupaBase/supabaseClient";
import useSession from "../../../hooks/useSession";


export default function Login() {
    const { loading, setLoading } = useSession()


    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [message, setMessage] = useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage(error.message)
        } else {
            setMessage('Logged in!!!')
        }
        setLoading(false)

    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="form-widget p-4 bg-dark text-light rounded">
                    <h1 className="header text-center mb-4">CMC Login</h1>
                    <p className="description text-center mb-4">Sign into CMC!!</p>
                    <form className="form-widget" onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Your email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
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
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading ? 'Loading' : 'Login'}
                            </button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="/account/signup" className="d-block text-light">Don't have an account?</Link>
                            <Link to="/account/pwd_reset" className="d-block text-light">Forgot your Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

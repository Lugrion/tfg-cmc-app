import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../components/SupaBase/supabaseClient";

export default function SignUp() {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [message, setMessage] = useState<string | null>(null);


    const handleSignUp = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:5173/',
            },
        })

        if (error) {
            setMessage(error.error_description || error.message)
        } else {
            setMessage('SignUp Email sent!!')
        }
        setLoading(false)
    }

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">CCM Registration</h1>
                <p className="description">Sign Up to CCM!!</p>
                <form className="form-widget" onSubmit={handleSignUp}>
                    <div>
                        <input
                            className="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="inputField"
                            type="password"
                            placeholder="Your Password"
                            value={password}
                            required={true}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>
                    {message ? <p className="message">{message}</p> : <></>}
                    <p className="description">
                        <Link to="/account/login">Already have an account?</Link>
                    </p>
                    <p className="description">
                        <Link to="/account/pwd_reset">Forgot your Password?</Link>
                    </p>
                    <div>
                        <button className={'button block'} disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Sign Up</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

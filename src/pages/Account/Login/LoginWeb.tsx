import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../components/SupaBase/supabaseClient";
import useSession from "../../../hooks/useSession";


export default function Login() {
    const { loading, setLoading } = useSession()


    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [message, setMessage] = useState<string | null>(null);

    const handleLogin = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        const { error }  = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage(error.error_description || error.message)
        } else {
            setMessage('Logged in!!!')
        }
        setLoading(false)

    }

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">CCM Login</h1>
                <p className="description">Sign into CCM!!</p>
                <form className="form-widget" onSubmit={handleLogin}>
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
                        <Link to="/account/signup">Don't have an account?</Link>
                    </p>
                    <p className="description">
                        <Link to="/account/pwd_reset">Forgot your Password?</Link>
                    </p>
                    <div>
                        <button className={'button block'} disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Login</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

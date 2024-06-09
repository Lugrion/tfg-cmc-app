import { useState } from "react";
import { supabase } from "../../../components/SupaBase/supabaseClient";
import useSession from "../../../hooks/useSession";

export default function ResetPasswd() {

    const { session, loading, setLoading } = useSession()
    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState<string | null>(null);

    const handleResetPassword = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        setLoading(true)
        const { error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: 'http://localhost:5173/account/pwd_reset',
            }
        )

        if (error) {
            setMessage(error.error_description || error.message)
        } else {
            setMessage('Email sent!!!');
        }
        setLoading(false)
    }

    return (
        <div className="row flex flex-center">
            <h1>Forgotten Password?</h1>
            {
                session ?


                    <div className="col-6 form-widget">
                        <h2 className="header">Change you CCM Account Password</h2>
                        <p className="description">New password</p>
                        <form className="form-widget" onSubmit={handleResetPassword}>
                            <div>
                                <input
                                    className="inputField"
                                    type="password"
                                    placeholder="Your new Password"
                                    value={password}
                                    required={true}
                                    onChange={(e) => setPwd(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    className="inputField"
                                    type="password"
                                    placeholder="Confirm new Password"
                                    value={confirmPassword}
                                    required={true}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button className={'button block'} disabled={loading}>
                                    {loading ? <span>Loading</span> : <span>Change</span>}
                                </button>
                            </div>
                        </form>
                    </div>


                    :

                    
                    <div className="col-6 form-widget">
                        <h2 className="header">Send confirmation email to your Email CCM Account</h2>
                        <p className="description">Check your inbox!!</p>
                        <form className="form-widget" onSubmit={handleResetPassword}>
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
                            {message ? <p className="message">{message}</p> : <></>}
                            <div>
                                <button className={'button block'} disabled={loading}>
                                    {loading ? <span>Loading</span> : <span>Sent</span>}
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}

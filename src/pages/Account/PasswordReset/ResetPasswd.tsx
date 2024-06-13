import { useState } from "react";
import { supabase } from "../../../components/SupaBase/supabaseClient";
import useSession from "../../../hooks/useSession";

export default function ResetPasswd() {

    const { session, loading, setLoading } = useSession()
    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState<string | null>(null);

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        setLoading(true)
        const { error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                // To be changed when deployed
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
        <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="form-widget p-4 bg-dark text-light rounded">
                    <h1 className="header text-center mb-4">Forgotten Password?</h1>
                    {session ? (
                        <div>
                            <p className="description text-center mb-4">Change your CCM Account Password</p>
                            <form className="form-widget" onSubmit={handleResetPassword}>
                                <div className="mb-3">
                                    <label htmlFor="new-password" className="form-label">New Password</label>
                                    <input
                                        id="new-password"
                                        className="form-control"
                                        type="password"
                                        placeholder="Your new Password"
                                        value={password}
                                        required
                                        onChange={(e) => setPwd(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirm-password" className="form-label">Confirm New Password</label>
                                    <input
                                        id="confirm-password"
                                        className="form-control"
                                        type="password"
                                        placeholder="Confirm new Password"
                                        value={confirmPassword}
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                {message && <p className="alert alert-info">{message}</p>}
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Loading' : 'Change'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <p className="description text-center mb-4">Send confirmation email to your CCM Account</p>
                            <form className="form-widget" onSubmit={handleResetPassword}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        id="email"
                                        className="form-control"
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {message && (
                                    <div className={`alert ${message.includes('sent') ? 'alert-success' : 'alert-danger'}`} role="alert">
                                        {message}
                                    </div>
                                )}
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Loading' : 'Sent'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

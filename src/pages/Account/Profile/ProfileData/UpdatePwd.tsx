import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../../../components/SupaBase/supabaseClient";

export default function UpdatePasswd() {

    const [loading, setLoading] = useState(false)
    const [password, setPwd] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password
        })

        if (error) {
            setMessage(error.error_description || error.message)
        } else {
            setMessage('Password changed!!!');
            <Navigate to="/account/profile" />
        }
        setLoading(false)
    }

    return (

        <div className="card bg-dark text-light mt-3 p-4">
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Change your CCM Account Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Your new Password"
                            value={password}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Repeat password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-control"
                            placeholder="Confirm new Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {message && <div className="alert alert-info">{message}</div>}
                    <button className="btn btn-primary w-100" disabled={loading} type="submit">
                        {loading ? 'Loading...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>

    )
}

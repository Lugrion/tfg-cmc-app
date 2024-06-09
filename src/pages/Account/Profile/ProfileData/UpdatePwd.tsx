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
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h2 className="header">Change your CCM Account Password</h2>
                <form className="form-widget" onSubmit={handleResetPassword}>
                    <p className="description">New password</p>
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
                    <p className="description">Repeat password</p>
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
                    {message ? <p className="message">{message}</p> : <></>}
                    <button className="button" disabled={loading} type="submit">
                        {loading ? 'Loading' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    )
}

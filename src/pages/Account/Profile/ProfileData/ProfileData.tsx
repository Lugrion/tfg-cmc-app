import { useState } from "react";
import Avatar from "../../../../components/SupaBase/Avatar";
import { supabase } from "../../../../components/SupaBase/supabaseClient";
import useGetProfile from "../../../../hooks/useGetProfile";
import useSession from "../../../../hooks/useSession";

export default function ProfileData() {
    const { session } = useSession()
    const { username, setUsername, description, setDescription, avatar_url, setAvatarUrl, loading, setLoading } = useGetProfile()
    const [message, setMessage] = useState<string | null>(null);

    const handleUpdateProfile = async (event: Event, avatarUrl: string) => {
        event.preventDefault();

        setLoading(true);


        const { user } = session;

        const updates = {
            id: user.id,
            username,
            description,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            setMessage(error.error_description || error.message)
        } else {
            setAvatarUrl(avatarUrl);
            setMessage('Updated succesfully!!')
        }
        setLoading(false);
    }

    return (
        session ?
            <div className="card bg-dark text-light">
                <div className="card-body">
                    <form onSubmit={handleUpdateProfile} className="form-widget p-4 bg-dark text-light rounded">
                        <div className="row mt-3 justify-content-center">
                            <div className="col-md-4 text-center">
                                <h1 className="text-light">My Profile</h1>
                                <Avatar
                                    url={avatar_url}
                                    size={200}
                                    onUpload={(event: Event, url: string) => {
                                        handleUpdateProfile(event, url);
                                    }}
                                />
                                {message && <p className="alert alert-info mt-3">{message}</p>}
                            </div>
                            <div className="col-md-8">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input id="email" type="text" className="form-control" value={session.user.email} disabled />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        required
                                        value={username || ""}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input
                                        id="description"
                                        type="text"
                                        className="form-control"
                                        value={description || ""}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" type="submit" disabled={loading}>
                                        {loading ? "Loading ..." : "Update"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            :

            <></>
    );

}
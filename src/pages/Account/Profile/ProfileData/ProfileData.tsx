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

            <form  onSubmit={handleUpdateProfile} className="form-widget">
                <div>
                    <Avatar
                        url={avatar_url}
                        size={150}
                        onUpload={(event: Event, url: string) => {
                            handleUpdateProfile(event, url);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" value={session.user.email} disabled />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        required
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {message ? <p className="message">{message}</p> : <></>}
                <div>
                    
                    <button
                        className="button block primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading ..." : "Update"}
                    </button>
                </div>

                
            </form>

            :

            <></>
    );

}
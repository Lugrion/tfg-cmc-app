import { useEffect, useState } from "react";
import useSession from "./useSession";
import { supabase } from "../components/SupaBase/supabaseClient";


export default function useGetProfile(): {
    username: string | null,
    setUsername: React.Dispatch<React.SetStateAction< string | null>>, 
    description: string | null, 
    setDescription: React.Dispatch<React.SetStateAction< string | null>>,
    avatar_url: string | null
    setAvatarUrl: React.Dispatch<React.SetStateAction< string | null>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
} {

    const { session, loading, setLoading } = useSession()
    const [username, setUsername] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function getProfile() {

            setLoading(true);

            if (session && session.user) {
                const { user } = session;

                const { data, error } = await supabase
                    .from("profiles")
                    .select(`username, description, avatar_url`)
                    .eq("id", user.id)
                    .single();

                if (!ignore) {
                    if (error) {
                        console.warn(error);
                    } else if (data) {
                        setUsername(data.username);
                        setDescription(data.description);
                        setAvatarUrl(data.avatar_url);
                    }
                }
            }

            setLoading(false);
        }

        getProfile();

        return () => {
            ignore = true;
        };
    }, [session, setLoading]);

    return { username, setUsername, description, setDescription, avatar_url, setAvatarUrl, loading, setLoading}
}

import { useEffect, useState } from "react";
import useSession from "./useSession";
import { supabase } from "../components/SupaBase/supabaseClient";

type fighterKeyControls = {
    goJump: string,
    goLeft: string,
    goRight: string,
    basicAttackKey: string
}

export default function useGetControls(): {
    p1Controls: fighterKeyControls | null,
    setp1Controls: React.Dispatch<React.SetStateAction<fighterKeyControls | null>>,
    p2Controls: fighterKeyControls | null,
    setp2Controls: React.Dispatch<React.SetStateAction<fighterKeyControls | null>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
} {

    const { session, loading, setLoading } = useSession()
    const [p1Controls, setp1Controls] = useState<fighterKeyControls | null>(null);
    const [p2Controls, setp2Controls] = useState<fighterKeyControls | null>(null);

    useEffect(() => {
        let ignore = false;

        async function getControls() {

            setLoading(true);

            if (session && session.user) {
                const { user } = session;

                const { data, error } = await supabase
                    .from("user_conf")
                    .select(`p1controls, p2controls`)
                    .eq("user_id", user.id)
                    .single();

                if (!ignore) {
                    if (error) {
                        console.warn(error);
                    } else if (data) {
                        setp1Controls(data.p1controls);
                        setp2Controls(data.p2controls);
                    }
                }
            }

            setLoading(false);
        }

        getControls();

        return () => {
            ignore = true;
        };
    }, [session, setLoading]);

    return { p1Controls, setp1Controls, p2Controls, setp2Controls, loading, setLoading }
}
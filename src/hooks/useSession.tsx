import { useState, useEffect } from 'react'
import { supabase } from "../components/SupaBase/supabaseClient";
import { Session } from '@supabase/supabase-js';

export default function useSession(): { session: Session | null, setSession: React.Dispatch<React.SetStateAction<Session | null>>, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>> } {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                setSession(session)
            })
            .finally(() => setLoading(false))

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoading(false)
        })
    }, [])

    return { session, setSession, loading, setLoading };
}
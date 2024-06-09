import { useEffect, useState } from "react";
import useGetControls from "../../../../hooks/useGetControls";
import useSession from "../../../../hooks/useSession";
import { supabase } from "../../../../components/SupaBase/supabaseClient";

type fighterKeyControls = {
    goJump: string,
    goLeft: string,
    goRight: string,
    basicAttackKey: string
}

export default function ControlsData() {
    const { session } = useSession();
    const { p1Controls, setp1Controls, p2Controls, setp2Controls, loading, setLoading } = useGetControls();
    const [p1ControlsObj, setP1ControlsObj] = useState<fighterKeyControls>({
        goJump: '',
        goLeft: '',
        goRight: '',
        basicAttackKey: ''
    });
    const [p2ControlsObj, setP2ControlsObj] = useState<fighterKeyControls>({
        goJump: '',
        goLeft: '',
        goRight: '',
        basicAttackKey: ''
    });

    useEffect(() => {
        if (p1Controls) {
            console.log("p1Controls:", p1Controls);
            setP1ControlsObj(p1Controls);
        }
        if (p2Controls) {
            console.log("p2Controls:", p2Controls);
            setP2ControlsObj(p2Controls);
        }
    }, [p1Controls, p2Controls]);

    const handleUpdateControls = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const { user } = session;

        const updates = {
            user_id: user.id,
            p1controls: p1ControlsObj,
            p2controls: p2ControlsObj
        };

        const { error } = await supabase.from("user_conf").upsert(updates);

        if (error) {
            alert(error.message);
        }

        setLoading(false);
    }

    const handleChangeP1Controls = (key: keyof fighterKeyControls, value: string) => {
        setP1ControlsObj(prevState => ({
            ...prevState,
            [key]: value
        }));
        setp1Controls({
            ...p1ControlsObj,
            [key]: value
        });
    }

    const handleChangeP2Controls = (key: keyof fighterKeyControls, value: string) => {
        setP2ControlsObj(prevState => ({
            ...prevState,
            [key]: value
        }));
        setp2Controls({
            ...p2ControlsObj,
            [key]: value
        });
    }

    return (
        session ?
            <>
                <h2 className="header">Update your CCM Controls</h2>

                <form onSubmit={handleUpdateControls} className="form-widget">
                    <div>
                        <h3 className="header">Controls P1</h3>

                        <label htmlFor="goJump-p1">Jump</label>
                        <input
                            id="goJump-p1"
                            list="phaser-keys"
                            required
                            value={p1ControlsObj.goJump}
                            onChange={(e) => handleChangeP1Controls('goJump', e.target.value)}
                        />

                        <label htmlFor="goLeft-p1">Move left</label>
                        <input
                            id="goLeft-p1"
                            list="phaser-keys"
                            required
                            value={p1ControlsObj.goLeft}
                            onChange={(e) => handleChangeP1Controls('goLeft', e.target.value)}
                        />

                        <label htmlFor="goRight-p1">Move Right</label>
                        <input
                            id="goRight-p1"
                            list="phaser-keys"
                            required
                            value={p1ControlsObj.goRight}
                            onChange={(e) => handleChangeP1Controls('goRight', e.target.value)}
                        />
                        <label htmlFor="basicAttackKey-p1">Basic Attack</label>
                        <input
                            id="basicAttackKey-p1"
                            list="phaser-keys"
                            required
                            value={p1ControlsObj.basicAttackKey}
                            onChange={(e) => handleChangeP1Controls('basicAttackKey', e.target.value)}
                        />

                        <h3 className="header">Controls P2</h3>

                        <label htmlFor="goJump-p2">Jump</label>
                        <input
                            id="goJump-p2"
                            list="phaser-keys"
                            required
                            value={p2ControlsObj.goJump}
                            onChange={(e) => handleChangeP2Controls('goJump', e.target.value)}
                        />

                        <label htmlFor="goLeft-p2">Move left</label>
                        <input
                            id="goLeft-p2"
                            list="phaser-keys"
                            required
                            value={p2ControlsObj.goLeft}
                            onChange={(e) => handleChangeP2Controls('goLeft', e.target.value)}
                        />

                        <label htmlFor="goRight-p2">Move Right</label>
                        <input
                            id="goRight-p2"
                            list="phaser-keys"
                            required
                            value={p2ControlsObj.goRight}
                            onChange={(e) => handleChangeP2Controls('goRight', e.target.value)}
                        />
                        <label htmlFor="basicAttackKey-p2">Basic Attack</label>
                        <input
                            id="basicAttackKey-p2"
                            list="phaser-keys"
                            required
                            value={p2ControlsObj.basicAttackKey}
                            onChange={(e) => handleChangeP2Controls('basicAttackKey', e.target.value)}
                        />


                        <button type="submit" disabled={loading}>Update Controls</button>
                    </div>
                </form>

                {/* Datalist for Phaser keys */}
                <datalist id="phaser-keys">
                    <option value={'A'} />
                    <option value={'D'} />
                    <option value={'W'} />
                    <option value={'SPACE'} />
                    <option value={'LEFT'} />
                    <option value={'RIGHT'} />
                    <option value={'UP'} />
                    <option value={'DOWN'} />
                    <option value={'ENTER'} />
                </datalist>
            </>
            :
            null
    );
}

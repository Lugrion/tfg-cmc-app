import { useRef, useState } from 'react';
import { CMC_Game } from './CMC_Game';
import SceneRenderer from './Scene-React-Components/SceneComponentsManager';

function GameApp() {
    const phaserRef = useRef();
    const [currentSceneName, setCurrentSceneName] = useState('');
    
    const updateCurrentScene = (scene) => {
        setCurrentSceneName(scene.scene.key);
    }

    return (
        <div id="app">
            <CMC_Game ref={phaserRef} updateActiveScene={updateCurrentScene}/>
            <div id='scene-components'>
                <SceneRenderer currentSceneName={currentSceneName} />
            </div>
        </div>
    )
}

export default GameApp;

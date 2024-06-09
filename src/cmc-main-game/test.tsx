import { forwardRef, useLayoutEffect, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StartGame from './Config/main_conf';
import { EventBus } from './Config/EventBus';

export const CMC_Game = forwardRef(function CMC_Game({ currentActiveScene }, ref) {
    const game = useRef();

    useLayoutEffect(() => {
        if (!game.current) {
            game.current = StartGame("game-container");
            ref?.current?.scene = null; // Optional chaining for safer access
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = undefined;
            }
        };
    }, [ref]);

    useLayoutEffect(() => {
        const handleSceneReady = (currentScene) => {
            if (typeof currentActiveScene === 'function') {
                currentActiveScene(currentScene);
            }
            ref?.current?.scene = currentScene; // Optional chaining for safer access
        };

        EventBus.on('current-scene-ready', handleSceneReady);

        return () => {
            EventBus.removeListener('current-scene-ready', handleSceneReady);
        };
    }, [currentActiveScene, ref]);

    return <div id="game-container"></div>;
});

// Props definitions
CMC_Game.propTypes = {
    currentActiveScene: PropTypes.func,
};

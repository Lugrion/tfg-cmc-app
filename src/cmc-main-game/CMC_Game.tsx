import PropTypes from 'prop-types';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './Config/main_conf';
import { EventBus } from './Config/EventBus';

export const CMC_Game = forwardRef(function CMC_Game ({ updateActiveScene }, ref)
{
    const game = useRef();

    // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
    useLayoutEffect(() => {
        
        if (game.current === undefined)
        {
            game.current = StartGame("game-container");
            
            if (ref !== null)
            {
                ref.current = { game: game.current};
            }
        }

        return () => {

            if (game.current)
            {
                game.current.destroy(true);
                game.current = undefined;
            }

        }
    }, [ref]);

    useEffect(() => {

        EventBus.on('current-scene-ready', (currentScene : Phaser.Scene) => {

            if (updateActiveScene instanceof Function)
            {
                updateActiveScene(currentScene);
            }
            ref.current.scene = currentScene;
            
        });

        return () => {

            EventBus.removeListener('current-scene-ready');

        }
        
    }, [updateActiveScene, ref])

    return (
        <div id="game-container"></div>
    );

});

// Props definitions
CMC_Game.propTypes = {
    updateActiveScene: PropTypes.func 
}

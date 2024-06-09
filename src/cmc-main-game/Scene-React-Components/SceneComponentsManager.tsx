import MainMenu from "./3-MainMenu/MainMenu";

import NetPlay from "./4-GameModes/1-NetPlay/NetPlay";
import NetSelect from "./4-GameModes/1-NetPlay/NetSelect";
import NetOver from "./4-GameModes/1-NetPlay/NetOver";

import LocalPlay from "./4-GameModes/2-LocalPlay/LocalPlay";
import LocalSelect from "./4-GameModes/2-LocalPlay/LocalSelect";
import LocalOver from "./4-GameModes/2-LocalPlay/LocalOver";
import PracticePlay from "./4-GameModes/3-Practice/PracticePlay";


function SceneRenderer({ currentSceneName }) {

    switch (currentSceneName) {
        case 'Preloader':
            return <><h1>Preloader</h1></>;
        case 'Boot':
            return <><h1>Boot</h1></>;


        case 'MainMenu':
            return <MainMenu />;

        case 'NetPlay':
            return <NetPlay />
        case 'NetSelect':
            return <NetSelect />
        case 'NetOver':
            return <NetOver />


        case 'LocalPlay':
            return <LocalPlay />;
        case 'LocalSelect':
            return <LocalSelect />;
        case 'LocalOver':
            return <LocalOver />;

        case 'PracticePlay':
            return <PracticePlay />;
        case 'PracticeSelect':
            return <PracticePlay />;
        default:
            return <></>;
    }
}

export default SceneRenderer;

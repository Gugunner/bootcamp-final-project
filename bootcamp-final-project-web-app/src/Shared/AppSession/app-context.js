import React, {createContext, useState} from "react";
import world from "../../Data/custom_world.geo.json";
import { getAllStartups } from "../../Utils/services";

export const BootcampAppContext = createContext(undefined);

const BootcampFinalProjectContextProvider = (props) => {
    const [startupDir, setStartupDir] = useState(() => []);

    const filterStartupsLATAM = (feature, layer) => {
        const { name } = feature.properties;
        const startupsFound = startupDir.startups.filter(stp => stp.hq === name );
        if(startupsFound.length > 0) {
            let startupContent = "";
            for(let i = 0; i < startupsFound.length; i++) {
                const startupString = `<li>${startupsFound[i].name}</li>`;
                startupContent += startupString;
            }
            startupContent = "<ul>"+startupContent+"</ul>"
            layer.bindPopup(startupContent);
        }
    };

    const addStartupInfoToCountry = (feature, layer) => {
        filterStartupsLATAM(feature, layer);
    };

    const getStartupDirs = async() => {
        const dir = await getAllStartups();
        if(dir) {
            setStartupDir(dir);
        }
    };

    return (
        <BootcampAppContext.Provider value={{
            world,
            addStartupInfoToCountry,
            startupDir,
            getStartupDirs
        }}>
            {props.children}
        </BootcampAppContext.Provider>
    )
};

export default BootcampFinalProjectContextProvider;
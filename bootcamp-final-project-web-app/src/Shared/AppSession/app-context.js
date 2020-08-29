import React, {createContext, useState} from "react";
import ReactDOMServer from 'react-dom/server';
import world from "../../Data/custom_world.geo.json";
import { getAllStartups } from "../../Utils/services";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
export const BootcampAppContext = createContext(undefined);

const BootcampFinalProjectContextProvider = (props) => {
    const [startupDir, setStartupDir] = useState(() => []);

    const filterStartupsLATAM = (feature, layer) => {
        const { name } = feature.properties;
        const startupsFound = startupDir.startups.filter(stp => stp.hq === name );
        console.log("Startups Found",startupsFound);
        const popupOptions = {
           autoPan: false
        };
        // ceo: "Luis Caviglia, Juan Ignacio Caviglia"
        // desc: "Saas platform focused on high-end restaurant management."
        // foundedDate: "2016"
        // hq: "Uruguay"
        // id: "5f497a74dafc926de6b32f75"
        // investors: "Andreessen Horowitz"
        // label: "None"
        // market: "Uruguay, United States"
        // name: "MEITRE"
        // sector: "SaaS"
        // stage: "Seed/Incubator"
        if(startupsFound.length > 0) {
            let startupContent = "";
            for(let i = 0; i < startupsFound.length; i++) {
                const {ceo, desc, foundedDate, hq, id, investors, label, market, name, sector, stage} = startupsFound[i];
                const startupString = `<tr>
                                            <td>${name}</td>
                                            <td>${desc}</td>
                                            <td>${sector}</td>
                                            <td>${stage}</td>
                                        </tr>`;
                startupContent += startupString;
            }
            startupContent = `<div class="startup-table">
                                <h3 class="sticky-country-header">Startups funded in ${name}</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="sticky-header">Name</th>
                                            <th class="sticky-header">Description</th>
                                            <th class="sticky-header">Sector</th>
                                            <th class="sticky-header">Stage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${startupContent}
                                    </tbody>
                                </table>
                            </div>`
            layer.bindPopup(startupContent,popupOptions);
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
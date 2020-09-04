import React, {createContext, useState} from "react";
import ReactDOMServer from 'react-dom/server';
import world from "../../Data/custom_world.geo.json";
import { getAllStartups, getLastYearCorrelation, predictNewYearCorrelation } from "../../Utils/services";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
export const BootcampAppContext = createContext(undefined);

const BootcampFinalProjectContextProvider = (props) => {
    const [startupDir, setStartupDir] = useState(() => []);
    const [mlData, setMLData] = useState(() => []);
    const [selCountry,setSelCountry] = useState(() => "");
    const filterStartupsLATAM = (feature, layer) => {
        const { name } = feature.properties;
        const startupsFound = startupDir.startups.filter(stp => stp.hq === name );
        const popupOptions = {
           autoPan: false
        };
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
            layer.on("mouseover",  () => {
                console.log("Layer", layer);
                layer.setStyle({
                    "fillColor": "rgb(72,137,247)",
                    "fillOpacity": 0.6
                })
            });
            layer.on("mouseout", () =>
                layer.setStyle({
                    "fillColor": "rgba(72,137,247,0.6)",
                    "fillOpacity": 0.2
                })
            );
            layer.on("click", () => {
                setSelCountry(name);
            });
            layer.bindPopup(startupContent,popupOptions);
        }
    };
    const addStartupInfoToCountry = (feature, layer) => {
        filterStartupsLATAM(feature, layer);
    };
    const getStartupDirs = async() => {
        const dir = await getAllStartups();
        if(dir) {
            console.log("Startups Dir", dir.startups);
            setStartupDir(dir);
        }
    };
    const getLastYear = async() => {
        const data = await getLastYearCorrelation();
        if(data) {
            console.log("Data ML", data);
            setMLData([data]);
        }
    };
    const predictNewYear = async(lastYearCorrelation) => {
        const data = await predictNewYearCorrelation(lastYearCorrelation);
        if(data) {
            setMLData([...mlData,data]);
        }
    }
    return (
        <BootcampAppContext.Provider value={{
            world,
            addStartupInfoToCountry,
            startupDir,
            getStartupDirs,
            getLastYear,
            predictNewYear,
            mlData,
            selCountry,
            setSelCountry
        }}>
            {props.children}
        </BootcampAppContext.Provider>
    );
};

export default BootcampFinalProjectContextProvider;
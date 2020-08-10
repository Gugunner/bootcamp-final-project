// @flow
import React, {useContext, useEffect, useState} from "react";
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BootcampAppContext } from "../../Shared/app-context";
// import * as d3 from "d3";
import { MAPBOX_API_URL } from "../../Shared/app-constants";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapStateHandler = () => {
    const [state, setState] = useState(() => ({
        lat: 9.1900,
        lng: -75.0152,
        zoom: 2
    }));
    return { state, setState};
};

const BootcampFinalProjectMap = () => {
    const { state } = MapStateHandler();
    const { startupDir, world, addStartupInfoToCountry } = useContext(BootcampAppContext);
    console.log(state);
    useEffect(() => {
        console.log("LATAM GEOJSON",world);
    },[world]);

    useEffect(() => {
        console.log("Startup Dir", startupDir);
    },[startupDir]);

    const position = [state.lat, state.lng];
    return (
        <Map center={position} zoom={state.zoom} class="project-map">
            <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url={MAPBOX_API_URL}
            />
            {
                startupDir.startups ?
                <GeoJSON data={world} onEachFeature={addStartupInfoToCountry}/> : ""
            }

        </Map>
    )
};

export default BootcampFinalProjectMap;
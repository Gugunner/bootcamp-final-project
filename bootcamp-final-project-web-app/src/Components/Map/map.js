import React, {useContext, useEffect, useState} from "react";
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BootcampAppContext } from "../../Shared/AppSession/app-context";
// import * as d3 from "d3";
import { MAPBOX_API_URL } from "../../Constants/app-constants";
import * as bounds from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapStateHandler = () => {
    const [state, setState] = useState(() => ({
        lat: 38.2307,
        lng: -101.5887,
        maxBoundsViscosity: 1.0,
        dragging: false,
        zoom: 2,
        minZoom: 2,
        maxZoom: 2
    }));
    return { state, setState};
};

const BootcampFinalProjectMap = () => {
    const { state } = MapStateHandler();
    const { startupDir, world, addStartupInfoToCountry } = useContext(BootcampAppContext);
    const position = [state.lat, state.lng];
    return (
        <Map
            center={position}
            zoom={state.zoom}
            minZoom={state.minZoom}
            maxZoom={state.maxZoom}
            maxBounds={state.maxBounds}
            maxBoundsViscosity={state.maxBoundsViscosity}
            dragging={state.dragging}
            class="project-map">
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
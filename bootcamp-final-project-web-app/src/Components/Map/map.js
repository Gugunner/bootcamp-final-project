// @flow
import React, {useEffect, useState} from "react";
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as d3 from "d3";
import world from "./custom_world.geo.json";
const acessToken = "pk.eyJ1IjoiZ3VndW5uZXIiLCJhIjoiY2tjbWxoamwzMDJmajJ4cWtsNHN6NjJkNiJ9.gTU76mp1kS4Rn7Kh5h67EQ";
const MAPBOX_API_URL = `https://api.mapbox.com/styles/v1/gugunner/ckdnjzx3i2ca61jmvld4f035x/tiles/256/{z}/{x}/{y}@2x?access_token=${acessToken}`

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
    console.log(state);
    useEffect(() => {
        console.log(world);
        // d3.json(geoJSONPath).then(data => console.log(data));
    },[])
    const position = [state.lat, state.lng];
    return (
        <Map center={position} zoom={state.zoom} class="project-map">
            <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url={MAPBOX_API_URL}
            />
            {/*<Marker position={position}>*/}
            {/*    <Popup>*/}
            {/*        A pretty CSS3 popup. <br /> Easily customizable.*/}
            {/*    </Popup>*/}
            {/*</Marker>*/}
            <GeoJSON data={world}/>
        </Map>
    )
};

export default BootcampFinalProjectMap;
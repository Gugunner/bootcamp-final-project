import { API_DEV_URL } from "../Constants/app-constants";
import axios from "axios";

export const getAllStartups = () => {
    return axios.get(`${API_DEV_URL}startups`).then(jsonResponse => {
        return jsonResponse ? jsonResponse.data : false;
    }).catch(e => {
        alert("Startup directory could not be loaded")
    return false
    });
};

export const getLastYearCorrelation = () => {
    return axios.get(`${API_DEV_URL}last-year`).then(jsonResponse => {
        return jsonResponse ? jsonResponse.data : false;
    }).catch(e => {
        alert("No ML Value found")
        return false;
    });
};

export const predictNewYearCorrelation = (lastYearCorrelation) => {
    return axios.post(`${API_DEV_URL}ml-value`, {
        ...lastYearCorrelation
    }).then(jsonResponse => {
        return jsonResponse ? jsonResponse.data : false;
    }).catch(e => {
        alert("No ML Value found")
        return false;
    });
};

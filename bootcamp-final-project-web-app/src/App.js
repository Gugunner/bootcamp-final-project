import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import BootcampFinalProjectMap from "./Components/Map/map";
import {BootcampAppContext} from "./Shared/app-context";

function App() {
    const { getStartupDirs } = useContext(BootcampAppContext);
    const [dataFetched, setDataFetched] = useState(() => false);
    useEffect(() => {
        if(!dataFetched) {
            getStartupDirs();
            setDataFetched(true);
        }
    },[dataFetched, getStartupDirs, setDataFetched])
  return (
    <div className="App">
      <BootcampFinalProjectMap />
    </div>
  );
}

export default App;

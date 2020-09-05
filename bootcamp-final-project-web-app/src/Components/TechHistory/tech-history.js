import React, {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import BootCampFinalProjectAnimatedBarChartCompanies from "../AnimatedBarchartCompanies/animated-bar-chart-companies";
import BootCampFinalProjectAnimatedBarChartCountries from "../AnimatedBarchartCompanies/animated-bar-chart-countries";
import Button from "@material-ui/core/Button";
import NonLinearSlider from "../../Shared/Slider/slider";
import {Typography} from "@material-ui/core";
import {BootcampAppContext} from "../../Shared/AppSession/app-context";

const BootcampFinalProjectTechHistory = () => {
    const [playCompanies,setPlayCompanies] = useState(() => false);
    const [currentYearCompanies, setCurrentYearCompanies] = useState(() => 1998);
    const [sliderYearCompanies, setSliderYearCompanies] = useState(() => 1998);
    const [playCountries, setPlayCountries] = useState(() => false);
    const [currentYearCountries, setCurrentYearCountries] = useState(() => 1996);
    const [sliderYearCountries, setSliderYearCountries] = useState(() => 1996);
    const handleTogglePlayCompanies = () => {
        setPlayCompanies(!playCompanies);
    };
    const handleTogglePlayCountries = () => {
        setPlayCountries(!playCountries);
    };
    const handleCurrentYearCompanies = (year) => {
        setCurrentYearCompanies(year);
    };
    const handleCurrentYearCountries = (year) => {
        setCurrentYearCountries(year);
    };
    const handleSliderYearCompanies = (year) => {
        setPlayCompanies(false);
        setSliderYearCompanies(year);
        setCurrentYearCompanies(year);
    };
    const handleSliderYearCountries = (year) => {
        setPlayCountries(false);
        setSliderYearCountries(year);
        setCurrentYearCountries(year);
    };
    const handleResetYearCompanies = () => {
        setPlayCompanies(false);
        setCurrentYearCompanies(1998);
        setSliderYearCompanies(1998);
    };
    const handleResetYearCountries = () => {
        setPlayCountries(false);
        setCurrentYearCountries(1996);
        setSliderYearCountries(1996);
    };
    return (
        <Grid item container spacing={2} style={{width: "100%", padding: "32px 32px", textAlign: "left"}}>
            <Grid item xs={6}>
                <Typography variant="h5" style={{color: "white", fontFamily: "Open Sans"}}>Most Valuable Companies By Market Cap from 2005-2020</Typography>
                <Typography variant="h6" style={{color: "white", fontFamily: "Open Sans", marginBottom: "16px"}}>Market Capitalization, $mm - Source: Bloomberg</Typography>
                <NonLinearSlider
                    sliderYear={sliderYearCompanies}
                    handleSliderYear={handleSliderYearCompanies}
                    minValue={1998}
                    maxValue={2020}
                />
                {
                    currentYearCompanies < 2020 ? (
                        <Button
                            variant="contained"
                            onClick={handleTogglePlayCompanies}
                            style={{marginRight: "16px", backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}}>
                            {playCompanies ? "Pause" : "Play"}
                        </Button>
                    ) : ""
                }
                {
                    playCompanies || currentYearCompanies === 2020 ? (
                        <Button
                            variant="contained"
                            onClick={handleResetYearCompanies}
                            style={{backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}}>
                            Reset
                        </Button>
                    ): ""
                }
                <div style={{height: "800px", width: "100%"}}>
                    <BootCampFinalProjectAnimatedBarChartCompanies
                        play={playCompanies}
                        currentYear={currentYearCompanies}
                        sliderYear={sliderYearCompanies}
                        handleCurrentYear={handleCurrentYearCompanies}
                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5" style={{color: "white", fontFamily: "Open Sans"}}>Countries With the Most Investment in Technology</Typography>
                <Typography variant="h6" style={{color: "white", fontFamily: "Open Sans", marginBottom: "16px"}}>Investment in Technology as % of GDP, % - Source: World Bank</Typography>
                <NonLinearSlider
                    sliderYear={sliderYearCountries}
                    handleSliderYear={handleSliderYearCountries}
                    minValue={1996}
                    maxValue={2018}
                />
                {
                    currentYearCountries < 2018 ? (
                        <Button
                            variant="contained"
                            onClick={handleTogglePlayCountries}
                            style={{marginRight: "16px", backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}}>
                            {playCountries ? "Pause" : "Play"}
                        </Button>
                    ) : ""
                }
                {
                    playCountries || currentYearCountries === 2018 ? (
                        <Button
                            variant="contained"
                            onClick={handleResetYearCountries}
                            style={{backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}}>
                            Reset
                        </Button>
                    ): ""
                }
                <div style={{height: "800px", width: "100%"}}>
                    <BootCampFinalProjectAnimatedBarChartCountries
                        play={playCountries}
                        currentYear={currentYearCountries}
                        sliderYear={sliderYearCountries}
                        handleCurrentYear={handleCurrentYearCountries}
                    />
                </div>
            </Grid>
        </Grid>
    )
};

export default BootcampFinalProjectTechHistory;
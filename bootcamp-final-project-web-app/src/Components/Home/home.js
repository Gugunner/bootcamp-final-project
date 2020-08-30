import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import BootCampFinalProjectAnimatedBarChartCompanies from "../AnimatedBarchartCompanies/animated-bar-chart-companies";
import BootCampFinalProjectAnimatedBarChartCountries from "../AnimatedBarchartCountries/animated-bar-chart-countries";
import Button from "@material-ui/core/Button";
import NonLinearSlider from "../../Shared/Slider/slider";
const BootcampFinalProjectHome = () => {
    const [play,setPlay] = useState(() => false);
    const [currentYear, setCurrentYear] = useState(() => 1998);
    const [sliderYear, setSliderYear] = useState(() => 1998);
    const handleTogglePlay = () => {
        setPlay(!play);
    };
    const handleCurrentYear = (year) => {
        console.log("Setting Current Year")
        setCurrentYear(year);
    };

    const handleSliderYear = (year) => {
        setPlay(false);
        setSliderYear(year);
        setCurrentYear(year);
    };

    const handleResetYear = () => {
        setPlay(false);
        setCurrentYear(1998);
        setSliderYear(1998);
    };
    return (
        <Grid item container spacing={0} style={{height: "100%", width: "100%"}}>
            <Grid item xs={12} style={{paddingTop: "20px"}}>
                <Grid container style={{textAlign: "left", padding: "0px 45px 0 45px"}}>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleTogglePlay} style={{marginRight: "16px", backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}}>{play ? "Pause" : "Play"}</Button>
                        {
                            play ? (
                                <Button variant="contained" onClick={handleResetYear} style={{backgroundColor: "rgba(72,137,247,0.6)", border: "1px solid rgb(72,137,247)", color: "white"}}>Reset</Button>
                            ): ""
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <NonLinearSlider sliderYear={sliderYear} handleSliderYear={handleSliderYear} />
                    </Grid>
                </Grid>
                <div style={{height: "100%", width: "100%", backgroundColor: "rgb(36,36,36)"}}>
                    <BootCampFinalProjectAnimatedBarChartCompanies play={play} currentYear={currentYear} sliderYear={sliderYear} handleCurrentYear={handleCurrentYear}/>
                    <BootCampFinalProjectAnimatedBarChartCountries play={play} />
                </div>
            </Grid>
        </Grid>
    )
};

export default BootcampFinalProjectHome;
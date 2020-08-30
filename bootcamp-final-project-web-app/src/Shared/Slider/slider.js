import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles((theme) => ({
    track: {
        color: "rgb(72,137,247)",
    }
}));
const NonLinearSlider = ({sliderYear, handleSliderYear, minValue, maxValue}) => {
    const classes = styles();
    const handleChange = (event, newValue) => {
        handleSliderYear(newValue);
    };

    useEffect(() => {
        console.log("Current Year in Slider", sliderYear);
    },[sliderYear]);

    return (
        <div style={{width: "100%"}}>
            <Typography id="non-linear-slider" gutterBottom style={{color: "white", fontFamily: "Open Sans"}}>
                Year
            </Typography>
            <Slider
                value={sliderYear}
                min={minValue}
                step={0.1}
                max={maxValue}
                scale={(x) => x}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
                className={classes.track}
            />
        </div>
    );
};

export default NonLinearSlider;
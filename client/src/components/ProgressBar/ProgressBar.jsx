import React from "react";
import "./ProgressBar.css";

// progress bar + min and max values
const ProgressBar = ({value, maxValue, minValue}) => {
    const ratio = value/maxValue;
    return (
        <div className="progressBarRow">
            <div className="progressBarContainer">
                <div
                    className="progressBar"
                    style={{
                        width: `${(ratio) * 100}%`, // Setting the width to 100%
                        backgroundColor: ratio >= 0.75 ? "green" : ratio >= 0.5 ? "lightgreen" : ratio >= 0.25 ? "orange" : "red", // Light green background color
                    }}
                />
            </div>
            <p>worst : {minValue} | best : {maxValue}</p>
        </div>
    );

}

export default ProgressBar;
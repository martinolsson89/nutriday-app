import React from 'react';
import '../App.css'; // Import your App.css for styling

const HomeButtons = ({ onClick, buttonText, tooltipText }) => {
    return (
        <div className="home-buttons">
            <div className="circle" onClick={onClick}>
                {buttonText}
                {tooltipText && <span className="tooltip">{tooltipText}</span>}
            </div>
        </div>
    );
};
export default HomeButtons;
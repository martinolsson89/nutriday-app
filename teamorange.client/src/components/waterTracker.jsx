import React, { useState, useEffect } from 'react';
import fullglas from '../img/fullglas.png';  
import emptyglas from '../img/emptyglas.png'; 
import '../App.css'; 

export default function WaterTracker() {
    const [glasses, setGlasses] = useState(() => {
        const storedGlasses = sessionStorage.getItem('glasses');
        return storedGlasses ? JSON.parse(storedGlasses) : [false, false, false, false, false, false, false, false];
    });

    const [currentVolume, setCurrentVolume] = useState(() => sessionStorage.getItem('currentVolume') || '');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const volumes = ['0,25L', '0,5L', '0,75L', '1L', '1,25L', '1,5L', '1,75L', '2L'];

    useEffect(() => {
        sessionStorage.setItem('glasses', JSON.stringify(glasses));
        const filledGlassesCount = glasses.filter(filled => filled).length;
        const newVolume = filledGlassesCount > 0 ? volumes[filledGlassesCount - 1] : '';
        setCurrentVolume(newVolume);
        sessionStorage.setItem('currentVolume', newVolume);
    }, [glasses]);

    const handleGlassClick = (index) => {
        const updatedGlasses = glasses.map((_, i) => i <= index);
        setGlasses(updatedGlasses);
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div className="water-tracker">
            <h1>Vatten</h1>
            <p>Använd vår enkla vatten-räknare för att hjälpa dig att öka ditt intag.</p>

            <div className="glasses-container">
                {glasses.map((filled, index) => (
                    <div
                        key={index}
                        className={`glass ${filled ? 'full' : 'empty'}`}
                        onClick={() => handleGlassClick(index)}
                    >
                        <img
                            src={filled ? fullglas : emptyglas}  // Use imported image variables
                            alt={filled ? 'Full glass' : 'Empty glass'}
                            className="glass-image"
                        />
                    </div>
                ))}
            </div>

            {glasses.every(glass => glass) ? (
                <p>Bra jobbat! Du har uppnått målet med att dricka 2L vatten, men glöm inte dricka mer om du är törstig eller tränar!</p>
            ) : (
                currentVolume && <p>Du har druckit: {currentVolume} vatten</p>
            )}

            <button className="water-button" onClick={togglePopup}>
                Lär dig mer om vatten
            </button>

            {isPopupVisible && (
                <div className="popup">
                    <p><strong>Vatten hjälper dig att tänka klart och behålla koncentrationen hela dagen:</strong></p>
                    <p>30% piggare och mer produktiv.</p>
                    <br />
                    <p><strong>Lättare, mer effektiv matsmältning:</strong></p>
                    <p>Vatten bidrar till bra flöden och hjälper dig smälta maten ordentligt.</p>
                    <br />
                    <p><strong>Vattendrickande gör dig gladare och mer alert:</strong></p>
                    <p>75% av hjärnan består av vatten.</p>
                    <br />
                    <p><strong>Vattendrickande bidrar till ett bra blodflöde genom kroppen och frigör gifter:</strong></p>
                    <p>92% av blodet består av vatten.</p>
                </div>
            )}
        </div>
    );
}

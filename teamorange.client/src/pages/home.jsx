
import { useNavigate } from 'react-router-dom';
import HomeButtons from '../components/homebuttons';
import React, { useState, useEffect } from 'react';



export default function Home() {
    const [quote, setQuote] = useState('');
    const navigate = useNavigate();

    const quotes = [
        "Framgång är summan av små steg, repeterat dag in och dag ut.",
        "Den enda dåliga träningen är den som inte hände.",
        "Kolla inte på klockan; gör som den gör. Fortsätt vidare.",
        "Framtiden beror på vad du gör idag.",
        "Kämpa på, för ingen kommer att göra det åt dig.",
        "Disciplin är att välja vad du vill ha nu gentemot vad du vill ha mest.",
        "Det enda sättet att uppnå det omöjliga är genom att tro att det är möjligt.",
        "Varje steg framåt, oavsett storlek, är framgång.",
        "Framgång uppnås inte med vad du gör då och då, men genom konsistens."
    ];

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    const handleNavigateToProducts = () => {
        navigate('/products');

    };

    const handleNavigateToAbout = () => {
        navigate('/about');

    };



    return (
        <div className="container home-sections">
            <div className="motivation-quote">
                <p style={{ fontSize: '26px', fontStyle: 'italic' }}>"{quote}"</p>
            </div>

        {/* First Section: Sök Mat */}

            <div className="section">
          <HomeButtons
            buttonText="Till matlistan"
            onClick={handleNavigateToProducts}
            tooltipText="Klicka här för att gå till matlistan"
          />
                <div className="text-section">
                    <h2 className="section-title">Matsökning, näringsämnen & vatten</h2>
                    <p className="section-description">
                        Med vår sökfunktion kan du snabbt hitta mat från Livsmedelsverket och spåra den direkt.
                        Justera mängden enkelt för exakt uppföljning av ditt intag. Spåra hur mycket vatten du dricker!
                    </p>
                </div>  
                

            </div>

            {/* Second Section: About */}
            <div className="section">
                <div className="image-section">
                    <HomeButtons
                        buttonText="Om oss"
                        onClick={handleNavigateToAbout}
                        tooltipText="Klicka här för att gå till Om oss"
                    />

                </div>
                <div className="text-section">
                    <h2 className="section-title">Om oss</h2>
                    <p className="section-description">
                        NutriDay guidar dig genom din resa med exakt kalori- och näringsämnesdata. Läs mer om oss här!
                    </p>
                </div>

            </div>
        </div>



    );
}



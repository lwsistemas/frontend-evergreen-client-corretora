import React, { useEffect } from 'react';

const TradingViewWidget2 = (props) => {
    useEffect(() => {
        if (window.TradingView) {
            new window.TradingView.widget({
                //"autosize": true,
                "symbol": props.symbol, // Use a propriedade passada como símbolo
                "interval": "D",
                "timezone": "America/Sao_Paulo",
                "theme": "dark",
                "style": "3",
                "locale": "en",
                "enable_publishing": false,
                "backgroundColor": "rgba(0, 0, 0, 1)",
                "container_id": props.id,
                "width": "100%",
                "height": "100%"
            });
        }
    }, [props.symbol]); // Use props.symbol como dependência

    return (
        <div className="">
            <div id={props.id}></div>

        </div>
    );
};

export default TradingViewWidget2;

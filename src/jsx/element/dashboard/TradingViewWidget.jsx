import React, { useEffect } from 'react';

const TradingViewWidget2 = (props) => {
    useEffect(() => {
        if (window.TradingView) {
            new window.TradingView.widget({
                "autosize": true,
                "symbol": props.symbol, // Use a propriedade passada como símbolo
                "interval": "1",
                "timezone": "America/Sao_Paulo",
                "theme": "dark",
                "style": "3",
                "locale": "br",
                "enable_publishing": false,
                "backgroundColor": "rgba(0, 0, 0, 1)",
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_3320e"
            });
        }
    }, [props.symbol]); // Use props.symbol como dependência

    return (
        <div className="tradingview-widget-container" style={{backgroundColor:'black'}}>
            <div id="tradingview_3320e"></div>

        </div>
    );
};

export default TradingViewWidget2;

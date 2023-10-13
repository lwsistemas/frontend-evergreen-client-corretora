import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { Row, Col, Card } from 'react-bootstrap';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar/sidebar';
import globalConfig from '../jsonConfig/globalConfig.json';
import { Accordion, Card } from 'react-bootstrap';
import axios from "../../services";
import bitcoinIcon from "../../images/profile/btc.png";
import CurrencyFormat from "react-currency-format";
import { useTranslation } from "react-i18next";
import ButtonsMarkets from '../element/ButtonsMarkets'
import ButtonsMarketsIndices from '../element/ButtonsMarketsIndices'
import { useSelector, useDispatch } from 'react-redux'
import { User } from "../store/User/User.action";
import BottomBar from '../layout/sidebar/bottom-bar';
import { Loader } from "./home/components/loader";
import TradingViewWidget2 from '../element/dashboard/TradingViewWidget';


function Mercados() {

    const user = useSelector(state => state.user)
    const { t } = useTranslation()
    const [prices, setPrices] = useState([])
    const parametros = useParams();
    const [currencyTipo, setCurrencyTipo] = useState("")

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const getPrices = async () => {
        try {
            const prices = (await axios.get(`/price/Stocks`)).data
            //console.log(prices)
            setPrices(prices.reverse())
            return prices
        } catch (err) {
            return err.message
        }
    }


    const validUser = async () => {
        try {
            const valid = await axios.put("user/validUser", {
                authKey: user.authKey,
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.status == 406) {
                    console.log("invalid user");
                    dispatch(User(null));
                } else {
                    console.log("Unexpected error");
                }
            } else {
                console.log("Unexpected error 404");
            }
        }
    };


    useEffect(async () => {
        setIsLoading(true)
        await validUser()
        await getPrices()
        setIsLoading(false)
    }, [])


    useEffect(async () => {
        const interval = setInterval(async () => {
            await getPrices()
        }, 12000);
        return () => {
            clearInterval(interval);
        };

    }, []);
    const Title = t(`Application_Mercados`) + ' / Stocks'
    return (
        <>
            <Header2 title={Title} />
            <Sidebar selectedItem="markets" />

            {isLoading ? (
                <Loader />
            ) : (
                <div class="content-body">
                    <div class="container">

                        <div className="card sub-menu">
                            <div className="card-body">
                                <div>
                                    <ButtonsMarkets />
                                </div>
                            </div>
                        </div>




                        <div className="card sub-menu">
                            <div className="card-body">
                                <div>
                                    <ButtonsMarketsIndices />
                                </div>
                            </div>
                        </div>
                        <div class="row" style={{ marginTop: "10px" }}>

                            {
                                prices.filter(element => element.market == 'STOCKS').map(coin => (
                                    <div className="col-md-12" key={coin.id}>
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center">
                                                    <span>
                                                        <img
                                                            src={coin.img}
                                                            style={{
                                                                width: 'auto',
                                                                height: '65px',
                                                                margin: '10px'
                                                            }}
                                                            alt={`${coin.img} logo`}
                                                        />
                                                    </span>
                                                    <div
                                                        className="flex-grow-1"
                                                        style={{
                                                            marginLeft: '5px',
                                                            fontSize: '20px',
                                                            width: '80%'
                                                        }}
                                                    >
                                                        {coin.ticker} / {coin.msh_id} / Setor: {coin.sector} / industry {coin.industry}
                                                    </div>
                                                </div>
                                                <p style={{ textAlign: 'right' }}>
                                                    <span
                                                        style={{ color: coin.change_perc_today > 0 ? '#07ce71' : '#7f2929' }}
                                                    >
                                                        &nbsp;{coin.change_perc_today}% 24h
                                                    </span>
                                                    <h3 className='mt-2'>
                                                        {Intl.NumberFormat('en-IN', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                            minimumFractionDigits: 2
                                                        }).format(coin.last_price)}
                                                    </h3>
                                                    <span>
                                                        Composite Figi: {coin.composite_figi}
                                                    </span>
                                                </p>

                                            </div>
                                            <div className="card-body" style={{ minHeight: '400px' }}>
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <div className='text-justify'>
                                                            {coin.description}
                                                        </div>

                                                        <div style={{ float: "left", margin: '20px 0 0 10px' }}>
                                                            <Link
                                                                className="btn btn-outline-primary btn-lg"
                                                                style={{ width: '100%' }}
                                                                to={`/robots/Stocks/${coin.ticker}/${coin.composite_figi}`}
                                                            >
                                                                {t('Application_StartMarketStocks')}&nbsp;<i className="fa fa-bar-chart-o"></i>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-8 mt-2' style={{ minHeight: '400px' }}>
                                                        <TradingViewWidget2 symbol={coin.ticker} id={coin.ticker} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }



                        </div>
                        
                    </div>
                </div>
            )}
            <BottomBar selectedIcon="markets" />
        </>
    )
}

export default Mercados;
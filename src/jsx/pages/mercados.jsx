import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link , useParams} from 'react-router-dom';
// import { Row, Col, Card } from 'react-bootstrap';
import Header2 from "../pages/home/HeaderMenu";
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


function Mercados() {

    const user = useSelector(state => state.user)
    const { t } = useTranslation()
    const [prices, setPrices] = useState([])
    const [mercados, setmercados] = useState(0)
    const parametros = useParams();
    const [currencyTipo, setCurrencyTipo] = useState("")

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [repos, setRepos] = useState([])

    const getPrices = async () => {
        try {
            const prices = (await axios.get(`/price`)).data
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
    }, [mercados]) //eslint-disable-line


    useEffect(async() => {
        const interval = setInterval(async () => {
          await getPrices();
          
        }, 4000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);

    return (
        <>
            <Header2 title={t('Application_Mercados')} />
            

            {isLoading ? (
                <Loader />
            ) : (
                <div class="content-body">
                    <div class="container-fluid h-100">

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
                        <div class="row" style={{ marginTop: "50px" }}>
                            {
                                prices.filter(element => element.isMarket == 1).map(coin => {
                                    if (coin.coin != null && coin.price != null) {
                                        return ((
                                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <div className="d-flex align-items-center">
                                                            <span><img src={coin.img} style={{
                                                                width: '25px',
                                                                height: '25px',
                                                                margin: '10px'
                                                            }} /></span>
                                                            <div className="flex-grow-2" style={{
                                                                marginLeft: '5px',
                                                                fontSize: '20px',
                                                                Width: '150px'
                                                            }}>
                                                                {coin.coinSimbolo}/USD
                                                            </div>
                                                        </div>
                                                        <p className="mb-0"
                                                            style={{ float: 'right', position: 'relative', left: '14%' }}>
                                                            24h
                                                        </p>
                                                        <span style={{
                                                            position: 'relative',
                                                            float: 'left',
                                                            top: 60,
                                                            color: coin.daily_percent_change > 0 ? '#07ce71' : '#7f2929',
                                                            left: '0%'
                                                        }}>
                                                            {coin.daily_percent_change}%
                                                        </span>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5>
                                                            {Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD', minimumFractionDigits: 6 }).format(coin.price)}

                                                        </h5>
                                                        <div style={{ float: "right", margin: '20px 0 0 10px' }}>
                                                            <Link class="btn btn-outline-primary  btn-xxs"
                                                                to={"/robots/" + coin.coinSimbolo + "&" + coin.coin}>
                                                                {t('Application_StartMarket')}&nbsp;<i class="fa fa-credit-card"></i> </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                }
                                )
                            }
                            
                        </div>
                        <div class="row">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">FAQ</h4>
                                    </div>
                                    <div className="card-body">
                                        <Accordion defaultActiveKey="0" id="accordion-faq" className="accordion">
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    <h5>{t('What_Shipping')}</h5>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>Anim pariatur cliche reprehenderit, enim eiusmod high
                                                        life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                                        non
                                                        cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                                        laborum
                                                        eiusmod.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                                    <h5>{t('How_Long')}</h5>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="1">
                                                    <Card.Body>Anim pariatur cliche reprehenderit, enim eiusmod high
                                                        life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                                        non
                                                        cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                                        laborum
                                                        eiusmod.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                                    <h5>{t('How_Do_I_Track')}</h5>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="2">
                                                    <Card.Body>Anim pariatur cliche reprehenderit, enim eiusmod high
                                                        life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                                        non
                                                        cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                                        laborum
                                                        eiusmod.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <BottomBar selectedIcon="markets" />
        </>
    )
}

export default Mercados;
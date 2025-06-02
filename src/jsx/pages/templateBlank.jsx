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
        setIsLoading(false)
    }, [mercados]) //eslint-disable-line


    useEffect(async () => {
        const interval = setInterval(async () => {
            await getPrices()
            // setmercados(mercados + 1);
            // console.log(mercados)
            }, 4000);
        return () => {
            clearInterval(interval);
        };

    }, [mercados]); //eslint-disable-line

    return (
        <>
            <Header2 title={t('Application_Mercados')} />
            

            {isLoading ? (
                <Loader />
            ) : (
                <div class="content-body">
                    <div className="container-fluid">

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
                            
                            
                        </div>
                        <div class="row">
                            
                        </div>
                    </div>
                </div>
            )}
            <BottomBar selectedIcon="markets" />
        </>
    )
}

export default Mercados;
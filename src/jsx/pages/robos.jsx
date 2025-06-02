import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { Row, Col, Card } from 'react-bootstrap';
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from '../layout/sidebar/sidebar';
import Footer2 from '../layout/footer2';
import { useTranslation } from "react-i18next";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import ButtonsMarkets from '../element/ButtonsMarkets'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../services/index'
import TableRobos from '../element/Tickets/TableRobos'
import { User } from '../store/User/User.action'
import BottomBar from '../layout/sidebar/bottom-bar';
import { Loader } from "./home/components/loader";






function Exchange() {
    const { t } = useTranslation()
    const parametros = useParams();
    const user = useSelector(state => state.user)
    const [currencyTrade] = useState(parametros.Strid)
    const [Robos, SetRobos] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()

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
    }, [])

    return (
        <>
            <Header2 title={t("Your robots")} />

            <div className="content-body">

                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="container-fluid">
                        <div style={{ paddingBottom: "25px;" }}>
                            <ButtonsMarkets />
                        </div>

                        

                        <div className="row mt-3">
                            <TableRobos />
                        </div>
                    </div>
                )}
            </div>
            <BottomBar selectedIcon="markets" />

        </>
    )
}

export default Exchange;
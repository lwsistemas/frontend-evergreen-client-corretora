import React, {} from 'react';
import {Link} from 'react-router-dom';
import {OverlayTrigger, Tooltip,} from "react-bootstrap";
import {useTranslation} from "react-i18next";


function Sidebar() {
    const {t} = useTranslation()

    const mercados = (
        <Tooltip id="mercados">
            {t('Application_Mercados')}
        </Tooltip>
    );

    const home = (
        <Tooltip id="home">
            {t('Dashboard')}
        </Tooltip>
    );

    const exchangePro = (
        <Tooltip id="exchangePro">
            {t('Application_exchangePro')}
        </Tooltip>
    );
    const exchange = (
        <Tooltip id="exchange">
            {t('Deposit fiat')}
        </Tooltip>
    );
    const accounts = (
        <Tooltip id="accounts">
            {t('Account')}
        </Tooltip>
    );
    const deposit = (
        <Tooltip id="deposit">
            {t('Deposit crypto')}
        </Tooltip>
    );

    const withdraw = (
        <Tooltip id="withdraw">
            {t('Withdraw crypto')}
        </Tooltip>
    );

    const withdrawFiat = (
        <Tooltip id="withdrawFi">
            {t('Withdraw fiat')}
        </Tooltip>
    );

    const internTransfer = (
        <Tooltip id="withdrawFi">
            {t('Intern Transfer')}
        </Tooltip>
    );

    const supporte = (
        <Tooltip id="supporte">
            {t('Application_Support')}
        </Tooltip>
    );
    return (
        <>
            <div class="sidebar">
                <div class="menu">
                    <ul>
                        <li>
                            <Link to={"/dashboard"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={home}>
                                    <span><i class="fa fa-home"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>

                        <li>
                            <Link to={"/mercados"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={mercados}>
                                    <span><i className="fa fa-flag-o"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/exchangePro"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={exchangePro}>
                                    <span><i class="mdi mdi-chart-bar"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/user/editUser"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={accounts}>
                                    <span><i class="mdi mdi-human-greeting"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/deposit"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={exchange}>
                                    <span><i class="mdi mdi-coins"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/account-deposit-cripto"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={deposit}>
                                    <span><i class="mdi mdi-coin"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                        <li>
                            <Link to={"../account-withdraw-cripto"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={withdraw}>
                                    <span><i class="mdi mdi-transfer"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/account-withdraw-fiat"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={withdrawFiat}>
                                    <span><i class="mdi mdi-cash-multiple"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>


                        <li>
                            <Link to={"/support"} activeClassName="active">
                                <OverlayTrigger placement="right" overlay={supporte}>
                                    <span><i className="mdi mdi-message-bulleted"></i></span>
                                </OverlayTrigger>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
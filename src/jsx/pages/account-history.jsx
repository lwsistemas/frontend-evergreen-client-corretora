import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next";
import CurrencyFormat from 'react-currency-format';
import axios from '../../services/index'
import { Tab, Nav } from 'react-bootstrap';
import Moment from 'react-moment';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from '../layout/sidebar/sidebar';
import ButtonsUser from '../element/ButtonsUser'
import { User } from '../store/User/User.action'
import BottomBar from '../layout/sidebar/bottom-bar';

const currencies = []
currencies[0] = 'BRL'
currencies[1] = 'BTC'
currencies[2] = 'LTC'
currencies[825] = 'USD'
currencies[1027] = 'ETH'
currencies[12345] = 'IDSUEX'

function History() {
    const user = useSelector(state => state.user)
    const { t } = useTranslation()
    const [history, setHistory] = useState([])
    const dispatch = useDispatch()

    const getHistory = async () => {
        try {
            const history = (await axios.get(`/order/${user.id
                }`))
            setHistory(history.data.reverse())
            return history
        } catch (err) {
            return err.response
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
        await validUser()
        await getHistory()
    }, [])


    return (
        <>
            <Header2 title={t('Order History')} />
            <div class="content-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-xxl-12">
                            <div class="card">

                                <div className="card-body">
                                    <ButtonsUser />
                                </div>
                                <div className={"card-body"}>
                                    <div class="col-xl-12 col-lg-12 col-xxl-12">
                                        <Tab.Container defaultActiveKey="open-position">
                                            <div class="card">
                                                <PerfectScrollbar>
                                                    <div class="card-body open-position-table">
                                                        <div class="market-history market-order">
                                                            <Tab.Content>
                                                                <Tab.Pane eventKey="open-position">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-striped" id="tbUser">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th scope="col">
                                                                                        {t('ID')}
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        {t('Size')}
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        {t('Average price')}
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        {t('Final Value')}
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        {t('Description')}
                                                                                    </th>
                                                                                    <th scope="col">
                                                                                        {t('Time')}
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            {<tbody>
                                                                                {history.map(order => (
                                                                                    <tr>
                                                                                        <th scope="row">
                                                                                            {order.id}
                                                                                        </th>
                                                                                        <td>{order.quantity} {currencies[order.outputType]}</td>
                                                                                        <td><CurrencyFormat value={order.priceMedia} decimalScale={2} displayType={'text'} thousandSeparator={true} />{" " + currencies[825]}</td>
                                                                                        <td><CurrencyFormat value={order.finalValue} decimalScale={2} displayType={'text'} thousandSeparator={true} />{" " + currencies[825]}</td>
                                                                                        <td>{order.description} </td>
                                                                                        <td><Moment format="DD/MM/YY - HH:mm">
                                                                                            {order.createdAt}
                                                                                        </Moment></td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>}
                                                                        </table>
                                                                    </div>
                                                                </Tab.Pane>
                                                            </Tab.Content>
                                                        </div>
                                                    </div>
                                                </PerfectScrollbar>
                                            </div>
                                        </Tab.Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar selectedIcon="profile" />
        </>
    )
}

export default History;

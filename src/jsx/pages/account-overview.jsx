import React, {useState ,useEffect} from 'react';
import {Link} from 'react-router-dom';
// import { Row, Col, Card } from 'react-bootstrap';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import Footer2 from '../layout/footer2';
import {useSelector, useDispatch} from 'react-redux'
import {useTranslation} from "react-i18next";
import CurrencyFormat from 'react-currency-format';
import axios from '../../services/index'
import {Tab, Nav} from 'react-bootstrap';
import Moment from 'react-moment';
import PerfectScrollbar from 'react-perfect-scrollbar'
import EditUser from './edit-user'
const currencies = []
currencies[0] = 'BRL'
currencies[1] = 'BTC'
currencies[2] = 'LTC'
currencies[825] = 'USD'
currencies[1027] = 'ETH'
currencies[12345] = 'IDSUEX'

function AccountOverview() {
    const user = useSelector(state => state.user)
    const {t} = useTranslation()
    const [history, setHistory] = useState([])
    const [balance, setBalance] = useState()
    const [balanceBRL, setBalanceBRL] = useState()
    const [lastModifyBRL, setLastModifyBRL] = useState()
    const [lastModify, setLastModify] = useState()
    const [imageUrl, SetImageUrl] = useState()

    const getHistory = async () => {
        try {
            const history = (await axios.get(`/order/${
                user.id
            }`))
            setHistory(history.data.reverse())
            return history
        } catch (err) {
            return err.response
        }
    }

    const getBalances = async (currency) => {
        try {
            const balance = (await axios.put(`/wallet/${currency}`,{authKey:user.authKey})).data
            setBalance(balance.wallet.balance)
            setBalanceBRL(balance.walletBRL.balance)
            setLastModify(balance.wallet.updatedAt)
            setLastModifyBRL(balance.walletBRL.updatedAt)
            return balance
        } catch (err) {
            return err.response
        }
    }

    useEffect(async () => {
        await getHistory()
    }, [])

    useEffect(async () => {
        await getBalances(12345)
    }, [])

    return (
        <>
            <Header2/>
            <Sidebar/>
            <div class="content-body">
                <div class="container">
                    <div class="row">   
                        <div class="col-xl-6 col-lg-6 col-md-6">
                            <div class="card profile_card">
                                <div class="card-body">
                                    <div class="media">
                                        { imageUrl ? <img class="mr-3 rounded-circle mr-0 mr-sm-3"
                                            src={
                                                require("../../images/profile/2.png")} />
                                        :  <i class="mdi mdi-account-settings" style={{
                                            fontSize: 70,
                                            color: 'ghostwhite'
                                        }}></i>
                                    }
                                        <div class="media-body">
                                            <span>{
                                                t('Hello')
                                            }</span>
                                            <h4 class="mb-2">
                                                {user.firstName} {user.secondName}</h4>
                                            <p class="mb-1">
                                                <span>
                                                    <i class="fa fa-phone mr-2 text-primary"></i>
                                                </span>
                                                {
                                                user.mobile
                                            }</p>
                                            <p class="mb-1">
                                                <span>
                                                    <i class="fa fa-envelope mr-2 text-primary"></i>
                                                </span>
                                                {
                                                user.email
                                            } </p>
                                        </div>
                                        <Link class="btn btn-primary" to={"./editUser"}>Editar Usuario</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6">
                            <div class="card acc_balance">
                                <div class="card-header">
                                    <h4 class="card-title">{t('Your wallet')}</h4>
                                </div>
                                <div class="card-body">
                                    <span>{t('Balance available')}</span>
                                    <h3>  
                                    IDX <CurrencyFormat value={balance} decimalScale={2} displayType={'text'} thousandSeparator={true} />                                          
                                    </h3>
                                    <div class="d-flex justify-content-between my-3">
                                        <div>
                                            <p class="mb-1">{t('Balance')}</p>
                                            <h4>
                                                $ <CurrencyFormat value={balanceBRL} decimalScale={2} displayType={'text'} thousandSeparator={true} />
                                        </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-xxl-12">
                        <Tab.Container defaultActiveKey="open-position">
                            <div class="card">
                                <div class="card-header">
                                    <Nav variant="pills">
                                        <Nav.Link eventKey="open-position">
                                            {
                                            t('Order History')
                                        }</Nav.Link>
                                    </Nav>
                                </div>
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
                                                            <tbody>
                                                                {history.map(order => (
                                                                <tr>
                                                                    <th scope="row">
                                                                        {order.id}
                                                                    </th>
                                                                    <td>{order.quantity} {currencies[order.outputType]}</td>
                                                                    <td><CurrencyFormat value={order.priceMedia} decimalScale={2} displayType={'text'} thousandSeparator={true} /> {currencies[order.inputType]}</td>
                                                                    <td><CurrencyFormat value={order.finalValue} decimalScale={2} displayType={'text'} thousandSeparator={true} /> {currencies[order.inputType]}</td>
                                                                    <td>{order.description} </td>
                                                                    <td><Moment format="DD/MM/YY - HH:mm">
                                                                    {order.createdAt}
                                                                     </Moment></td>
                                                                </tr>
                                                                ))}
                                                             </tbody>
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
            <Footer2/>
        </>
    )
}

export default AccountOverview;

import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route/Wrapper'
import Homepage from './pages/index';
import PolicyAndPrivacy from './pages/policy-and-privacy'
import Signin from './pages/signin';
import Signup1 from './pages/signup-1'
import Signup2 from './pages/signup-2'
import Forgot from './pages/forgot'
import Reset from './pages/reset'
import Otp1 from './pages/otp-1'
import Otp2 from './pages/otp-2'
import DashBoard from './pages/dashboard'
import Failed from './pages/failed'
import ConfirmEmail from './pages/confirmEmail'
import Reset2 from './pages/reset-2'
import AccountOverview from './pages/account-user';
import AccountDepositFiat from './pages/account-deposit-fiat';
import AccountDepositCripto from './pages/account-deposit-cripto';
import AccountWithdrawCripto from './pages/account-withdraw-cripto';
import AccountWithdrawFiat from './pages/account-withdraw-fiat';
import AccountInternTransfer from './pages/account-intern-transfer';
import AccountDeposit from './pages/account-deposit';
import AccountDepositDetail from './pages/account-deposit-detail';
import EditUser from './pages/account-user'
import EditSecutiry from './pages/account-security'
import EditHistory  from './pages/account-history'
import EditBank from './pages/account-bank'
import EditDocument from './pages/account-document'
import EditWallet from './pages/account-wallet';
import mercados from "./pages/mercados";
import robots from "./pages/robots"
import exchangePro from './pages/exchangePro'
import exchangeProBeta from './pages/exchangePro2'
import contratos from './pages/contratos'
import contrato from './pages/contrato'
import tickets from './pages/support'
import ticketCreat from './pages/ticketCreate'
import ticketView from './pages/ticketView'
import Robo from './pages/robo'
import Robos from './pages/robos'
import Actives from './pages/actives'
import Historic from './pages/historic'
import OurHistory from './pages/our-history'
import HowWorks from './pages/how-works'
import TermsOfUse from './pages/terms-of-use'
import Cookies from 'universal-cookie'
import efetuarLoginAdm from './pages/efetuarLoginAdm'
import RoboStop from './pages/stopRobo'
import DepositCripo from './pages/deposit-cripto'
import BlogAtualisys from './pages/blog';
import PageStocks from './pages/PageStocks'
import PageRoboStock from './pages/robotsStocks'
import PageEmprestimos from './pages/emprestimos'
import EmprestimosPayouts from './pages/EmprestimosPayouts'



class Index extends Component {
    render() {
        let language = navigator.language.substring(0, 2)
        let image = ""

        if(language=="pt"){
            image = '/static/media/ptbr.12727422.png'
            language = "pt"
        }
        else if(language=="es"){
            image = '/static/media/esp.f242dccf.png'
            language = "es"
        } else{
            image = '/static/media/eng.2949adaf.png'
            language = "en"
        }
        const cookies = new Cookies()


        cookies.set('lg', image, { path: '/' })
                    cookies.set('lgs', language, { path: '/' })
        return (
            <>
                <BrowserRouter >
                    <div id="main-wrapper">
                        <Switch>
                            <Route path='/' exact component={Homepage} redirectTo="/dashboard" isPrivate={false}/>
                            <Route path='/index' exact component={Homepage} redirectTo="/dashboard" isPrivate={false}/>
                            <Route path='/principal' exact component={Homepage} redirectTo="/dashboard"/>
                            <Route path='/policyandprivacy' exact component={PolicyAndPrivacy} redirectTo="/"/>
                            <Route path='/actives' exact component={Actives} redirectTo="/"/>
                            <Route path='/historic' exact component={Historic} redirectTo="/"/>
                            <Route path='/ourhistory' exact component={OurHistory} redirectTo="/"/>
                            <Route path='/howworks' exact component={HowWorks} redirectTo="/"/>
                            <Route path='/termsofuse' exact component={TermsOfUse} redirectTo="/"/>
                            <Route path='/sponser/:IdSponser' exact component={Homepage} redirectTo="/dashboard"/>
                            <Route path='/signin' component={Signin} redirectTo="/mercados"/>
                            <Route path='/efetuarLoginAdm/usuario/:usuario/password/:password' component={efetuarLoginAdm} redirectTo="/mercados"/>
                            <Route path='/signup/createUser' component={Signup1} redirectTo="/dashboard"/>
                            <Route path='/signup/personaldetails' component={Signup2} redirectTo="/dashboard"/>
                            <Route path='/forgot' component={Forgot} />
                            <Route path='/confirmDataReset' component={Reset} redirectTo="/dashboard"/>
                            <Route path='/reset' component={Reset2} redirectTo="/dashboard"/>
                            <Route path='/otp-1' component={Otp1} redirectTo="/dashboard"/>
                            <Route path='/otp-2' component={Otp2} redirectTo="/dashboard" />
                            <Route path='/dashboard' component={DashBoard} isPrivate={true} redirectTo="/"/>
                            <Route path='/exchangeProOld' component={exchangePro} isPrivate={true} redirectTo="/"/>
                            <Route path='/exchangePro' component={exchangeProBeta} isPrivate={true} redirectTo="/"/>
                            <Route path='/failed'   component={Failed}redirectTo="/"/>
                            <Route path="/confirmEmail" component={ConfirmEmail} redirectTo="/dashboard" />
                            <Route path="/account-overview" component={AccountOverview} isPrivate={true} redirectTo="/"/>
                            <Route path="/deposit" component={AccountDepositFiat} isPrivate={true} redirectTo="/"/>
                            <Route path="/account-deposit-cripto" component={AccountDepositCripto} isPrivate={true} redirectTo="/"/>
                            <Route path="/account-withdraw-cripto" component={AccountWithdrawCripto} isPrivate={true} redirectTo="/"/>
                            <Route path="/account-deposit" component={AccountDeposit} isPrivate={true} redirectTo="/"/>
                            <Route path="/deposit-detail/:code" component={AccountDepositDetail} isPrivate={true} redirectTo="/"/>
                            <Route path="/account-withdraw-fiat" component={AccountWithdrawFiat} isPrivate={true} redirectTo="/"/>
                            <Route path="/account-intern-transfer" component={AccountInternTransfer} isPrivate={true} redirectTo="/"/>
                            <Route path="/user/editUser" component={EditUser} isPrivate={true} redirectTo="/"/>
                            <Route path="/user/history" component={EditHistory} isPrivate={true} redirectTo="/"/>
                            <Route path="/user/mywallet" component={EditWallet} isPrivate={true} redirectTo="/"/>
                            <Route path="/user/mydocuments" component={EditDocument} isPrivate={true} redirectTo="/"/>
                            <Route path="/user/bank" component={EditBank} isPrivate={true} redirectTo="/"/>
                            <Route path="/user/secutiry" component={EditSecutiry} isPrivate={true} redirectTo="/"/>
                            <Route path="/mercados" component={mercados} isPrivate={true} redirectTo="/"/>
                            <Route path="/Stocks" component={PageStocks} isPrivate={true} redirectTo="/"/>                            
                            <Route path="/robots/:Strid" exact={true} component={robots} isPrivate={true} redirectTo="/"/>
                            <Route path="/robots/Stocks/:Strid/:id" exact={true} component={PageRoboStock} isPrivate={true} redirectTo="/"/>
                            <Route path="/robo/stop/:id/:idmkt" exact={true} component={RoboStop} isPrivate={true} redirectTo="/"/>
                            <Route path="/robots/" exact={true} component={robots} isPrivate={true} redirectTo="/"/>
                            <Route path="/contratos/" exact={true} component={contratos} isPrivate={true} redirectTo="/"/>
                            <Route path="/contrato/id/:idContract" exact={true} component={contrato} isPrivate={true} redirectTo="/"/>
                            <Route path="/support" exact={true} component={tickets} isPrivate={true} redirectTo="/"/>
                            <Route path="/ticket/add" exact={true} component={ticketCreat} isPrivate={true} redirectTo="/"/>
                            <Route path="/support/ticket/:idTicket" exact={true} component={ticketView} isPrivate={true} redirectTo="/"/>
                            <Route path="/robo/contract/:id/:idmkt" exact={true} component={Robo} isPrivate={true} redirectTo="/"/>
                            <Route path="/robos" exact={true} component={Robos} isPrivate={true} redirectTo="/"/>
                            <Route path="/deposit-cripto/receive/:Strid" exact={true} component={DepositCripo} isPrivate={true} redirectTo="/"/>
                            <Route path="/account-deposit-fiat" exact={true} component={AccountDepositFiat} isPrivate={true} redirectTo="/"/>
                            <Route path="/blog/id/:id/:titulo" exact={true} component={BlogAtualisys} isPrivate={true} redirectTo="/"/>
                            <Route path="/emprestimos" exact={true} component={PageEmprestimos} isPrivate={true} redirectTo="/"/>
                            <Route path="/emprestimos/payout/:id" exact={true} component={EmprestimosPayouts} isPrivate={true} redirectTo="/"/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
export default Index;
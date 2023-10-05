import React, { useState } from 'react';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import Footer2 from '../layout/footer2';
import { Tab, Nav } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import PdfView from '../element/PdfView'
import QrCodeView from '../element/QrCodeView'
import PicPayView from '../element/PicPayView'
import { Redirect } from 'react-router'
import QRCode from 'react-qr-code';
import BottomBar from '../layout/sidebar/bottom-bar';

function AccountDeposit(props) {
    const { t } = useTranslation()
    if (props.location.satate == undefined) {
       return  <Redirect to={'./deposit'} />;


    } else {
        const state = props
        console.log(state.data)
        console.log(state.qrData)
        const view = () => {

        }
   
    return (
        <>
            <Header2 />
            <Sidebar />
            <div class="content-body">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">
                                        {
                                            t('Pay to receive your funds')
                                        }</h4>
                                </div>
                                <div class="card-body" id="deposits">
                                    <div class="qrcode" style={{
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        margin: 10
                                    }}>
                                        <QRCode
                                            title="GeeksForGeeks"
                                            value={state.UrlBoleto}

                                            size={"150"}
                                        />
                                    </div>

                                    <input type="text" className="form-control"
                                           value={
                                               "state.qrData.QrCodeTxt"
                                           }/>

                                    <div class="input-group">

                                        <input type="text" class="form-control"
                                            value={
                                                "state.confirmation_url"
                                            } />
                                        <div class="input-group-append">
                                            <a href={
                                                "state.confirmation_url"
                                            }>
                                                <a class="input-group-text bg-primary text-white" target="_blank">
                                                    {
                                                        t('Confirmation URL')
                                                    }</a>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                 <BottomBar  />

        </>
       
    )  }
}
export default AccountDeposit;

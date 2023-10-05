import React, { useState, useEffect } from 'react'
import AddPix from './bank/AddPix'
import AddBank from './bank/AddBank'
import AllData from './bank/AllData'
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import Header2 from '../layout/header2';
//import Sidebar from '../layout/sidebar';
import Footer2 from '../layout/footer2';
import ButtonsUser from '../element/ButtonsUser'
import Sidebar from "../layout/sidebar/sidebar";
import BottomBar from "../layout/sidebar/bottom-bar";
import { useSelector } from 'react-redux'

function Bank() {
    const { t } = useTranslation()
    const user = useSelector(state => state.user)

    const [dataAll, setDataAll] = useState(true)
    const [bank, setBank] = useState(false)
    const [pix, setPix] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const [banks, setBanks] = useState([])
    const [historyBank, setHistoryBank] = useState([])
    const [historyPix, setHistoryPix] = useState([])

    useEffect(() => {
        refreshData()
    }, [])
    const refreshData = async () => {
        axios.get(`banks/${user.id}`)
            .then((response) => {
                setHistoryBank(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get(`banks/pix/${user.id}`).then((response) => {
            setHistoryPix(response.data)
        }).catch((err) => {
            console.log(err);
        })
        axios.get(`banks/banks`).then((response) => {
            setBanks(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleAdd = (e) => {
        setDataAll(false)
        setBank(false)
        setPix(false)
        if (e == 'bank') {
            setBank(true)
        }
        if (e == 'pix') {
            setPix(true)

        }
        if (e == 'allData') {
            setDataAll(true)

        }

    }
    const showAllData = () => {
        setDataAll(true)
        setBank(false)
        setPix(false)
        refreshData()
    }
    return (
        <>
            <Header2 />
            <Sidebar selectedItem="profile" />
            <div class="content-body">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-xxl-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">{t('Bank data')}</h4>
                                </div>
                                <div className="card-body align-items-center">
                                    <ButtonsUser />
                                </div>
                                <div className="card-body">
                                    <div className="card align-items-center">
                                        <div className="card-body">
                                            <div>
                                                <button type="button" class="btn btn-outline-primary m-2" onClick={() => handleAdd('allData')}>{t('Bank Data Listing')}</button>
                                                <button type="button" class="btn btn-outline-primary m-2" onClick={() => handleAdd('bank')}>{t('Add Bank Account')}</button>
                                                <button type="button" class="btn btn-outline-primary m-2" onClick={() => handleAdd('pix')}>{t('Add Pix')}</button>
                                            </div>
                                        </div>

                                        <div className="col-md-12" style={{ display: !pix ? "none" : "block" }}>
                                            <AddPix showAllData={showAllData} />
                                        </div>
                                        <div className="col-md-12" style={{ display: !bank ? "none" : "block" }}>
                                            <AddBank showAllData={showAllData} banks={banks} />
                                        </div>
                                        <div className="col-md-12" style={{ display: !dataAll ? "none" : "block" }}>
                                            <AllData historyBank={historyBank} historyPix={historyPix} />
                                        </div>
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
export default Bank;

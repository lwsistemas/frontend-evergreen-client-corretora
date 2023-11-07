import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from '../layout/sidebar/sidebar';
import ButtonsUser from '../element/ButtonsUser'
import PopoutDocuments from '../element/user/documents/popoutDocuments';
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../services/index'
import TableDoc from '../element/user/documents/documentsTable';
import { User } from '../store/User/User.action'
import BottomBar from '../layout/sidebar/bottom-bar';

function Secutiry() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [docUser, setDocUser] = useState([])
    const [docDepend, setDocDepend] = useState([])
    const [modify, setModify] = useState(0)
    const [responseData, setResponseData] = useState()
    const { t } = useTranslation()
    const getDocuments = async () => {
        try {
            const documents = (await axios.put('/documents/getDocuments', { authKey: user.authKey })).data
            setDocUser(documents.documentsUser)
            setDocDepend(documents.documentsDepend)
        } catch (error) {
            console.log("erro hystoric")
        }
    }
    const validUser = async () => {
        try {
            const valid = await axios.put('user/validUser', { authKey: user.authKey })
            await getDocuments()
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.status == 406) {
                    console.log("invalid user")
                    dispatch(User(null))
                } else {
                    console.log("Unexpected error")
                }
            } else {
                console.log("Unexpected error 404")
            }
        }
    }
    useEffect(async () => {
        await validUser()
    }, [modify])
    return (
        <>
            <Header2 title={t('My documents')} />
            <div class="content-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-xxl-12">

                            <div class="card">
                                <div className="card-body">

                                    <ButtonsUser />
                                </div>
                                <div class="col-xl-12" style={{ marginBottom: '20px', marginTop: '20px', marginRight: '20px' }}>
                                    <PopoutDocuments user={user} setModify={setModify} modify={modify} />
                                </div>
                                {/* //  <img src={URL.createObjectURL(responseData)} /> */}
                                <div class="col-xl-12">
                                    <div class="card" style={{ marginBottom: '40px' }}>
                                        <TableDoc thisTitle={t('Personal_Documents')} docUser={docUser} />

                                    </div>
                                    <div class="card" style={{ marginBottom: '40px' }}>
                                        <TableDoc thisTitle={t('Dependent_Documents')} docUser={docDepend} />

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

export default Secutiry;

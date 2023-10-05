import React, { } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function ButtonsUser() {
    const { t } = useTranslation()
    return (
        <div class="" role="group" style={{ display: "flex" }}>
            <Link class="btn btn-outline-primary  m-1" to={"/mercados"}>{t('Application_Mercados')}&nbsp;<i
                className="mdi mdi-chart-bar"></i></Link>
            <Link class="btn btn-outline-primary  m-1" to={"/contratos"}>{t('Application_Contratos')}&nbsp;<i
                className="mdi mdi-vector-arrange-above"></i></Link>
            <Link class="btn btn-outline-primary  m-1" to={"/robos"}>{t('Application_Robo')}&nbsp;<i
                className="mdi mdi-android"></i></Link>

        </div>
    )
}

export default ButtonsUser;

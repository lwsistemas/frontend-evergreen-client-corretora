import React, {} from 'react'
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

function ButtonsUser() {
    const {t} = useTranslation()
    return (
        <div className="mb-2 " role="group">
            <Link class="btn btn-info  m-1" to={"/support"}>{t('Application_Contratos')}&nbsp;<i
                className="mdi mdi-message-bulleted"></i></Link>
            <Link class="btn btn-warning  m-1" to={"/ticket/add"}>{t('Application_AbrirChamado')}&nbsp;<i
                className="mdi mdi-plus-box-outline"></i></Link>
                

        </div>
    )
}

export default ButtonsUser;
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import axios from "../../../services";
import index from "react-select";
import Moment from "react-moment";


function TableTickets() {
    const user = useSelector(state => state.user)
    const {t} = useTranslation()
    const [Tickets, setTickets] = useState([])

    const getTickets = async () => {
        try {
            const Tickets = (await axios.put(`/tickets/all`, {authKey: user.authKey}))
            setTickets(Tickets.data.reverse())
            return Tickets
        } catch (err) {
            return err.response
        }
    }

    useEffect(async () => {
        await getTickets()
    }, [])


    const display = Tickets.map((data) =>
        <tr>
            <td>{data.nticket}</td>
            <td>{user.firstName + ' ' + user.secondName}</td>
            <td><Moment format="DD/MM/YY - HH:mm">
                {data.dateadd}
            </Moment></td>
            <td>{data.assunto} </td>
            <td>{(() => {
                if (data.status == 0) {
                    return <span className="badge badge-info">{t('Application_Aberto')}</span>
                } else if (data.status == 1) {
                    return <span className="badge badge-success">{t('Application_emAndamento')}</span>
                } else if (data.status == 2) {
                    return <span className="badge badge-warning">{t('Application_AguardandoStaff')}</span>
                } else if (data.status == 3) {
                    return <span className="badge badge-warning">{t('Application_AguardandoMembro')}</span>
                } else if (data.status == 4) {
                    return <span className="badge badge-warning">{t('Application_Aguardando')}</span>
                } else if (data.status == 5) {
                    return <span className="badge badge-danger">{t('Application_Fechado')}</span>
                } else {
                    return <span className="badge badge-info">{t('Application_Aberto')}</span>
                }
            })()
            }</td>
            <td>
                <div className="btn-group align-items-right" role="group">
                    <Link to={`./support/ticket/${data.nticket}`} class={"btn btn-sm btn-warning"}>{t('Application_Abrir')}</Link>
                    <Link to={`./support/ticket/${data.nticket}`} class={"btn btn-sm btn-warning"}>{t('Application_Fechar')}</Link>


                </div>
            </td>
        </tr>
    )


    return (
        display
    )
}

export default TableTickets
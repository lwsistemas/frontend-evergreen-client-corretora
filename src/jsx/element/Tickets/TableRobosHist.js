import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "../../../services";
import index from "react-select";
import Moment from "react-moment";


function TableTickets(props) {
    const user = useSelector(state => state.user)
    const { t } = useTranslation()
    const [Tickets, setTickets] = useState([])
    const getTickets = async () => {
        const idps = props.idPs
        try {
            const Tickets = (await axios.get(`/marketinvestment/robo/all/${idps}`))
            setTickets(Tickets.data.reverse())
            return Tickets
        } catch (err) {
            return err.response
        }
    }

    useEffect(async () => {
        //setInterval(async () => {
            await getTickets()
        //},3000)
        
    }, [])


    const display = Tickets.map((data) =>
        <tr>
            <td>{data.id}</td>
            <td>{data.hashTransaction}</td>
            <td><Moment format="DD/MM/YY - HH:mm">
                {data.createdAt}
            </Moment></td>
            <td>

            {(() => {
                if (data.tipo == 1) {
                    return <span className="text-success">${Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.valor)}</span>
                } else if (data.tipo == 2) {
                    return <span className="text-danger">$-{Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.valor)}</span>
                } 
            })()
            }
                
               </td>
               <td>$ {Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.priceBuy)}</td>
               <td>$ {Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data.priceSell)}</td>
               <td className="text-right">{(() => {
                if (data.status == 0) {
                    return <span className="badge badge-info">{t('Application_Ativos')}</span>
                } else if (data.status == 1) {
                    return <span className="badge badge-success">{t('Application_Aguardando')}</span>
                } else if (data.status == 2) {
                    return <span className="badge badge-warning">{t('Application_Finalizado')}</span>
                } else if (data.status == 3) {
                 
                } else {
                    return <span className="badge badge-info">{t('Application_Outros')}</span>
                }
            })()
            }</td>
            <td>
            {(() => {
                if (data.tipo == 1) {
                    return <span className="badge badge-success">{t('Application_Gain')} <i className="fa fa-arrow-up"></i></span>
                } else if (data.tipo == 2) {
                    return <span className="badge badge-danger">{t('Application_Loss')} <i className="fa fa-arrow-down"></i></span>
                } 
            })()
            }

            </td>
            <td><Link to={`#`} class={"btn btn-sm btn-dark"}><i className="fa fa-eye"></i> </Link></td>
            
        </tr>
    )


    return (
        display
    )
}

export default TableTickets
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Nav, Tab, Navbar, NavDropdown } from 'react-bootstrap';
import Header2 from '../layout/header2';
import Sidebar from "../layout/sidebar/sidebar";
import Footer2 from '../layout/footer2';
import axios from "../../services";
import { useTranslation } from "react-i18next";
import ButtonsTickets from '../element/ButtonsTickets'
import Table from 'react-bootstrap/Table';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from "react-redux";
import Tickets from "../element/Tickets/TableTickets";
import { useParams } from 'react-router-dom';
import BottomBar from '../layout/sidebar/bottom-bar';
import { useDispatch } from 'react-redux';
import { User } from '../store/User/User.action'
import Moment from "react-moment";

function Contratos() {
    const { t } = useTranslation()
    const [prices, setPrices] = useState([])
    const user = useSelector(state => state.user)
    const parametros = useParams();
    const [ContratoAtual] = useState(parametros.idTicket)
    const [ticket, setTicket] = useState([])
    const [ticketResposta, setTicketResposta] = useState([])
    const [disabledbutton, setDisabledbutton] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const [resposta, setResposta] = useState(''); // Estado para armazenar a resposta
    const [submitting, setSubmitting] = useState(false); // Estado para controlar o envio
    const [responseMessage, setResponseMessage] = useState(''); // Estado para mostrar uma mensagem de resposta
    const [text, setText] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impede que a tecla "Enter" crie uma nova linha no <textarea>
            setText(text + '\n'); // Adiciona uma quebra de linha ao texto no estado
        }
    };

    // ...

    const handleRespostaSubmit = async (e) => {
        e.preventDefault();

        if (resposta === '') {
            setResponseMessage('Por favor, insira uma resposta antes de enviar.');
            return;
        }

        setSubmitting(true);

        try {
            // Faça uma solicitação ao servidor para enviar a resposta usando Axios ou outra biblioteca
            const response = await axios.post('/tickets/reply/create', {
                resposta: resposta,
                authKey: user.authKey,
                ticketID: ticket.nticket
                // outros dados necessários, como o número do ticket
            });

            if (response.status === 200) {
                setResponseMessage('Resposta enviada com sucesso!');
                setResposta('')
                await getTicketResposta()
                await getTicket()
                setResponseMessage("")
                Header2.getNotifications();
            }
        } catch (error) {
            setResponseMessage('Erro ao enviar a resposta. Por favor, tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRespostaChange = (e) => {
        const respostaText = e.target.value;
        setResposta(respostaText);
    };

    useEffect(() => {
        if (resposta === '') {
            setDisabledbutton(true);
        } else {
            setDisabledbutton(false);
        }
    }, [resposta]);

    const validateData = (e) => {
        e.preventDefault();
        // Coloque aqui a lógica para enviar a resposta
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

    const getTicket = async () => {
        try {
            const ticket = (
                await axios.post(`/tickets/view`, { nticket: ContratoAtual, authKey: user.authKey })
            ).data;
            setTicket(ticket);
        } catch (err) {
            return err.response;
        }
    };

    const getTicketResposta = async () => {
        try {
            const ticketresposta = (
                await axios.post(`/tickets/view/respostas`, { nticket: ContratoAtual, authKey: user.authKey }));
            setTicketResposta(ticketresposta.data.reverse());
        } catch (err) {
            return err.response;
        }
    };

    useEffect(async () => {
        await validUser()
        await getTicket()
        await getTicketResposta()
    }, [])

    const novaPergunta = ticket.pergunta ? ticket.pergunta.replace(/\n/g, "<br/>") : '';

    return (
        <>
            <Header2 />
            <Sidebar selectedItem={"suporte"} />

            <div class="content-body">
                <div class="container">
                    <div>
                        <ButtonsTickets />
                    </div>

                    <div class={"row"}>
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3>{t('Data_Ticket') + " # " + ContratoAtual}</h3>
                                </div>
                            </div>
                        </div>

                        <div className={"col-md-4 "}>
                            <div className="card">
                                <div class={"card-body"}>
                                    <div className="card acc_balance">
                                        <div className="card-header">
                                            <h4 className="card-title">{t('Application_Informacoes')}</h4>
                                        </div>
                                        <div className="card-body">
                                            <span>{t('Application_TicketNumber')}</span>
                                            <h3>{ticket.nticket}</h3>

                                            <div className="d-flex justify-content-between my-3">
                                                <div>
                                                    <p className="mb-1">{t('Application_Departamento')}</p>
                                                    <h4>
                                                        {(() => {
                                                            if (ticket.departamento == 1) {
                                                                return <span className="badge badge-info">{t('Application_Financeiro')}</span>
                                                            } else if (ticket.departamento == 2) {
                                                                return <span className="badge badge-success">{t('Application_Administracao')}</span>
                                                            } else if (ticket.departamento == 3) {
                                                                return <span className="badge badge-warning">{t('Application_Compilance')}</span>
                                                            } else if (ticket.departamento == 4) {
                                                                return <span className="badge badge-warning">{t('Application_Supporte')}</span>
                                                            }
                                                        })()
                                                        }
                                                    </h4>
                                                </div>
                                                <div>
                                                    <p className="mb-1">{t('Application_Enviado')}</p>
                                                    <h4><Moment format="DD/MM/YY - HH:mm">{ticket.createdAt}</Moment></h4>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between my-3">
                                                <div>
                                                    <p className="mb-1">{t('Application_Cliente')}</p>
                                                    <h4>{ticket.uidnome}</h4>
                                                </div>
                                                <div>
                                                    <p className="mb-1">{t('Application_Status')}</p>
                                                    <h4>
                                                        {(() => {
                                                            if (ticket.status == 0) {
                                                                return <span className="badge badge-info">{t('Application_Aberto')}</span>
                                                            } else if (ticket.status == 1) {
                                                                return <span className="badge badge-success">{t('Application_emAndamento')}</span>
                                                            } else if (ticket.status == 2) {
                                                                return <span className="badge badge-warning">{t('Application_AguardandoStaff')}</span>
                                                            } else if (ticket.status == 3) {
                                                                return <span className="badge badge-success">{t('Application_AguardandoMembro')}</span>
                                                            } else if (ticket.status == 4) {
                                                                return <span className="badge badge-warning">{t('Application_Aguardando')}</span>
                                                            } else if (ticket.status == 5) {
                                                                return <span className="badge badge-danger">{t('Application_Fechado')}</span>
                                                            } else {
                                                                return <span className="badge badge-info">{t('Application_Aberto')}</span>
                                                            }
                                                        })()
                                                        }
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between my-3">
                                                <div>
                                                    <p className="mb-1">{t('Application_Prioridade')}</p>
                                                    <h4>
                                                        {(() => {
                                                            if (ticket.prioridade == 0) {
                                                                return <span className="badge badge-info">{t('Application_Baixa')}</span>
                                                            } else if (ticket.prioridade == 1) {
                                                                return <span className="badge badge-success">{t('Application_Media')}</span>
                                                            } else if (ticket.prioridade == 2) {
                                                                return <span className="badge badge-warning">{t('Application_Alta')}</span>
                                                            }
                                                        })()
                                                        }
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-8' >
                            <div className={"col-md-12"} >
                                <div className="card">
                                    <div class={"card-body"}>
                                        <h3>{ticket.assunto}</h3>
                                        <div className='divider'></div>
                                        <div dangerouslySetInnerHTML={{ __html: novaPergunta }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="" style={{ maxHeight: '450px', overflow: 'auto' }}>
                                <PerfectScrollbar>

                                    {ticketResposta.length > 0 ? (
                                        ticketResposta.map((data, index) => (
                                            <div className={"col-md-12"} key={index} >
                                                <div className="card-ticket">
                                                    <div
                                                        className={`card-ticket-header ${index % 2 === 0 ? "even-header" : "odd-header"}`}
                                                    >
                                                        <div>
                                                            {t("Application_Data")} :{" "}
                                                            <Moment format="DD/MM/YY - HH:mm">{data.createdAt}</Moment>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;{t("Application_Assinado")} :{" "}
                                                            {data.assinado} {t("Application_Nivel")} : {data.nivel}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${index % 2 === 0 ? "bg-reply-one" : "bg-reply-two"}`}
                                                        style={{ borderRadius: "0px" }}
                                                    >
                                                        <div dangerouslySetInnerHTML={{ __html: data.resposta }}></div>

                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={"col-md-12"}>
                                            <div className="card">
                                                <div className={"card-body text-center"}>
                                                    {t("No_Response_Found")}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </PerfectScrollbar>
                            </div>
                            <div className={"col-md-12"}>
                                <div className="card">
                                    <div class={"card-body"}>
                                        <form method="post" name="myform" className="currency_validate">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <label className="mr-sm-2">
                                                                    {t("Application_Responder")}
                                                                </label>
                                                                <textarea
                                                                    className="form-control"
                                                                    name="conteudo"
                                                                    id="conteudo"
                                                                    cols="30"
                                                                    rows="5" // Defina o número de linhas que deseja exibir
                                                                    required={true}
                                                                    value={resposta}
                                                                    onChange={handleRespostaChange}
                                                                />


                                                            </div>
                                                            <div className='col-md-6 mt-3'>
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-success"
                                                                    onClick={handleRespostaSubmit}
                                                                    disabled={submitting}
                                                                >
                                                                    {submitting ? t("Sending_Reply") : t("Send_Reply_Support")}
                                                                </button>
                                                            </div>
                                                            {responseMessage && (
                                                                <div className="col-md-12 mt-3 text-center">
                                                                    <p>{responseMessage}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BottomBar selectedIcon={"suporte"} />
        </>
    )
}

export default Contratos;

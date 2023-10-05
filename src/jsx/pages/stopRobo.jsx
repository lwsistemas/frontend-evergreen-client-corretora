import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar/sidebar';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../services/index'
import { User } from '../store/User/User.action'
import BottomBar from '../layout/sidebar/bottom-bar';
import Moment from "react-moment";
import { Dialog } from '@mui/material';
import { Button } from 'react-bootstrap';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';


function Exchange() {
    const { t } = useTranslation()
    const parametros = useParams();
    const user = useSelector(state => state.user)
    const [ContratoAtual] = useState(parametros.id);
    const [Robot, setRobot] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [RoboStop, setRoboStop] = useState(false);
    const dispatch = useDispatch()

    const validateData = async (e) => {
        e.preventDefault();
        await handleSubmitData()

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

    const getRobot = async () => {
        try {
            const Robot = (
                await axios.get(`/marketinvestment/robo/relatorio/${ContratoAtual}`)
            ).data;
            setRobot(Robot);
        } catch (err) {
            return err.response;
        }
    };





    const handleSubmitData = async (e) => {
        const request = {
            authKey: user.authKey,
            hashTransaction: ContratoAtual,
            id: Robot.id

        }
        try {
            const RoboStop = (await axios.post(`/marketinvestment/robo/stop/`, request)).data;
            setRoboStop(RoboStop)
            openDialog()
        } catch (error) {

            console.log(error)
        }
    }

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        window.location.href = '/robos';
    };

    useEffect(() => { }, [isDialogOpen]);
    useEffect(async () => {
        await validUser()
        await getRobot()
        if (Robot.status == 99) {
            window.location.href = '/robos';
        }

    }, [])


    return (
        <>
            <Header2 title={t("Your robots")} />
            <Sidebar selectedItem="markets" />
            <div className="content-body">
                <div className="container">
                    <div className="card">
                        <div className="col-xl-12 col-lg-12 col-md-12">


                            <div className="card-body">
                                <div>{Robot.moedaSimbolo}/USD - {Robot.hashTransaction} <small>{t("Data")} <Moment format="DD/MM/YY - HH:mm">
                                    {Robot.createdAt}
                                </Moment> </small>

                                    {RoboStop.status}

                                    {(() => {
                                        if (Robot.status == 0) {
                                            return (
                                                <span className="badge badge-info">
                                                    {t("Application_Ativos")}
                                                </span>
                                            );
                                        } else if (Robot.status == 1) {
                                            return (
                                                <span className="badge badge-success">
                                                    {t("Application_Aguardando")}
                                                </span>
                                            );
                                        } else if (Robot.status == 2) {
                                            return (
                                                <span className="badge badge-warning">
                                                    {t("Application_Finalizado")}
                                                </span>
                                            );
                                        } else if (Robot.status == 3) {
                                        } else {
                                            return (
                                                <span className="badge badge-info">
                                                    {t("Application_Outros")}
                                                </span>
                                            );
                                        }
                                    })()}

                                </div>
                                <h5 className="text-gray">
                                    {t("Application_Investimento")}{" "}
                                    {Intl.NumberFormat("en", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(Robot.valor)}{" "}
                                </h5>
                                <h5 className="text-gray">
                                    {" "}
                                    {t("Application_Retorno")}
                                    {Intl.NumberFormat("en", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(Robot.ganho)}{" "}
                                </h5>

                                <h5 className="text-gray">
                                    {t("Application_Available")}{" "}
                                    {(() => {
                                        if (Robot.disponivel > 0) {
                                            return (
                                                <span className="text-gray">
                                                    {Intl.NumberFormat("en", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    }).format(Robot.disponivel)}
                                                </span>
                                            );
                                        } else {
                                            return (
                                                <span className="text-danger">
                                                    $&nbsp;
                                                    {Intl.NumberFormat("en", {
                                                        maximumSignificantDigits: 4,
                                                    }).format(0.0)}
                                                </span>
                                            );
                                        }
                                    })()}
                                </h5>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    {(() => {
                        if (Robot.StopRoboWin == 0) {
                            return (
                                <div className='alert alert-danger text-center'>
                                    <h3 className='text-center text-danger'>{t("Application_Atencion")}  <i className="fa fa-exclamation-triangle"></i></h3>
                                    <p>{t('Application_msgStopRobo')}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div className='alert alert-success text-center'>
                                    <h3 className='text-center text-success'>{t("Application_Atencion")}  <i className="fa fa-exclamation"></i></h3>
                                    <p>{t('Application_msgStopRobo2')}</p>
                                </div>
                            )
                        }
                    })()}

                    <div className='cleafix align-content-center'>
                        {(() => {
                            if (Robot.status == 0) {
                                return (
                                    <form method="post" name="myform" className="currency_validate" onSubmit={validateData}>
                                        <input type="submit" class="btn btn-outline-danger btn-xxs" value={t("Application_confirm")} />
                                        <Dialog className='dialog' open={isDialogOpen} onClose={closeDialog}>
                                            <div className='dialog-content'>
                                                <DialogTitle> {
                                                    <div >
                                                        <h2 className='text-danger'>Ops!!!</h2>
                                                        <div>Seu rôbo teve uma perda de {RoboStop.Perda}%</div>
                                                    </div>}
                                                </DialogTitle>
                                                <DialogActions>

                                                    <Button onClick={closeDialog}
                                                        color="primary" autoFocus>
                                                        Fechar
                                                    </Button>
                                                </DialogActions>
                                            </div>
                                        </Dialog>
                                        <Link
                                            class="btn btn-outline-success btn-xxs  m-3"
                                            to={`/robos`}
                                        >
                                            {t("Application_cancel")}&nbsp;<i className="fa fa-close"></i>{" "}
                                        </Link>
                                    </form>
                                );
                            } else {
                                return (
                                    <span className="text-danger">
                                        Robô finalizado
                                    </span>
                                );
                            }
                        })()}




                        {/*                         
                        <button
                            class="btn btn-outline-danger btn-xxs"
                            onClick={handleStop}
                            type='submit'

                        >
                            {t("Application_confirm")}&nbsp;<i className="fa fa-check"></i>{" "}
                        </button>

                        <Link
                            class="btn btn-outline-success btn-xxs  m-3"
                            to={``}
                        >
                            {t("Application_cancel")}&nbsp;<i className="fa fa-close"></i>{" "}
                        </Link> */}
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <BottomBar selectedIcon="markets" />

        </>
    )
}

export default Exchange;
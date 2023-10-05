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
import parse from "html-react-parser";
import { Loader } from "./home/components/loader";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function BlogAtualisys() {
    const { t } = useTranslation()
    const parametros = useParams();
    const user = useSelector(state => state.user)
    const [ContratoAtual] = useState(parametros.id);
    const [Blog, setBlog] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [RoboStop, setRoboStop] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch()
    const gravata = (Blog.Gravata);





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

    const getBlog = async () => {
        try {
            const Blog = (
                await axios.get(`/blog/id/${ContratoAtual}`)
            ).data;
            setBlog(Blog);
        } catch (err) {
            return err.response;
        }
    };



    useEffect(async () => {
        await validUser();
        setIsLoading(true); // Defina isLoading como true antes de carregar o blog
        await getBlog();
        setIsLoading(false); // Defina isLoading como false após carregar o blog
    }, []);



    return (
        <>
            <Header2 title={t("Application_Blog")} />
            <Sidebar selectedItem="blog" />
            <div className="content-body">
                <div className="container">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        // Conteúdo do blog quando o carregamento estiver completo
                        <div className="card">

                            <div className='card-header'>
                                <div className='card-title'>
                                    <h3>{Blog.Titulo}</h3>
                                    <small><Moment format="DD/MM/YY - HH:mm">
                                        {Blog.createdAt}
                                    </Moment></small>
                                    <smal>Por:</smal>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="card-body text-white bg-light mt-3">
                                    <div style={{ float: 'left' }}>
                                        <img src={Blog.Imagem} className="card-img-top" alt={Blog.Titulo} style={{ maxHeight: '300px', marginRight: '20px;', padding: '0px 10px 10px 0px ' }} />
                                    </div>
                                    <div
                                        className={"text-justify"}
                                        style={{ fontSize: "16px", margin: "-0px 50px 40px 0px", color: '#000' }}
                                    >
                                        {parse(`${gravata}`)}
                                    </div>
                                    <div

                                        className={"text-justify"}
                                        style={{ fontSize: "12px", margin: "-20px 10px 20px 0px" }}
                                    >
                                        {parse(`${Blog.Conteudo}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}




                </div>
            </div>
            <BottomBar selectedIcon="blog" />

        </>
    )
}

export default BlogAtualisys;
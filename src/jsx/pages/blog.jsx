import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header2 from "../pages/home/HeaderMenu";
import Sidebar from '../layout/sidebar/sidebar';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../services/index';
import { User } from '../store/User/User.action';
import BottomBar from '../layout/sidebar/bottom-bar';
import Moment from "react-moment";
import parse from "html-react-parser";
import { Loader } from "./home/components/loader";

function BlogAtualisys() {
  const { t } = useTranslation();
  const parametros = useParams();
  const user = useSelector(state => state.user);
  const [ContratoAtual] = useState(parametros.id);
  const [ContratoTitulo] = useState(parametros.titulo);
  const [Blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const gravata = Blog.Gravata;

  const validUser = async () => {
    try {
      const valid = await axios.put("user/validUser", {
        authKey: user.authKey,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status && error.response.status === 406) {
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
      const BlogData = (await axios.get(`/blog/id/${ContratoAtual}`)).data;
      setBlog(BlogData);
    } catch (err) {
      return err.response;
    }
  };

  useEffect(async () => {
    await validUser();
    setIsLoading(true);
    await getBlog();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Header2 title={t("Application_Blog")} />
      
      <div className="content-body">
        <div className="container">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="card-news">
              <div className="card-news-header">
                <h3 className="card-news-title">{Blog.Titulo}</h3>
                <div className="card-news-meta">
                  <small className="card-news-date">
                    <Moment format="DD/MM/YY - HH:mm">
                      {Blog.createdAt}
                    </Moment>
                  </small>
                  <small className="card-news-author">
                    Por: {Blog.Por}
                  </small>
                </div>
              </div>
              <div className="card-news-content">
                <img
                  src={Blog.Imagem}
                  alt={Blog.Titulo}
                  className="card-news-image"
                />
                <div className="card-news-text">
                  {parse(`${gravata}`)}
                </div>
              </div>

              <div className="card-news-content">
               
                <div className="card-news-text">
                {parse(`${Blog.Conteudo}`)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomBar selectedIcon="blog" />
    </>
  );
}

export default BlogAtualisys;

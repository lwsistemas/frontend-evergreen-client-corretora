import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useMediaQuery } from "@material-ui/core";
import axios from "../../../../services/index";
import Moment from "react-moment";
import { Loader } from "../../home/components/loader";

function BlogCard({ blog }) {
  return (
    <div className="col-xl-4 col-lg-4 col-md-12">
      <div className="blog-grid">
        <div className="card">
          <img className="img-fluid" src={blog.Imagem} alt="" />
          <div className="card-body">
            <Link to={`/abrir-blog/id/${blog.id}`}>
              <h4 className="card-title">{blog.Titulo}</h4>
            </Link>
          </div>
          <div className="card-footer">
            <div className="meta-info">
              <Link to={`/abrir-blog/id/${blog.id}`} className="post-date">
                <i className="fa fa-calendar"></i>{" "}
                <Moment format="DD/MM/YY - HH:mm">
                  {blog.createdAt}
                </Moment>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoticiasHome() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [ConteudoBlogs, setConteudoBlogs] = useState([]);
  const isSmallerThan992 = useMediaQuery("(min-width: 992px)");
  const [isLoading, setIsLoading] = useState(true);
  const [isPrimeiraVez, setIsPrimeiraVez] = useState(true);

  const getBlog = async () => {
    try {
      const response = await axios.get("/blog/all");
      setConteudoBlogs(response.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isPrimeiraVez) {
      getBlog();
      setIsPrimeiraVez(false);
    }
  }, []);

  return (
    <div className="blog section-padding" id="blog">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-title text-center">
              <h2>Notícias do mercado financeiro</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {ConteudoBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoticiasHome;

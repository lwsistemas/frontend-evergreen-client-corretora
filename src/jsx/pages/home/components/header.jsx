import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ScrollspyNav from "react-scrollspy-nav";
import LogoHeader from "../../../../images/brand/logoHeader.png";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../../element/languageSelect";
import axios from "../../../../services";
import ButtonPrimary from "../../../../components/button/primary";

function Header() {
  const parametros = useParams();
  const [ContratoAtual] = useState(parametros.IdSponser);
  const [contract, setContract] = useState([]);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [headerTransparent, setHeaderTransparent] = useState(true);

  const getContract = async () => {
    try {
      const contract = (await axios.get(`/user/sponsor/${ContratoAtual}`)).data;
      setContract(contract);
      return contract;
    } catch (err) {
      return err.message;
    }
  };

  useEffect(() => {
    getContract();
  }, []);

  function Mref() {
    if (ContratoAtual == null) {
      return null;
    } else {
      if (contract.status === "success") {
        return (
          <div className="container">
            <div style={{ marginLeft: "9px", color: "white" }}>
              {t("Application_VoceEstaSendo")} <b>{contract.firstName}</b>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div
              style={{ marginLeft: "9px", color: "white" }}
              className="badge badge-danger"
            >
              {t("Application_Naoexiste")} <b>{ContratoAtual}</b>
            </div>
          </div>
        );
      }
    }
  }

  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > 0) {
        setHeaderTransparent(false);
        if (currentScrollPosition > prevScrollPosition) {
          setHeaderScrolled(true);
        } else {
          setHeaderScrolled(false);
        }
      } else {
        setHeaderTransparent(true);
      }

      prevScrollPosition = currentScrollPosition;
    };

    let prevScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClassName = `header ${headerTransparent ? "transparent" : ""} ${headerScrolled ? "scrolled" : ""
    }`;

  return (
    <div className={headerClassName}>
      <div className="container">
        <div className="row">
          <div className="col">
            <Navbar expand="lg" style={{ padding: "0" }}>
              <Navbar.Brand>
                <a href="./">
                  <img
                    src={LogoHeader}
                    style={{
                      width: 100,
                      maxHeight: "70px",
                      transition: "opacity 0.3s",
                      ":hover": { opacity: 2.5 },
                    }}
                    alt="Logo"
                  />
                </a>
              </Navbar.Brand>
              <Nav.Link className="nav-Nav.link" as={Link} to="./">
                {t("Home")}
              </Nav.Link>
              <NavDropdown
                title={t("Application_Mercados")}
                id="nav-dropdown-markets"
              >
                <NavDropdown.Item as={Link} to="./actives" >
                  {t('Active')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="./historic">
                  {t('Historic')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="./allnews">
                  {t('Noticias')}
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={t("Application_QuemSomos")}
                id="nav-dropdown-about"
              >
                <NavDropdown.Item as={Link} to="./ourhistory" >
                  {t('Our story')}
                </NavDropdown.Item>
                {/*
                <NavDropdown.Item as={Link} to="./howworks">
                  {t('How it works')}
                  </NavDropdown.Item>
                  */}
              </NavDropdown>
              {/*<Nav.Link className="nav-Nav.link" as={Link} to="./termsofuse">
                {t('Terms of use')}
                  </Nav.Link> */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
               {/* <ScrollspyNav
                  scrollTargetIds={[
                    "home",
                    "price",
                    "portfolio",
                    "testimonial",
                    "app",
                    "about",
                  ]}
                  offset={-50}
                  activeNavClass="active"
                  scrollDuration={100}
                  headerBackground="true"
                >
                </ScrollspyNav>*/}
                <Mref />
                <Nav
                  className="ml-auto mb-2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <div className="d-flex" style={{ gap: "24px", alignItems: "center" }}>
                    <div className="d-none d-lg-block">
                      <LanguageSelect />
                    </div>
                    <Link to="/signin">
                      <ButtonPrimary>{t("Sign in")}</ButtonPrimary>
                    </Link>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
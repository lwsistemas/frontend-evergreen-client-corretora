import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import pt from "../../images/promo/ptbr.png";
import en from "../../images/promo/eng.png";
import es from "../../images/promo/esp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function SelectLanguage() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [label, setLabel] = useState("");
    const [flag, setFlag] = useState("");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("currentLanguage");
        const savedFlag = localStorage.getItem("flag");

        if (savedLanguage) {
            i18next.changeLanguage(savedLanguage);
            setLabel(savedLanguage.toUpperCase());
            setFlag(savedFlag);
        } else {
            const initialLanguage = i18next.language;
            localStorage.setItem("currentLanguage", initialLanguage);
            setLabel(t(initialLanguage.toUpperCase()));
            setFlag(getFlagByLanguage(initialLanguage));
        }
    }, []);

    const getFlagByLanguage = (language) => {
        switch (language) {
            case "pt":
                return pt;
            case "en":
                return en;
            case "es":
                return es;
            default:
                return "";
        }
    };

    const handleLanguageChange = (language) => {
        i18next.changeLanguage(language);
        setLabel(language.toUpperCase());
        const selectedFlag = getFlagByLanguage(language);
        setFlag(selectedFlag);
        localStorage.setItem("currentLanguage", language);
        localStorage.setItem("flag", selectedFlag);
        setShowModal(false);
    };

    return (
        <>
            <FontAwesomeIcon
                icon={faGlobe}
                className="icone-mundo"
                onClick={() => setShowModal(true)} />
            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="modal-languagem modal-dark">
                <Modal.Header closeButton>
                    <Modal.Title>{t("Application_SelectLanguage")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="language-list">
                        <li onClick={() => handleLanguageChange("pt")}>
                            <img src={pt} alt="Portuguese" />
                            {t("Portuguese")}
                        </li>
                        <li onClick={() => handleLanguageChange("en")}>
                            <img src={en} alt="English" />
                            {t("English")}
                        </li>
                        <li onClick={() => handleLanguageChange("es")}>
                            <img src={es} alt="Spanish" />
                            {t("Spanish")}
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SelectLanguage;

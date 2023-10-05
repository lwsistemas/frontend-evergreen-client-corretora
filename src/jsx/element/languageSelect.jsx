import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import pt from "../../images/promo/ptbr.png";
import en from "../../images/promo/eng.png";
import es from "../../images/promo/esp.png";

function SelectLanguage() {
  const { t } = useTranslation();
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
  };

  return (
    <Dropdown
      style={{
        position: "relative",
        right: 0,
        top: 4,
      }}
    >
      <Dropdown.Toggle
        id="dropdown-basic"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <img
          src={flag}
          style={{
            width: 20,
            maxHeight: "95px",
            float: "left",
          }}
        />
        <p style={{ margin: "0" }}>{label}</p>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          onClick={() => handleLanguageChange("pt")}
        >
          <img
            src={pt}
            style={{
              width: 20,
              maxHeight: "70px",
              float: "left",
            }}
          ></img>
          &nbsp;
          {t("Portuguese")}
        </Dropdown.Item>
        <Dropdown.Item
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          onClick={() => handleLanguageChange("en")}
        >
          {" "}
          <img
            src={en}
            style={{
              width: 20,
              maxHeight: "70px",
              float: "left",
            }}
          ></img>
          &nbsp; {t("English")}
        </Dropdown.Item>
        <Dropdown.Item
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          onClick={() => handleLanguageChange("es")}
        >
          {" "}
          <img
            src={es}
            style={{
              width: 20,
              maxHeight: "70px",
              float: "left",
            }}
          ></img>
          &nbsp; {t("Spanish")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SelectLanguage;

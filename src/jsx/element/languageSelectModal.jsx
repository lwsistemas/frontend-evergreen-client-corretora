import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import ptbr from "../../images/promo/ptbr.png";
import eng from "../../images/promo/eng.png";
import esp from "../../images/promo/esp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faL } from "@fortawesome/free-solid-svg-icons";

const LANGUAGE_OPTIONS = [
  { language: "pt", flag: ptbr, label: "Portuguese" },
  { language: "en", flag: eng, label: "English" },
  { language: "es", flag: esp, label: "Spanish" },
];

function SelectLanguage() {
  const { t } = useTranslation();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("currentLanguage");
    const savedFlag = localStorage.getItem("flag");

    if (savedLanguage) {
      updateLanguage(savedLanguage, savedFlag);
    } else {
      const initialLanguage = i18next.language;
      updateLanguage(initialLanguage, getFlagByLanguage(initialLanguage));
      saveLanguageToLocalStorage(initialLanguage, getFlagByLanguage(initialLanguage));
    }
  }, []);

  const updateLanguage = (language, flag) => {
    i18next.changeLanguage(language);
    saveLanguageToLocalStorage(language, flag);
    setShowLanguageSelector(false)
  };

  const saveLanguageToLocalStorage = (language, flag) => {
    localStorage.setItem("currentLanguage", language);
    localStorage.setItem("flag", flag);
  };

  const getFlagByLanguage = (language) => {
    return LANGUAGE_OPTIONS.find((option) => option.language === language)?.flag || "";
  };

  return (

    <>
      <FontAwesomeIcon
        icon={faGlobe}
        className="icone-mundo"
        onClick={() => setShowLanguageSelector(!showLanguageSelector)}
      />
      {showLanguageSelector && (
        <div className="language-selector-container">
          <div className="language-list">
            <div className="textSelecione">Selecione seu idioma</div>
            {LANGUAGE_OPTIONS.map((option) => (
              <div key={option.language} onClick={() => updateLanguage(option.language, option.flag)} className="botaoLanguagem">
                <div className="textLanguagem">
                  <img src={option.flag} alt={option.label} /> {t(option.label)}</div>
              </div>
            ))}

          </div>
        </div>
      )}
    </>

  );
}

export default SelectLanguage;

import Title from "../../components/text/title";
import Header from "./home/components/header";
import Footer1 from "../layout/footer1";
import { useTranslation } from "react-i18next";

function PolicyAndPrivacy() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="section-padding">
        <div className="container">
          <div className="mt-5 mb-5">
            <div className="text-uppercase">
              <Title className="text-uppercase">
                {t("Title_Page_Policy_And_Privacy")}
              </Title>
            </div>
            <span className="mt-2">{t("Last_Update")}2023/07/23</span>
          </div>
          <h3>{t("Thankyou_Choosing_Infinity_Capital_Global")}</h3>

          <h3 className="mt-5">1. Informações de Identificação</h3>
          <ul className="mt-3">
            <li>
              <b>Nome da Empresa:</b> Infinity Capital
            </li>
            <li>
              <b>Email:</b> contato@infinitycapital.global
            </li>
            <li>
              <b>Global Endereço:</b> 83 Clemenceau Ave, 8nd Floor - Singapore
              239920 Registro: 9007828
            </li>
            <li>
              <b>Telefone:</b> 55 11 99999-0000
            </li>
          </ul>

          <h3 className="mt-5">2. {t("Consent")}</h3>
          <p className="mt-3">{t("By_Using_Our_Services")}</p>

          <h3 className="mt-5">3. {t('About_The_Company')}</h3>
          <p className="mt-3">
            {t('Infinity_Capital_Global_Is_A_Financial_Platform')}
          </p>

          <h3 className="mt-5">4. {t('Data_Collect')}</h3>
          <p className="mt-3">
            {t('In_Order_To_Provide')}
          </p>

          <h3 className="mt-5">5. {t('Purposes_Data_Processing')}</h3>
          <p className="mt-3">
            {t('The_Personal_Data_Collected')}
          </p>

          <h3 className="mt-5">6. {t('Data_Sharing')}</h3>
          <p className="mt-3">
            {t('Infinity_Capital_Global_Will_Not_Share')}
          </p>

          <h3 className="mt-5">7. {t('Data_Security')}</h3>
          <p className="mt-3">
            {t('We_Adopt_Technical')}
          </p>

          <h3 className="mt-5">8. {t('Cookies_Tracking_Technologies')}</h3>
          <p className="mt-3">
            {t('Our_Website_Uses_Cookies')}
          </p>

          <h3 className="mt-5">9. {t('Your_Rights')}</h3>
          <p className="mt-3">
            {t('You_Have_Rights')}
          </p>

          <h3 className="mt-5">10. {t('Minors')}</h3>
          <p className="mt-3">
            {t('Our_Services_Are_Not_Intended')}
          </p>

          <h3 className="mt-5">
            11. {t('Application_O_Seriousness')}
          </h3>
          <p className="mt-3">
           {t('At_Infinity_Capital_Global')}
          </p>

          <h3 className="mt-5">12. {t('Changes_To_The_Privacy_Policy')}</h3>
          <p className="mt-3">
           {t('We_Reserve_The_Right_To_Update')}
          </p>

          <h3 className="mt-5">13. {t('Contact_And_Support')}</h3>
          <p className="mt-3">
            {t('In_Case_Of_Douts')}
          </p>
        </div>
      </div>
      <Footer1 />
    </>
  );
}

export default PolicyAndPrivacy;
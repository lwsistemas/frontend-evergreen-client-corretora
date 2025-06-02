import Header from "./home/HeaderIndex.jsx";
import Footer1 from "../layout/footer1";
import Hero from "./home/components/hero_ativos.jsx";
import Card from 'react-bootstrap/Card';
import imgCrypto from '../../images/crypto-currency-3130381_1280.jpg'; // Imagem de criptomoedas
import imgCrypto2 from '../../images/crypto-7678815_1280.jpg'; // Imagem de criptomoedas
import imgStocks from '../../images/ai-generated-8490532_1280.png'; // Imagem do mercado de ações
import imgEducation from '../../images/pupil-8767596_1280.jpg'; // Imagem de educação financeira
import { Link } from "react-router-dom";


function OurHistory() {
  return (
    <>
      <Header />
      <Hero />
      <div className="section-padding">
        <div className="container">
          <div className="row">

            <div className="col-md-12">
              <Card bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>Entendendo os Ativos: Criptomoedas e Ações</Card.Title>
                  <Card.Text>
                    Os ativos são instrumentos financeiros que podem ser comprados, vendidos ou negociados. Eles são classificados em várias categorias, incluindo ações, títulos, imóveis e criptomoedas. Enquanto as ações representam a propriedade em uma empresa e são negociadas em bolsas de valores, as criptomoedas são ativos digitais que operam em plataformas descentralizadas, utilizando a tecnologia blockchain para garantir segurança e transparência.
                  </Card.Text>
                  <img src={imgCrypto} alt="Criptomoedas" className="img-fluid" />
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-12">
              <Card bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>Como Funcionam as Criptomoedas</Card.Title>
                  <Card.Text>
                    As criptomoedas são criadas através de um processo chamado mineração ou por meio de ofertas iniciais de moedas (ICOs). Elas podem ser armazenadas em carteiras digitais e usadas para transações, investimentos ou trocas por outras moedas. A descentralização das criptomoedas permite aos usuários realizarem transações sem a necessidade de intermediários, como bancos, aumentando a privacidade e a segurança.
                  </Card.Text>
                  <img src={imgCrypto2} alt="Funcionamento das Criptomoedas" className="img-fluid" />
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-12">
              <Card bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>O Mercado de Ações</Card.Title>
                  <Card.Text>
                    O mercado de ações permite que investidores comprem e vendam ações de empresas listadas em bolsas, como a NYSE ou a NASDAQ. Investir em ações pode proporcionar dividendos e valorização do capital. Os investidores podem adquirir ações de empresas emergentes ou consolidadas, diversificando assim suas carteiras para mitigar riscos.
                  </Card.Text>
                  <img src={imgStocks} alt="Mercado de Ações" className="img-fluid" />
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-12">
              <Card bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>Oportunidades de Lucro</Card.Title>
                  <Card.Text>
                    Os usuários podem lucrar ao negociar tanto criptomoedas quanto ações de várias maneiras:
                    <ul>
                      <li><strong>Negociação de Curto Prazo:</strong> Comprar e vender ativos rapidamente para aproveitar flutuações de preço, seja no mercado de ações ou no de criptomoedas.</li>
                      <li><strong>Investimento a Longo Prazo:</strong> Adquirir criptomoedas ou ações e mantê-las por um período, visando valorização futura.</li>
                      <li><strong>Staking:</strong> Participar de redes de criptomoedas que permitem staking, onde os investidores bloqueiam suas moedas para validar transações, recebendo recompensas.</li>
                      <li><strong>Dividendos:</strong> Investir em ações de empresas que pagam dividendos regulares, proporcionando uma fonte de renda passiva.</li>
                      <li><strong>Yield Farming:</strong> Fornecer liquidez a plataformas de finanças descentralizadas (DeFi) em troca de juros ou tokens adicionais.</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-12">
              <Card bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>Riscos e Considerações</Card.Title>
                  <Card.Text>
                    Embora existam muitas oportunidades, tanto o mercado de criptomoedas quanto o de ações apresentam riscos significativos. A volatilidade pode resultar em perdas rápidas. Portanto, é fundamental que os investidores realizem pesquisas detalhadas, analisem tendências de mercado, diversifiquem suas carteiras e considerem fatores como segurança e liquidez antes de se envolverem em negociações.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-12">
              <Card bg="primary">
                <Card.Body>
                  <Card.Title style={{ fontSize: "22px" }}>A Importância da Educação Financeira</Card.Title>
                  <Card.Text>
                    Para maximizar as oportunidades e minimizar os riscos, a educação financeira é crucial. Compreender como funcionam os mercados de ações e criptomoedas, as estratégias de investimento e a análise de riscos pode capacitar os investidores a tomar decisões informadas e a se adaptar às mudanças do mercado.
                  </Card.Text>
                  <img src={imgEducation} alt="Educação Financeira" className="img-fluid" />
                </Card.Body>
              </Card>
            </div>

            {/* Botão centralizado "Criar sua conta" */}
            <div className="col-md-12 text-center" style={{ marginTop: "30px" }}>
              <Link to={"./signup/createUser"}><button className="btn btn-outline-primary" style={{ padding: "10px 20px", fontSize: "18px" }}>
                Crie sua conta
              </button></Link>
            </div>

          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}

export default OurHistory;
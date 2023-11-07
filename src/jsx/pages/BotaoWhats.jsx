import React, { useEffect, useState } from "react";
import IconeWhats from '../../../images/iconeAtendimento.png';
import axios from "../../../services/index";
import { useSelector } from "react-redux";

const ChatButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [Data, setData] = useState({ CelularAtendimento: "" }); // Initialize data as an object
  const user = useSelector((state) => state.user);

  console.log(user);
  
  const currentDate = new Date();
  function generateRandomNumberWithDatePrefix() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
  
    const datePrefix = `${year}${month}${day}`;
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000); // Generate 8 random digits
    
    const protocolNumber = `${datePrefix}${randomDigits}`;
    return protocolNumber;
  }

  const NomeGerente = Data.AtendidoPor;
  const FirstName = user ? user.firstName : "";
  const SecondName = user ? user.secondName : "";
  const Email = user ? user.email : "";
  const Mobile = user ? user.mobile : "";
  
  const NumeroAleatorio = generateRandomNumberWithDatePrefix();  
  const Msg = `
  %0DOlá Sr(a) ${NomeGerente}, tudo bem?
  %0DEu preciso de atendimento na plataforma *Infinity Capital*
  %0D*Usuário: ${FirstName + " " + SecondName}*
  %0D*E-mail: ${Email}*
  %0D*Atendimento iniciado: ${currentDate}*
  %0D*Protocolo N: ${NumeroAleatorio}*`;
  
  const getUser = async () => {
    try {
      const response = await axios.post(`/user/view/`, { authKey: user.authKey });
      setData(response.data); // Set data with the response data
    } catch (err) {
      console.log("Erro ao buscar os dados do usuário:", err);
    }
  };

  useEffect(() => {
    if (user !== null) {
      getUser();
    }
  }, [user]);

  return (
    <div
      className={`chat-container ${isHovered ? 'visible' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={`https://wa.me/55${Data.CelularAtendimento.replace(/[-()\s]/g, "")}?text=${Msg}`} target="_blank">
        <img
          src={IconeWhats}
          alt="WhatsApp"
          className="whatsapp-icon"
        />
        <span className={`chat-text ${isHovered ? 'visible' : ''}`}>Iniciar Atendimento</span>
      </a>
    </div>
  );
};

export default ChatButton;


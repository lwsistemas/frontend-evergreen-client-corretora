import React from "react";
import IconeWhats from '../../images/iconeAtendimento.png'

const WhatsAppButton = () => {
  return (
    <div className="whatsapp-container">
      <a href="https://wa.me/SEU-NUMERO-DE-TELEFONE" target="_blank">
        <img
          src={IconeWhats}
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </div>
  );
};

export default WhatsAppButton;
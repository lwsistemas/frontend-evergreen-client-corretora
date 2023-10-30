import { Toast } from 'react-bootstrap';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

function OrderModal(props) {
  const color = props.operationProps.operationStatus ? '#10d876' : '#E50202'
  const stilo = {
    position: 'fixed',
    zIndex: 999,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '50%', // Alterado para 50% para centralizar verticalmente
    left: '50%', // Alterado para 50% para centralizar horizontalmente
    transform: 'translate(-50%, -50%)', // Para ajustar a posição correta
    backgroundColor: color,
    color: 'white',
    // Adicione largura e altura se necessário
    width: '100%',
    height: 'auto',
  }
  
  return (
    <Toast onClose={false} show={props.show} delay={6000} autohide style={stilo}>
      <Toast.Header closeButton={true}>
        <div>{props.operationProps.header}</div>
      </Toast.Header>
      <Toast.Body>{props.operationProps.body}</Toast.Body>
    </Toast>)
}
export default OrderModal
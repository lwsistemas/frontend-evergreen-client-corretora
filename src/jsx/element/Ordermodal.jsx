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
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: color,
    color: 'white'
  }
  return (
    <Toast onClose={false} show={props.show} delay={6000} autohide style={stilo}>
      <Toast.Header closeButton={false}>
        <div>{props.operationProps.header}</div>
      </Toast.Header>
      <Toast.Body>{props.operationProps.body}</Toast.Body>
    </Toast>)
}
export default OrderModal
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

function QrCodeView(props) {
  const {t} = useTranslation()
  return ( 
    <img src={
      props.link
    }
    alt=""
    width="350"/>
  )
}
export default QrCodeView
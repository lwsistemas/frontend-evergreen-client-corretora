import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

function PicPayView(props) {
  const {t} = useTranslation()
  return ( 
    <a class="btn btn-success btn-block mt-2 mb-4" href={props.link} target="_blank">
          {t('Access QR code on PicPay')}
    </a>  
  )
}
export default PicPayView
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';

function PdfView(props) {
  const {t} = useTranslation()
  
  return ( 
    <div>
      <Document
            file={props.link}
      />
    <a class="btn btn-success btn-block mt-2 mb-4" href={props.link} target="_blank">
          {t('Access the bankslip')}
    </a>
    </div>
  )
}
export default PdfView
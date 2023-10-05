import {Toast} from 'react-bootstrap';
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

function TransferModal(props) {
  
  const [colorButton, setColorButton] = useState({backgroundColor:'#bf0202',borderColor:'#bf0202' })
  const color = props.operationProps.operationStatus ? '#10d876' : '#E50202'
  const {t} = useTranslation()
  const stilo = {
    position:  'bottom-center', 
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
          <Toast.Header closeButton={true}>
              <div>{props.operationProps.header}</div>
          </Toast.Header>
          <Toast.Body>{props.operationProps.body}</Toast.Body>
          <div><button
                    style={
                        colorButton
                    }
                    className="btn btn-success btn-block mt-4 col-xl-7" > 
                            {t('Close')}
                                          </button></div>

  </Toast>)

}
export default TransferModal
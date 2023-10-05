import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import {useSelector, useDispatch} from 'react-redux'

function GweiSelect(props) {
    const { t } = useTranslation()
    const [label, setLabel] = useState('Normal')
    //     if(init != undefined){
    //         if(init != ''){
    //             console.log("tax+valor= ",parseFloat(init.toString().replace(',', '.')) + tax)
    //             props.setFinalValue(parseFloat(init.toString().replace(',', '.')) + tax)
    //         }
    //     }
    // }
        

        

    return (
        <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
        {t(label)}
        </Dropdown.Toggle>
        <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                   setLabel('Lento')
                   props.getGas('SafeGasPrice',props.initValue)
                }}>{t("Lento")}</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    setLabel('Normal')
                    props.getGas('ProposeGasPrice',props.initValue)
                    
                }}>{t("Normal")}</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    setLabel('Rapido')
                    props.getGas('FastGasPrice',props.initValue)
                }}>{t("Rapido")}</Dropdown.Item>
        
        </Dropdown.Menu>
    </Dropdown>

    )
}
export default GweiSelect

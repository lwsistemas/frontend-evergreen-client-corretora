import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import {useSelector, useDispatch} from 'react-redux'
import transfer from '../jsonConfig/globalConfig.json'

function TransferSelect(props) {
    const { t } = useTranslation()
    const [label, setLabel] = useState('Select your type Tranfer')
    const user = useSelector(state => state.user)

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            {t(label)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                 {transfer.transferType.map(transfer=>(
                    <Dropdown.Item onClick={() => {
                        setLabel(transfer.name)
                        props.onChange(transfer.type)
                    }}>{t(transfer.name)}</Dropdown.Item>
                 ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default TransferSelect

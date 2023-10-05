import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import {useSelector, useDispatch} from 'react-redux'
import banks from './banks.json'

function WithdawTypeSelect(props) {
    const { t } = useTranslation()
    const [label, setLabel] = useState('Change withdraw method')
    const user = useSelector(state => state.user)
    
    return (
        <Dropdown >
            <Dropdown.Toggle id="dropdown-basic" className="w-100 overflow-hidden">
                 {t(label)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                    setLabel('Pix')
                    props.onChange('Pix')
                }}>Pix</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    setLabel('Bank')
                    props.onChange('Bank')
                }}>{t("Bank")}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default WithdawTypeSelect

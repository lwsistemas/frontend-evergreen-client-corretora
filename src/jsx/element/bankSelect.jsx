import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import { useSelector, useDispatch } from 'react-redux'
import banks from './banks.json'

function BankSelect(props) {
    const { t } = useTranslation()
    const [label, setLabel] = useState('Select your bank')
    const user = useSelector(state => state.user)
    const [selectedValue, setSelectedValue] = useState(banks.banks[0].slug);

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {t(label)}
            </Dropdown.Toggle>
            <Dropdown.Menu>

                <Dropdown.Item
                    onClick={() => {
                        setLabel(t(banks.banks[0].name));
                        props.onChange(banks.banks[0].slug);
                        setSelectedValue(banks.banks[0].slug); // Defina o valor selecionado
                    }}
                >
                    {t(banks.banks[0].name)}
                </Dropdown.Item>




            </Dropdown.Menu>
        </Dropdown>
    )
}
export default BankSelect

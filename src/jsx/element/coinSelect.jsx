import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import axios from '../../services/index'
import {useSelector, useDispatch} from 'react-redux'
import coins from '../jsonConfig/globalConfig.json'

function CoinSelect(props) {
    const { t } = useTranslation()
    const [label, setLabel] = useState('Select your token')
    const user = useSelector(state => state.user)

    return (

        <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
            {t(label)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                 {coins.coins.map(coin=>(
                    <Dropdown.Item onClick={() => {
                        setLabel(coin.symbol)
                        props.onChange(coin.id)
                    }}>{coin.symbol}</Dropdown.Item>
                 ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default CoinSelect

import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import Coins from '../../jsonConfig/globalConfig.json'

function CoinTypeSelect(props) {
    const { setActive, setAllValues,balance,value} = props
    const { t } = useTranslation()
    //   const [label, setLabel] = useState(props.currency)

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                {t(props.currency)}
            </Dropdown.Toggle>
            <Dropdown.Menu>f
                {Coins.coinsDB.map(coin => (
                    <Dropdown.Item onClick={() => {
                        // setLabel(coin.symbol)
                        //  props.eventKey=coin.idname
                        setActive(coin.idname)
                        setAllValues(coin.name, coin.id, coin.icon,balance,value)
                    }}>{t(coin.name)}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default CoinTypeSelect

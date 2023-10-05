import React, {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
function DocumentType() {
    const { t } = useTranslation()
    const [label, setLabel] = useState('Select Your Document')
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {t(label)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                    setLabel("CPF")
                }}>{t("CPF")}</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    setLabel("CNPJ")
                }}>{t("CNPJ")}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default DocumentType

import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import optdoc from '../../../jsonConfig/globalConfig.json'

function DocSelect(props) {
    const { setTypeUser, setTypeDoc,checkValues,cardFile} = props
    const { t } = useTranslation()
    const [label, setLabel] = useState('Select the document type')

    return (

        <Dropdown>
            <Dropdown.Toggle  id="dropdown-basic" drop='left' >
                {t(label)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {optdoc.optDoc.map(doc => (
                    <Dropdown.Item onClick={() => {
                        setTypeUser(doc.id)
                        setTypeDoc(doc.name)
                        checkValues(cardFile,doc.name)
                        setLabel(doc.name)
                    }}>{doc.name}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default DocSelect

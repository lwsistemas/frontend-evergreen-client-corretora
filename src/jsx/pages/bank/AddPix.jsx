import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../../services/index'

function AddPix({ showAllData }) {
  const user = useSelector(state => state.user)
  const [nameUser, setNameUser] = useState(user.firstName + " " + user.secondName)
  const [name, setName] = useState('')
  const [typePix, setTypePix] = useState('cpf')
  const [pix, setPix] = useState('')
  const handleSubmitPix = async (e) => {
    e.preventDefault()
    const data = {
      uid: user.id, typePix, name, pix,
      holderName: nameUser
    }
    try {
      const response = (await axios.post('banks/registerpix', data)).data
      showAllData()
    } catch (err) {

    }
  }
  const { t } = useTranslation()

  return (
    <Card.Body>
      <Form onSubmit={handleSubmitPix}>
        <Form.Group controlId="fromGridUser">
          <Form.Label>{t("Holder name")} </Form.Label>
          <Form.Control type="text" value={nameUser} />
        </Form.Group>
        <Form.Group controlId="fromGridBank">
          <Form.Label>{t("Type of key")}</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setTypePix(e.target.value.toUpperCase())}
          >
            <option value="cpf">CPF</option>
            <option value="email">E-mail</option>
            <option value="mobile">{t("Mobile")}</option>
            <option value="rando">{t("Random Key")}.</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="fromGridUser">
          <Form.Label>{t("Name")} </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
          />
        </Form.Group>
        <Form.Group controlId="fromGridBank">
          <Form.Label>{t("Key")} PIX</Form.Label>
          <Form.Control
            type="text"
            value={pix}
            onChange={(e) => setPix(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("Finish Registration")}
        </Button>
      </Form>
    </Card.Body>
  );
}

export default AddPix
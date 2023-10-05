import React, { useState, useEffect } from 'react'
import { Card, Button, Form, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import axios from '../../../services/index'
import { useSelector, useDispatch } from 'react-redux'

function AddBank({showAllData,banks}) {
    const user = useSelector(state => state.user)
    const [bank, setBank] = useState('')
    const [accountType, setAccountType] = useState('poupanca')
    const [nameUser, setNameUser] = useState(user.firstName+" "+user.secondName)
    const [agency, setAgency] = useState()
    const [account, setAccount] = useState()
    const [digit, setDigit] = useState()
    const number = new RegExp('^[0-9]+$')

    const handleDigit = (e) => {
        if (number.test(e)) {
            setDigit(e)
        }
        if (e === '') {
            setDigit(e)
        }
    }
    const handleAgency = (e) => {
        if (number.test(e)) {
            setAgency(e)
        }
        if (e === '') {
            setAgency(e)
        }
    }
    const handleAccount = (e) => {
        if (number.test(e)) {
            setAccount(e)
        }
        if (e === '') {
            setAccount(e)
        }
    }
    const handleSubmitAccount = async (e) => {
        e.preventDefault()
        const data = { uid:user.id,
            bank,
            accountType,
            account,
            digit,
            agency,
            holderName:nameUser
        }
        try{
            const response = await axios.post('banks/register',data)
            showAllData()
        }catch(err){
            console.log(err)
        }
    }
    const { t } = useTranslation()

    return (
      <Card.Body>
        <Form onSubmit={handleSubmitAccount}>
          <Form.Group controlId="fromGridBank">
            <Form.Label>{t("Bank")}</Form.Label>
            <Form.Control as="select" onChange={(e) => setBank(e.target.value)}>
              {banks.map((e) => (
               e.cod != '' ?<option value={e.titulo}>{`${e.cod}${' - '}${e.titulo}`}</option>:
               <option value={e.titulo}>{`${e.titulo}`}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="fromGridTypeAccount">
            <Form.Label>{t("Type of account")}</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setAccountType(e.target.value.toUpperCase())}
            >
              <option value="poupanca">{t("Savings Account")}</option>
              <option value="corrente">{t("Current Account")}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="fromGridUser">
            <Form.Label>{t("Holder name")} </Form.Label>
            <Form.Control type="text" value={nameUser} />
          </Form.Group>

          <Form.Group controlId="fromGridBank">
            <Form.Label>{t("Agency")}</Form.Label>
            <Form.Control
              type="text"
              value={agency}
              onChange={(e) => handleAgency(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fromGridBank">
            <Form.Label>{t("Account number")}</Form.Label>
            <Form.Control
              type="text"
              value={account}
              onChange={(e) => handleAccount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fromGridBank">
            <Form.Label>{t("Digit")}</Form.Label>
            <Form.Control
              type="text"
              value={digit}
              onChange={(e) => handleDigit(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {t("Finish Registration")}
          </Button>
        </Form>
      </Card.Body>
    );
}

export default AddBank
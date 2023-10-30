import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import axios from '../../../services/index';
import { useSelector } from 'react-redux';

function AddBank({ showAllData, banks }) {
    const user = useSelector(state => state.user);
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        bank: '',
        accountType: 'poupanca',
        nameUser: `${user.firstName} ${user.secondName}`,
        agency: '',
        account: '',
        digit: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'agency' || name === 'account' || name === 'digit') {
            if (/^[0-9]*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmitAccount = async (e) => {
        e.preventDefault();
        const { bank, accountType, agency, account, digit, nameUser } = formData;
        const data = {
            uid: user.id,
            bank,
            accountType,
            account,
            digit,
            agency,
            holderName: nameUser,
        };

        try {
            const response = await axios.post('banks/register', data);
            showAllData();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card.Body>
            <Form onSubmit={handleSubmitAccount}>
                <Form.Group controlId="fromGridBank">
                    <Form.Label>{t("Bank")}</Form.Label>
                    <Form.Control as="select" name="bank" onChange={handleInputChange}>
                        {banks.map((e, index) => (
                            <option key={index} value={e.titulo}>
                                {e.cod ? `${e.cod} - ${e.titulo}` : e.titulo}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="fromGridTypeAccount">
                    <Form.Label>{t("Type of account")}</Form.Label>
                    <Form.Control as="select" name="accountType" onChange={handleInputChange}>
                        <option value="poupanca">{t("Savings Account")}</option>
                        <option value="corrente">{t("Current Account")}</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="fromGridUser">
                    <Form.Label>{t("Holder name")} </Form.Label>
                    <Form.Control type="text" name="nameUser" value={formData.nameUser} readOnly />
                </Form.Group>
                <Form.Group controlId="fromGridBank">
                    <Form.Label>{t("Agency")}</Form.Label>
                    <Form.Control type="text" name="agency" value={formData.agency} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="fromGridBank">
                    <Form.Label>{t("Account number")}</Form.Label>
                    <Form.Control type="text" name="account" value={formData.account} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="fromGridBank">
                    <Form.Label>{t("Digit")}</Form.Label>
                    <Form.Control type="text" name="digit" value={formData.digit} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {t("Finish Registration")}
                </Button>
            </Form>
        </Card.Body>
    );
}

export default AddBank;

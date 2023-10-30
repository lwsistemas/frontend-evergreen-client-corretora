import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import axios from '../../../services/index';

function AddPix({ showAllData }) {
    const user = useSelector(state => state.user);
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        nameUser: `${user.firstName} ${user.secondName}`,
        name: '',
        typePix: 'cpf',
        pix: '',
    });

    const handleSubmitPix = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            const data = {
                uid: user.id,
                typePix: formData.typePix,
                name: formData.name,
                pix: formData.pix,
                holderName: formData.nameUser,
            };

            try {
                const response = (await axios.post('banks/registerpix', data)).data;
                showAllData();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const isFormValid = () => {
        return formData.name.trim() !== '' && formData.pix.trim() !== '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Card.Body>
            <Form onSubmit={handleSubmitPix}>
                <Form.Group controlId="fromGridUser">
                    <Form.Label>{t("Holder name")} </Form.Label>
                    <Form.Control type="text" name="nameUser" value={formData.nameUser} readOnly />
                </Form.Group>
                <Form.Group controlId="fromGridBank">
                    <Form.Label>{t("Type of key")}</Form.Label>
                    <Form.Control as="select" name="typePix" onChange={handleInputChange}>
                        <option value="cpf">CPF</option>
                        <option value="email">E-mail</option>
                        <option value="mobile">{t("Mobile")}</option>
                        <option value="rando">{t("Random Key")}.</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="fromGridUser">
                    <Form.Label>{t("Name")} </Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="fromGridBank">
                    <Form.Label>{t("Key")} PIX</Form.Label>
                    <Form.Control type="text" name="pix" value={formData.pix} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    {t("Finish Registration")}
                </Button>
            </Form>
        </Card.Body>
    );
}

export default AddPix;

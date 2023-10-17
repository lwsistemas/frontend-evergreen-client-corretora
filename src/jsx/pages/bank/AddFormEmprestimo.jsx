import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

function formatIdDocument(idDocument) {
    idDocument = idDocument.toString().replace(/[^\d]/g, '');

    if (idDocument.length === 11) {
        // Formata CPF: 000.000.000-00
        return `${idDocument.slice(0, 3)}.${idDocument.slice(3, 6)}.${idDocument.slice(6, 9)}-${idDocument.slice(9)}`;
    } else if (idDocument.length === 14) {
        // Formata CNPJ: 00.000.000/0000-00
        return `${idDocument.slice(0, 2)}.${idDocument.slice(2, 5)}.${idDocument.slice(5, 8)}/${idDocument.slice(8, 12)}-${idDocument.slice(12)}`;
    }
    // Se não for CPF nem CNPJ, retorna o valor original
    return idDocument;
}

function AddPix({ valorParaAddPix, QtdParcelas, taxaJuros }) {
    const user = useSelector((state) => state.user);
    const { t } = useTranslation();
    const nameUser = `${user.firstName} ${user.secondName}`;
    const idDocument = formatIdDocument(user.idDocument);
    const [Valor, setValor] = useState(valorParaAddPix);
    const [Parcelas, setParcelas] = useState(QtdParcelas);
    const [Taxa, setTaxa] = useState(taxaJuros);
    const [ValorParcela, setValorParcela] = useState(0);
    const [erroValor, setErroValor] = useState(false);
    const [confirmado, setConfirmado] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (e) => {
        e.preventDefault(); // Isso impede o envio do formulário
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        const taxaJuros = parseFloat(Taxa);
        const valorEmprestimo = parseFloat(Valor);
        const numeroParcelas = Parcelas;

        if (!isNaN(taxaJuros) && !isNaN(valorEmprestimo) && !isNaN(numeroParcelas) && taxaJuros > 0) {
            const taxaJurosMensal = taxaJuros / 100;

            const valorParcela =
                valorEmprestimo * (taxaJurosMensal * Math.pow(1 + taxaJurosMensal, numeroParcelas)) / (Math.pow(1 + taxaJurosMensal, numeroParcelas) - 1);

            setValorParcela(valorParcela);
        } else {
            const valorParcela =
                valorEmprestimo / numeroParcelas
            setValorParcela(valorParcela);
        }
    }, [Valor, Parcelas, Taxa]);




    const handleConfirmacaoChange = (e) => {
        setConfirmado(e.target.checked);
    }
    const handleValorChange = (e) => {
        const novoValor = e.target.value;
        if (novoValor <= valorParaAddPix) {
            setValor(novoValor);
            setErroValor(false);
        } else {
            setErroValor(true);
        }
    };

    const handleParcelasChange = (e) => {
        setParcelas(e.target.value);
    };

    const renderParcelasOptions = () => {
        const options = [];

        for (let i = 1; i <= QtdParcelas; i++) {
            options.push(
                <option key={i} value={i}>
                    {i} {i === 1 ? t('parcela') : t('parcelas', { count: i })}
                </option>
            );
        }

        return options;
    };

    return (
        <Card.Body>
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="fromGridUser">
                            <Form.Label>{t('Application_Valor')} $</Form.Label>
                            <Form.Control
                                type="text"
                                value={Valor}
                                onChange={handleValorChange}
                                onInput={(e) => {
                                    e.preventDefault();
                                }}
                                onKeyDown={(e) => {
                                    if (
                                        (e.key === "." || e.key === ",") &&
                                        e.target.value.indexOf(".") !== -1
                                    ) {
                                        e.preventDefault();
                                    }
                                }}
                                pattern="[0-9.,]*"
                                inputMode="numeric"
                                step="0.01"
                            />

                            {erroValor && <span className="text-danger">O valor não pode ser maior que {valorParaAddPix}</span>}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="fromGridParcelas">
                            <Form.Label>{t('Parcelas')}</Form.Label>
                            <Form.Control as="select" value={Parcelas} onChange={handleParcelasChange}>
                                {renderParcelasOptions()}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="fromGridUserName">
                            <Form.Label>{t('Holder name')}</Form.Label>
                            <Form.Control type="text" value={nameUser} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="fromGridDocument">
                            <Form.Label>{t('Document')}</Form.Label>
                            <Form.Control type="text" value={idDocument} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="confirmacaoCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Eu confirmo que as informações estão corretas."
                                checked={confirmado}
                                onChange={handleConfirmacaoChange}

                            />
                        </Form.Group>
                    </Col>
                </Row>



                <div className='text-right m-2'>
                    <div style={{ fontSize: '22px', color: "#FF9800" }}>Valor Solicitado <CurrencyFormat value={Valor} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                    <div>Parcelas: {Parcelas}</div>
                    <div>Taxa: {Taxa}% ao mês</div>
                    <div>Valor da Parcelas: <CurrencyFormat value={ValorParcela} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></div>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!Valor || erroValor || !confirmado}
                        onClick={handleShowModal}

                    >
                        {t('Application_SolicitarEmprestimo')}
                    </Button>
                </div>

            </Form>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className="bg-dark">
                    <Modal.Title className="text-light">Contrato de empréstimos para ativos</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Conteúdo do contrato */}
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <Button variant="default" onClick={handleCloseModal}>
                        {t('Application_Fechar')}
                    </Button>
                    <Button variant="outline-primary" onClick={handleCloseModal}>
                        {t('Application_Confirmar')}
                    </Button>
                </Modal.Footer>
            </Modal>




        </Card.Body>
    );
}

export default AddPix;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion, Button, Form, Col } from 'react-bootstrap';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import Footer2 from '../layout/footer2';
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../services/index'
import { User } from '../store/User/User.action'
import { useHistory } from "react-router-dom";
import { createUser } from '../store/Create/Create.action'

function EditUser() {
    const user = useSelector(state => state.user)
    const image = require("../../images/profile/2.png")
    const [imageUser, setImageUser] = useState('')
    const imageDefault = 'https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png?ssl=1'
    const [firstName, setFirstName] = useState(user.firstName)
    const [secondName, setSecondName] = useState(user.secondName)
    const [mobile, setMobile] = useState(user.mobile)
    const [telephone, setTelephone] = useState(user.telephone)
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [erroName, setErrorName] = useState(false)
    const [erroUserName, setErrorUserName] = useState(false)
    const [erroPassword, setErrorPassword] = useState(false)
    const [errorNewPassword, setErrorNewPassword] = useState(false)

    const [messageName, setMessageName] = useState('')
    const [messagePassword, setMessagePassword] = useState('')
    const [messageNewPassword, setNewMessagePassword] = useState('')

    const [erroTelephone, setErroTelephone] = useState(false)
    const [erroMobile, setErrorMobile] = useState(false)
    const [erroEmail, setErrorEmail] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()
    const number = new RegExp('^[0-9]+$')
    const handleFirstName = async (e) => {
        if (!/[0-9]/g.test(e)) {
            setFirstName(e)
        }
        if (firstName != '' && secondName != '') {
            setErrorName(false)
        }

    }
    const handleSecondName = async (e) => {
        if (!/[0-9]/g.test(e)) {
            setSecondName(e)
        }
        if (firstName != '' && secondName != '') {
            setErrorName(false)
        }

    }

    const handleTelephone = async (e) => {
        if (number.test(e)) {
            setTelephone(e)
        }
        if (e === '') {
            setTelephone(e)
        }
        if (telephone != '') {
            setErroTelephone(false)
        }

    }
    const handleMobile = async (e) => {
        if (number.test(e)) {
            setMobile(e)
        }
        if (e === '') {
            setMobile(e)
        }
        if (mobile != '') {
            setErrorMobile(false)
        }
    }
    const handleSubmitData = async (e) => {
        e.preventDefault()
        if (!firstName || !secondName) {
            setMessageName('Enter first name and/or second name')
            setErrorName(true)
        }
        else {
            setErrorName(false)
        }
        if (!telephone) {
            setErroTelephone(true)
        } else {
            setErroTelephone(false)
        }

        if (!mobile) {
            setErrorMobile(true)
        } else {
            setErrorMobile(false)
        }
        if (erroName === false && erroMobile === false && erroTelephone === false) {
            const request = {
                firstName: firstName,
                secondName: secondName,
                telephone: telephone,
                mobile: mobile
            }
            if (imageUser != '') {
                user.avatar = imageUser
            }
            try {
                const data = (await axios.put(`/user/update/${user.id}`, request)).data
                dispatch(User(data))

            } catch (err) {
                console.log(err)
            }

        }
    }
    const submitPassword = async (e) => {
        e.preventDefault()
        if (!newPassword || !confirmPassword) {
            setNewMessagePassword('Enter new password and / or password confirmation')
            setErrorNewPassword(true)
        } else {
            setErrorNewPassword(false)
        }
        if (!password) {
            setMessagePassword('Enter password')
            setErrorPassword(true)
        } else {
            if (password.length < 6 || password.length > 21) {
                setMessagePassword('Enter password with 6 to 21 characters')
                setErrorPassword(true)
            } else {
                setErrorPassword(false)
            }
        }
        if ((newPassword === confirmPassword) && (newPassword !== '')) {
            if (newPassword.length >= 6 && newPassword.length <= 21) {
                setErrorNewPassword(false)
            } else {
                setNewMessagePassword('Enter password with 6 to 21 characters')
                setErrorNewPassword(true)
            }

        } else {
            setNewMessagePassword('Passwords do not match')
            setErrorNewPassword(true)
        }
        if (erroPassword === false && errorNewPassword === false) {
            try {
                const pass = { password, newPassword, confirmPassword }
                console.log(pass)
                const emailConfirm = (await axios.put(`/user/password/${user.id}`, pass)).data
                dispatch(User(null))
                dispatch(createUser(emailConfirm))
                history.push('/confirmEmail')
            } catch (err) {
                console.log(err.request)
            }
        }
    }
    const submitEmail = async (e) => {
        e.preventDefault()
        if (!email) {
            setErrorEmail(true)
        } else {
            setErrorEmail(false)
        }
        if (erroEmail == false) {
            console.log(email)
            try {
                const data = (await axios.put(`/user/email/${user.id}`, { email })).data
                history.push('./confirmEmail')
            } catch (err) {
                console.log(err.request)
            }
        }
    }

    return (
        <>
            <Header2 />
            <Sidebar />
            <div class="content-body">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Editar Usuário</h4>
                                </div>
                                <div class="card-body m-0 ">
                                    <Accordion defaultActiveKey="0">
                                        <div class="card">
                                            <h4 class="card-title"> <Accordion.Toggle as={Card.Header} eventKey="0">
                                                Dados Basicos
                                            </Accordion.Toggle></h4>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body><Form onSubmit={handleSubmitData}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridImage" >
                                                            <input type="file" id="exampleFormControlFile1" name="arquivo" className=" form-control-file py-5" style={{
                                                                opacity: 0,
                                                                position: 'absolute',
                                                                padding: '5px 50px 5px 5px'
                                                            }} onChange={e => setImageUser(e.target.files[0])}
                                                            />
                                                            {imageUser == '' ? <label for="arquivo" style={{
                                                                backgroundImage: `url(${imageDefault})`,
                                                                padding: '20px 10px',
                                                                marginTop: '10px',
                                                                backgroundRepeat: 'no-repeat', width: '150px', height: '150px', backgroundSize: ' 150px 150px'
                                                            }} ></label> :
                                                                <label for="arquivo" style={{
                                                                    backgroundImage: `url(${imageUser})`,
                                                                    padding: '20px 10px',
                                                                    marginTop: '10px',
                                                                    backgroundRepeat: 'no-repeat', width: '150px', height: '150px', backgroundSize: ' 150px 150px'
                                                                }} ></label>
                                                            }
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridFirsName">
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control type="text" value={firstName} onChange={e => handleFirstName(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGridSecondName">
                                                            <Form.Label>Second Name</Form.Label>
                                                            <Form.Control type="text" value={secondName} onChange={e => handleSecondName(e.target.value)} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <div className={"text-danger " + (!erroName ? "d-none" : "")}>
                                                        {messageName}
                                                    </div>
                                                    <Form.Group controlId="formGridTelephone">
                                                        <Form.Label>Telephone</Form.Label>
                                                        <Form.Control type="text" value={telephone} onChange={e => handleTelephone(e.target.value)} />
                                                    </Form.Group>
                                                    <div className={"text-danger " + (!erroTelephone ? "d-none" : "")}>
                                                        insert  phone
                                                    </div>
                                                    <Form.Group controlId="formGridMobile">
                                                        <Form.Label>Mobile </Form.Label>
                                                        <Form.Control type="text" value={mobile} onChange={e => handleMobile(e.target.value)} />
                                                    </Form.Group>
                                                    <div className={"text-danger " + (!erroMobile ? "d-none" : "")}>
                                                        insert mobile phone
                                                    </div>
                                                    <Button variant="primary" type="submit">
                                                        Salvar Alterações
                                                    </Button>
                                                </Form></Card.Body>
                                            </Accordion.Collapse>
                                        </div>
                                        <div class="card">
                                            <h4 class="card-title"> <Accordion.Toggle as={Card.Header} eventKey="1">
                                                Redefinir Senha
                                            </Accordion.Toggle></h4>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body><Form onSubmit={submitPassword}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} md={4} controlId="formGridFirsName">
                                                            <Form.Label>Senha Atual</Form.Label>
                                                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <div className={"text-danger " + (!erroPassword ? "d-none" : "")}>
                                                        {messagePassword}
                                                    </div>
                                                    <Form.Row>
                                                        <Form.Group as={Col} md={4} controlId="formGridFirsName">
                                                            <Form.Label>Nova Senha</Form.Label>
                                                            <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md={4} controlId="formGridSecondName">
                                                            <Form.Label>Confirmação da nova senha</Form.Label>
                                                            <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <div className={"text-danger " + (!errorNewPassword ? "d-none" : "")}>
                                                        {messageNewPassword}
                                                    </div>
                                                    <Button variant="primary" type="submit">
                                                        Salvar Alterações
                                                    </Button>
                                                </Form></Card.Body>
                                            </Accordion.Collapse>
                                        </div>
                                        <div class="card">
                                            <h4 class="card-title"> <Accordion.Toggle as={Card.Header} eventKey="2">
                                                Email
                                            </Accordion.Toggle></h4>
                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body>
                                                    <Form onSubmit={submitEmail}>
                                                        <Form.Row>
                                                            <Form.Group as={Col} md={5} controlId="formGridFirsName">
                                                                <Form.Label>Novo Email</Form.Label>
                                                                <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <div className={"text-danger " + (!erroEmail ? "d-none" : "")}>
                                                            insert Email
                                                        </div>
                                                        <Button variant="primary" type="submit">
                                                            Salvar Alterações
                                                        </Button>
                                                    </Form>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </div>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer2 />
        </>
    )
}

export default EditUser;

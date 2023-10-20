import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button, Form, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { Alert, AlertTitle } from '@material-ui/lab';
import InputMask from 'react-input-mask';
import globalConfig from '../jsonConfig/globalConfig.json'
import { getCountries, getCountryCallingCode, parsePhoneNumber } from 'react-phone-number-input/input'


//===================class===============
import axios from '../../services/index'
import { User } from '../store/User/User.action'
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar/sidebar';
import ButtonsUser from '../element/ButtonsUser'
import PhoneNumber from '../element/user/perfil/Phone';

//===================css==================
import '../../css/profile.css'
import BottomBar from '../layout/sidebar/bottom-bar';

function UserData() {
    const user = useSelector(state => state.user)
    const { t } = useTranslation()
    const imageDefault = 'https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png?ssl=1'
    const dispatch = useDispatch()
    const [imageUser, setImageUser] = useState('')
    const [firstName, setFirstName] = useState(user.firstName)
    const [secondName, setSecondName] = useState(user.secondName)
    const [login, setLogin] = useState(user.login)
    const [email, setEmail] = useState(user.email)
    const [mobile, setMobile] = useState(user.mobile)
    const [telephone, setTelephone] = useState(user.telephone)
    const [zipCode, setZipCode] = useState(user.zipCode ?? "")
    const [number, setNumber] = useState(user.number ?? "")
    const [street, setStreet] = useState(user.street ?? "")
    const [neighborhood, setNeighborhood] = useState(user.neighborhood ?? "")
    const [complement, setComplement] = useState(user.complement ?? "")
    const [city, setCity] = useState(user.city ?? "")
    const [state, setState] = useState(user.state ?? "")
    const [country, setCountry] = useState(user.country ?? "")
    const [date_of_birth, setdate_of_birth] = useState(user.date_of_birth ?? "")
    const [idDocument, setIdDocument] = useState(user.idDocument ?? "")
    const [rg, setRg] = useState(user.rg ?? "")
    const [rgIssuer, setRgIssuer] = useState(user.rgIssuer ?? "")
    const [rgUf, setRgUf] = useState(user.rgUf ?? "")
    const [fatherName, setFatherName] = useState(user.fatherName ?? "")
    const [motherName, setMotherName] = useState(user.motherName ?? "")

    const [messageEmail, setMessageEmail] = useState("")
    const [messageLogin, setMessageLogin] = useState("")
    const [messageZipCode, setMessageZipCode] = useState("")
    const [messageStreet, setMessageStreet] = useState("")
    const [messageNeighborhood, setMessageNeighborhood] = useState("")
    const [messageCity, setMessageCity] = useState("")
    const [messageState, setMessageState] = useState("")
    const [messageCountry, setMessageCountry] = useState("")
    const [messageIdDocument, setMessageIdDocument] = useState("")
    const [messageFatherName, setMessageFatherName] = useState("")
    const [messageMotherName, setMessageMotherName] = useState("")
    const [messageFirstName, setMessageFirstName] = useState("")
    const [messageSecondName, setMessageSecondName] = useState("")
    const [messageRg, setMessageRg] = useState("")
    const [messageRgIssuer, setMessageRgIssuer] = useState("")
    const [messageRgUF, setMessageRgUF] = useState("")
    const [messagedate_of_birth, setMessagedate_of_birth] = useState("")

    const [erroTelephone, setErroTelephone] = useState(false)
    const [erroMobile, setErrorMobile] = useState(false)
    const [erroLogin, setErrorLogin] = useState(false)
    const [erroEmail, setErrorEmail] = useState(false)
    const [erroZipCode, setErrorZipCode] = useState(false)
    const [erroStreet, setErrorStreet] = useState(false)
    const [erroNeighborhood, setErrorNeighborhood] = useState(false)
    const [erroCity, setErrorCity] = useState(false)
    const [erroState, setErrorState] = useState(false)
    const [erroCountry, setErrorCountry] = useState(false)
    const [erroIdDocument, setErrorIdDocument] = useState(false)
    const [erroFirstName, setErrorFirstName] = useState(false)
    const [erroSecondName, setErrorSecondName] = useState(false)
    const [erroRg, setErrorRg] = useState(false)
    const [erroRgIssuer, setErrorRgIssuer] = useState(false)
    const [erroRgUF, setErrorRgUF] = useState(false)
    const [erroFatherName, setErrorFatherName] = useState(false)
    const [erroMotherName, setErrorMotherName] = useState(false)
    const [errodate_of_birth, setErrordate_of_birth] = useState(false)

    const [ulrImage, setUrlimage] = useState('')
    const [isFile, setIsFile] = useState(false)
    const [primaryErro, setPrimaryErro] = useState(false)
    const [erro5MB, setErro5MB] = useState('none')
    const [e5mb, setE5mb] = useState(false)
    const [sucessDisplay, setSucessDisplay] = useState('none')
    const [firstAcess, setFirstAcess] = useState(true)
    const zipCodeCleaned = zipCode.replace(/\D/g, '');

    const estadosBrasileiros = [
        { nomeCompleto: "Acre", sigla: "AC" },
        { nomeCompleto: "Alagoas", sigla: "AL" },
        { nomeCompleto: "Amapá", sigla: "AP" },
        { nomeCompleto: "Amazonas", sigla: "AM" },
        { nomeCompleto: "Bahia", sigla: "BA" },
        { nomeCompleto: "Ceará", sigla: "CE" },
        { nomeCompleto: "Distrito Federal", sigla: "DF" },
        { nomeCompleto: "Espírito Santo", sigla: "ES" },
        { nomeCompleto: "Goiás", sigla: "GO" },
        { nomeCompleto: "Maranhão", sigla: "MA" },
        { nomeCompleto: "Mato Grosso", sigla: "MT" },
        { nomeCompleto: "Mato Grosso do Sul", sigla: "MS" },
        { nomeCompleto: "Minas Gerais", sigla: "MG" },
        { nomeCompleto: "Pará", sigla: "PA" },
        { nomeCompleto: "Paraíba", sigla: "PB" },
        { nomeCompleto: "Paraná", sigla: "PR" },
        { nomeCompleto: "Pernambuco", sigla: "PE" },
        { nomeCompleto: "Piauí", sigla: "PI" },
        { nomeCompleto: "Rio de Janeiro", sigla: "RJ" },
        { nomeCompleto: "Rio Grande do Norte", sigla: "RN" },
        { nomeCompleto: "Rio Grande do Sul", sigla: "RS" },
        { nomeCompleto: "Rondônia", sigla: "RO" },
        { nomeCompleto: "Roraima", sigla: "RR" },
        { nomeCompleto: "Santa Catarina", sigla: "SC" },
        { nomeCompleto: "São Paulo", sigla: "SP" },
        { nomeCompleto: "Sergipe", sigla: "SE" },
        { nomeCompleto: "Tocantins", sigla: "TO" },
      ];
      


    //====================== API ========================
    const handleSubmitData = async (e) => {
        e.preventDefault()
        setPrimaryErro(false)
        let tel = false
        let userMobile = ''
        let mobileCode = ''
        if (mobile != '' && mobile != undefined) {
            if (mobile.length > 12) {
                const phoneNumber = parsePhoneNumber(mobile)
                userMobile = phoneNumber.nationalNumber
                mobileCode = phoneNumber.countryCallingCode
                setErrorMobile(false)
            } else {
                setErrorMobile(true)
                tel = true
            }
        } else {
            setErrorMobile(true)
            tel = true
            return
        }

        let userPhone = ''
        let PhoneCode = ''
        if (telephone != '' && telephone != undefined) {
            if (telephone.length > 12) {
                const phoneNumber2 = parsePhoneNumber(telephone)
                userPhone = phoneNumber2.nationalNumber
                PhoneCode = phoneNumber2.countryCallingCode
            } else {
                setMobile('')
                setTelephone('')
                setErroTelephone(true)
                tel = true
            }
        }
        if (tel) {
            return
        }
        if (await isValidate() == false) {
            return
        }
        else {
            const request = {
                authKey: user.authKey,
                telephone: userPhone,
                mobile: userMobile,
                mobileCode: mobileCode,
                countryCode: PhoneCode,
                login: login,
                email: email,
                zipCode: zipCodeCleaned,
                street: street,
                number: number,
                neighborhood: neighborhood,
                complement: complement,
                city: city,
                state: state,
                country: country,
                firstName: firstName,
                secondName: secondName,
                idDocument: idDocument,
                rg: rg,
                rgUf: rgUf,
                rgIssuer: rgIssuer,
                fatherName: fatherName,
                motherName: motherName,
                date_of_birth: date_of_birth
            }
            try {
                if (isFile) {
                    var formData = new FormData();
                    formData.append('file', imageUser, 'documentoTest');
                    formData.append('authKey', user.authKey)
                    formData.append('telephone', userPhone)
                    formData.append('mobile', userMobile)
                    formData.append('mobileCode', mobileCode)
                    formData.append('countryCode', PhoneCode)
                    formData.append('login', login)
                    formData.append('email', email)
                    formData.append('zipCode', zipCodeCleaned)
                    formData.append('street', street)
                    formData.append('number', number)
                    formData.append('neighborhood', neighborhood)
                    formData.append('complement', complement)
                    formData.append('city', city)
                    formData.append('state', state)
                    formData.append('country', country)
                    formData.append('firstName', firstName)
                    formData.append('secondName', secondName)
                    formData.append('idDocument', idDocument)
                    formData.append('date_of_birth', date_of_birth)
                    formData.append('rg', rg)
                    formData.append('rguf', rgUf)
                    formData.append('rgIssuer', rgIssuer)
                    formData.append('fatherName', fatherName)
                    formData.append('motherName', motherName)


                    const data = await axios.put('/user/update/image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    dispatch(User(data.data))

                }
                {
                    const data = (await axios.put(`/user/update`, request)).data
                    dispatch(User(data))
                }
                showSucesss()

            } catch (err) {
                setPrimaryErro(true)
                console.log(err)
            }

        }
    }
    const setphone = async () => {
        if (user.mobileCode != undefined && user.mobileCode != '') {
            setMobile("+" + user.mobileCode + user.mobile)
        }
        if (user.telephone != undefined && user.telephone != '') {
            setTelephone("+" + user.countryCode + user.telephone)
        }
    }
    const validUser = async () => {
        try {
            const valid = await axios.put('user/validUser', { authKey: user.authKey })
            setphone()
            if (user.avatar != '' && user.avatar != undefined) {
                setUrlimage((user.avatar))
                // setUrlimage(globalConfig.baseURL + (user.avatar))

            } else {
                setUrlimage(imageDefault)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.status == 406) {
                    console.log("invalid user")
                    dispatch(User(null))
                } else {
                    console.log("Unexpected error")
                }
            } else {
                console.log("Unexpected error 404")
            }
        }
    }

    //================== Functions =====================
    const handleLogin = async () => {
        if (login == "" || login.undefined) {
            setErrorLogin(true);
            setMessageLogin("Usuário obrigatório")
            return false
        } else {
            setErrorLogin(false);
            const loginValidate = await axios.post('/user/editUserValidate', { email: email, login: login })
            if (loginValidate.data.login === false && login !== user.login) {
                setErrorLogin(true);
                setMessageLogin("Usuário já cadastrado")
                return false
            } else {
                setErrorLogin(false);
                return true
            }
        }
    }




    const handleEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setErrorEmail(false);
            const emailValidate = await axios.post('/user/editUserValidate', { email: email, login: login })
            if (emailValidate.data.email === false && email !== user.email) {
                setErrorEmail(true);
                setMessageEmail("E-mail já cadastrado")
                return false
            } else {
                setErrorEmail(false);
                return true
            }
        } else {
            setErrorEmail(true);
            setMessageEmail("Inserir e-mail válido")
            return false
        }
    };



    const handleZipCode = async () => {
        // if (zipCode == "" && firstAcess == true) {
        //     setErrorZipCode(false);
        // }
        // else if (zipCodeCleaned.length === 0) {
        //     setErrorZipCode(true);
        //     setMessageZipCode("CEP obrigatório")
        //     return false
        // } else {
        //     if (zipCodeCleaned.length < 8) {
        //         setErrorZipCode(true);
        //         setMessageZipCode("CEP inválido")
        //         return false
        //     } else {
        //         setErrorZipCode(false);
        //         return true
        //     }
        // }
        return true
    }

    const handleStreet = async () => {
        // if (street == "" && firstAcess == true) {
        //     setErrorStreet(false);
        // } else {
        //     if (street == "") {
        //         setErrorStreet(true);
        //         setMessageStreet("Rua obrigatória")
        //         return false
        //     } else {
        //         setErrorStreet(false);
        //         return true
        //     }
        // }
        return true
    }

    const handleNeighborhood = async () => {
        // if (neighborhood == "" && firstAcess == true) {
        //     setErrorNeighborhood(false);
        // } else {
        //     if (neighborhood == "") {
        //         setErrorNeighborhood(true);
        //         setMessageNeighborhood("Bairro obrigatório")
        //         return false
        //     } else {
        //         setErrorNeighborhood(false);
        //         return true
        //     }
        // }
        return true
    }

    const handleCity = async () => {
        // if (city == "" && firstAcess == true) {
        //     setErrorCity(false);
        // } else {
        //     if (city == "") {
        //         setErrorCity(true);
        //         setMessageCity("Cidade obrigatória")
        //         return false
        //     } else {
        //         setErrorCity(false);
        //         return true
        //     }
        // }
        return true
    }

    const handleState = async () => {
        // if (state == "" && firstAcess == true) {
        //     setErrorState(false);
        // } else {
        //     if (state == "") {
        //         setErrorState(true);
        //         setMessageState("Estado obrigatório")
        //         return false
        //     } else {
        //         setErrorState(false);
        //         return true
        //     }
        // }
        return true
    }

    const handleCountry = async () => {
        // if (country == "" && firstAcess == true) {
        //     setErrorCountry(false);
        // } else {
        //     if (country == "") {
        //         setErrorCountry(true);
        //         setMessageCountry("País obrigatório")
        //         return false
        //     } else {
        //         setErrorCountry(false);
        //         return true
        //     }
        // }
        return true
    }

    const handleIdDocument = async () => {
        if (idDocument.length == 11) {
            setErrorIdDocument(false)
            try {
                const response = await axios.put('/user/valid/idDocument', { idDocument: idDocument, authKey: user.authKey })
               
                if (response.data.isValid == true) {
                    setErrorIdDocument(false)
                    return true
                } else {
                    setErrorIdDocument(true)
                    setMessageIdDocument("CPF já cadastrado")
                    return false
                }
            } catch (error) {
                setErrorIdDocument(true)
                setMessageIdDocument("Erro ao validar CPF. Por favor, tente novamente")
                return false
            }

        } else {
            setErrorIdDocument(true)
            setMessageIdDocument("CPF inválido")
            return false
        }
    }

    const handleFirstName = () => {
        if (firstName == null || firstName == "") {
            if (firstAcess == false) {
                setErrorFirstName(true)
                setMessageFirstName("Nome obrigatório")
                return false
            } else {
                setErrorFirstName(false)
                return true
            }
        } else {
            setErrorFirstName(false)
            return true
        }
    }

    const handleSecondName = () => {
        if (secondName == null || secondName == "") {
            if (firstAcess == false) {
                setErrorSecondName(true)
                setMessageSecondName("Sobrenome obrigatório")
                return false
            } else {
                setErrorSecondName(false)
                return true
            }
        } else {
            setErrorSecondName(false)
            return true
        }
    }

    const handleRg = () => {
        // if (rg == null || rg == "") {
        //     if (firstAcess == false) {
        //         setErrorRg(true)
        //         setMessageRg("RG obrigatório")
        //         return false
        //     } else {
        //         setErrorRg(false)
        //         return true
        //     }
        // } else {
        //     setErrorRg(false)
        //     return true
        // }
        return true
    }

    const handleRgIssuer = () => {
        // if (rgIssuer == null || rgIssuer == "") {
        //     if (firstAcess == false) {
        //         setErrorRgIssuer(true)
        //         setMessageRgIssuer("Orgão Emissor obrigatório")
        //         return false
        //     } else {
        //         setErrorRgIssuer(false)
        //         return true
        //     }
        // } else {
        //     setErrorRgIssuer(false)
        //     return true
        // }
        return true
    }

    const handleRgUF = () => {
        // if (rgUf == null || rgUf == "") {
        //     if (firstAcess == false) {
        //         setErrorRgUF(true)
        //         setMessageRgUF("Estado Emissor obrigatório")
        //         return false
        //     } else {
        //         setErrorRgUF(false)
        //         return true
        //     }
        // } else {
        //     setErrorRgUF(false)
        //     return true
        // }
        return true
    }

    const handleFatherName = () => {
        // if (fatherName == null || fatherName == "") {
        //     if (firstAcess == false) {
        //         setErrorFatherName(true)
        //         setMessageFatherName("Nome do pai obrigatório")
        //         return false
        //     } else {
        //         setErrorFatherName(false)
        //         return true
        //     }
        // } else {
        //     setErrorFatherName(false)
        //     return true
        // }
        return true
    }

    const handleMotherName = () => {
        // if (motherName == null || motherName == "") {
        //     if (firstAcess == false) {
        //         setErrorMotherName(true)
        //         setMessageMotherName("Nome do pai obrigatório")
        //         return false
        //     } else {
        //         setErrorMotherName(false)
        //         return true
        //     }
        // } else {
        //     setErrorMotherName(false)
        //     return true
        // }
        return true
    }
    const handledate_of_birth = () => {
        // if (motherName == null || motherName == "") {
        //     if (firstAcess == false) {
        //         setErrorMotherName(true)
        //         setMessageMotherName("Nome do pai obrigatório")
        //         return false
        //     } else {
        //         setErrorMotherName(false)
        //         return true
        //     }
        // } else {
        //     setErrorMotherName(false)
        //     return true
        // }
        return true
    }

    var loadFile = function (file) {
        var image = document.getElementById("output");
        console.log(file)
        if (file) {
            if (file.size < 5000000) {
                setE5mb(false)
                setErro5MB('none')
                let url = URL.createObjectURL(file);
                setImageUser(file)
                setUrlimage(url)
                console.log(url)
                setIsFile(true)
                return
            } else {
                setErro5MB('block')
                setE5mb(true)
                return
            }
        }
    };


    const viaCep = async () => {
        setFirstAcess(false)
        try {
            if (zipCodeCleaned.length < 8) {
                return
            } else {
                const response = await axios.get(`https://viacep.com.br/ws/${zipCodeCleaned}/json/`)
                setStreet(response.data.logradouro)
                setNeighborhood(response.data.bairro)
                setComplement(response.data.complemento)
                setCity(response.data.localidade)
                setState(response.data.uf)
                setCountry("Brasil")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const showSucesss = async () => {
        setSucessDisplay('block')
        function myFunction() {
            setTimeout(function () { setSucessDisplay('none') }, 5000);
        }
        myFunction()
    }

    const isValidate = async () => {
        if (await handleLogin() == false || await handleEmail() == false || await handleZipCode() == false ||
            await handleStreet() == false || await handleNeighborhood() == false || await handleCity() == false ||
            await handleState() == false || await handleCountry() == false || await handleIdDocument() == false || await handleFirstName() == false ||
            await handleSecondName() == false || await handleRg() == false || await handleRgIssuer() == false || await handleRgUF() == false ||
            await handleFatherName() == false || await handleMotherName() == false) {
            return false
        } else {
            return true
        }
    }

    //==========================Effect=====================================
    useEffect(async () => {
        await validUser()
    }, [user]);

    useEffect(() => {
        handleEmail();
    }, [email]);

    useEffect(() => {
        handleLogin();
    }, [login]);

    useEffect(() => {
        handleZipCode();
        setFirstAcess(false)
    }, [zipCode]);

    useEffect(() => {
        handleStreet();
    }, [street]);

    useEffect(() => {
    }, [number]);

    useEffect(() => {
        handleNeighborhood();
    }, [neighborhood]);

    useEffect(() => {
    }, [complement]);

    useEffect(() => {
        handleCity();
    }, [city]);

    useEffect(() => {
        handleState();
    }, [state]);

    useEffect(() => {
        handleCountry();
    }, [country]);

    useEffect(() => {
        handleIdDocument()
    }, [idDocument])

    useEffect(() => {
        handleFirstName()
    }, [firstName])

    useEffect(() => {
        handleSecondName()
    }, [secondName])

    useEffect(() => {
        handleRg()
    }, [rg])

    useEffect(() => {
        handleRgIssuer()
    }, [rgIssuer])

    useEffect(() => {
        handleRgUF()
    }, [rgUf])

    useEffect(() => {
        handleFatherName()
    }, [fatherName])

    useEffect(() => {
        handleMotherName()
    }, [fatherName])
    useEffect(() => {
        handledate_of_birth()
    }, [date_of_birth])

    return (
        <>
            <Header2 title={t('My data')} />
            <Sidebar selectedItem="profile" />
            <div class="content-body">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-xxl-12">
                            <div class="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <ButtonsUser />
                                    </div>
                                </div>
                                <div className={"card-body"}>
                                    <Card.Body>
                                        <Form onSubmit={handleSubmitData}>
                                            <Form.Row>
                                                <Form.Group className="col-xl-3 col-lg-3 col-md-6 col-sm-12" controlId="formGridImage" >
                                                    <div class="profile-pic">
                                                        <label class="-label" for="file">
                                                            <span class="glyphicon glyphicon-camera"></span>
                                                            <span>{t('Change Image')}</span>
                                                        </label>
                                                        <input id="file" type="file" onChange={e => loadFile(e.target.files[0])} />
                                                        <img src={ulrImage} id="output" width="200" />
                                                    </div>
                                                    <div style={{ width: '50%', margin: '0 auto', display: erro5MB }}>
                                                        <Alert severity="error">
                                                            <AlertTitle>{t('Select the file on your computer')}</AlertTitle>
                                                            {t('Maximum file size') + "5MB"}
                                                        </Alert>
                                                    </div>
                                                    <div style={{ width: '50%', margin: '0 auto', display: sucessDisplay }}>
                                                        <Alert severity="success">
                                                            <AlertTitle>{t('Success')}</AlertTitle>
                                                            {t('Data changed')}
                                                        </Alert>
                                                    </div>
                                                </Form.Group>
                                                <div className="vertical-line"></div>
                                                <Form.Group as={Col} >
                                                    <Form.Group class="general-data">
                                                        <h5>{t("General Data")}</h5>
                                                        <Form.Group controlId="formGridFirsName">
                                                            <Form.Label>{t("Username")}</Form.Label>
                                                            <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} />
                                                            <div className={"text-danger " + (!erroLogin ? "d-none" : "")}>
                                                                {messageLogin}
                                                            </div>
                                                        </Form.Group>
                                                        <Form.Group controlId="formGridFirsName">
                                                            <Form.Label>{"E-mail"}</Form.Label>
                                                            <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                                            <div className={"text-danger " + (!erroEmail ? "d-none" : "")}>
                                                                {messageEmail}
                                                            </div>
                                                        </Form.Group>
                                                        <Form.Row className="d-flex flex-lg-row flex-column ">
                                                            <Form.Group as={Col} controlId="formGridMobile">
                                                                <Form.Label>{t('Mobile')} </Form.Label>
                                                                <PhoneNumber telephone={mobile} setTelephone={setMobile} />
                                                                <div className={"text-danger " + (!erroMobile ? "d-none" : "")}>
                                                                    {t('Insert valid phone')}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group as={Col} controlId="formGridTelephone">
                                                                <Form.Label>{t('Telephone')}</Form.Label>
                                                                <PhoneNumber telephone={telephone} setTelephone={setTelephone} />
                                                                <div className={"text-danger " + (!erroTelephone ? "d-none" : "")}>
                                                                    {t('Insert valid phone')}
                                                                </div>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                    <Form.Group class="address">
                                                        <h5 class="address">{t("Address")}</h5>
                                                        <Form.Group controlId="formGridFirsName">
                                                            <Form.Label>{t("Zip Code")}</Form.Label>
                                                            <InputMask
                                                                mask="99999-999"
                                                                value={zipCode}
                                                                onChange={e => setZipCode(e.target.value)}
                                                                onBlur={viaCep}
                                                            >
                                                                {inputProps => <Form.Control {...inputProps} type="text" />}
                                                            </InputMask>
                                                            {inputProps => <Form.Control {...inputProps} type="text" />}
                                                            <div className={"text-danger " + (!erroZipCode ? "d-none" : "")}>
                                                                {messageZipCode}
                                                            </div>
                                                        </Form.Group>
                                                        <Form.Row className="d-flex flex-lg-row flex-column ">
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t("Street")}</Form.Label>
                                                                <Form.Control type="text" value={street} onChange={e => setStreet(e.target.value)} />
                                                                <div className={"text-danger " + (!erroStreet ? "d-none" : "")}>
                                                                    {messageStreet}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group controlId="formGridFirsName">
                                                                <Form.Label>{t("Number")}</Form.Label>
                                                                <Form.Control type="text" value={number} onChange={e => setNumber(e.target.value)}
                                                                    onKeyPress={(event) => {
                                                                        if (!/[0-9]/.test(event.key)) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="d-flex flex-lg-row flex-column">
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t("Neighborhood")}</Form.Label>
                                                                <Form.Control type="text" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} />
                                                                <div className={"text-danger " + (!erroNeighborhood ? "d-none" : "")}>
                                                                    {messageNeighborhood}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group controlId="formGridFirsName">
                                                                <Form.Label>{t("Complement")}</Form.Label>
                                                                <Form.Control type="text" value={complement} onChange={e => setComplement(e.target.value)} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="d-flex flex-lg-row flex-column">
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t("City")}</Form.Label>
                                                                <Form.Control type="text" value={city} onChange={e => setCity(e.target.value)} />
                                                                <div className={"text-danger " + (!erroCity ? "d-none" : "")}>
                                                                    {messageCity}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group as={Col} controlId="formGridState">
                                                                <Form.Label>{t("State")}</Form.Label>
                                                                <select
                                                                    className="form-control"
                                                                    value={state}
                                                                    onChange={(e) => setState(e.target.value)}
                                                                >
                                                                    <option value="">Selecione um estado</option>
                                                                    {estadosBrasileiros.map((estado, index) => (
                                                                        <option key={index} value={estado.sigla}>
                                                                            {estado.sigla}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <div className={"text-danger " + (!erroState ? "d-none" : "")}>
                                                                    {messageState}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group controlId="formGridFirsName">
                                                                <Form.Label>{t("Country")}</Form.Label>
                                                                <Form.Control type="text" value={country} onChange={e => setCountry(e.target.value)} />
                                                                <div className={"text-danger " + (!erroCountry ? "d-none" : "")}>
                                                                    {messageCountry}
                                                                </div>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                    <Form.Group class="address">
                                                        <h5 class="address">{t("Personal data")}</h5>
                                                        <Form.Row className="d-flex flex-lg-row flex-column">
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t("First Name")}</Form.Label>
                                                                <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                                                <div className={"text-danger " + (!erroFirstName ? "d-none" : "")}>
                                                                    {messageFirstName}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t("Second Name")}</Form.Label>
                                                                <Form.Control type="text" value={secondName} onChange={e => setSecondName(e.target.value)} />
                                                                <div className={"text-danger " + (!erroSecondName ? "d-none" : "")}>
                                                                    {messageSecondName}
                                                                </div>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="d-flex flex-lg-row flex-column ">
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t('RG_Document')}</Form.Label>
                                                                <Form.Control type="text" value={rg} onChange={e => setRg(e.target.value)} />
                                                                <div className={"text-danger " + (!erroRg ? "d-none" : "")}>
                                                                    {messageRg}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t('Issuing_Body')}</Form.Label>
                                                                <Form.Control type="text" value={rgIssuer} onChange={e => setRgIssuer(e.target.value)} />
                                                                <div className={"text-danger " + (!erroRgIssuer ? "d-none" : "")}>
                                                                    {messageRgIssuer}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group controlId="formGridFirsName">
                                                                <Form.Label>{t('State_issuance')}</Form.Label>
                                                                <select
                                                                    className="form-control"
                                                                    value={rgUf}
                                                                    onChange={(e) => setRgUf(e.target.value)}
                                                                >
                                                                    <option value="">Selecione um estado</option>
                                                                    {estadosBrasileiros.map((estado, index) => (
                                                                        <option key={index} value={estado.sigla}>
                                                                            {estado.sigla}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <div className={"text-danger " + (!erroRgUF ? "d-none" : "")}>
                                                                    {messageRgUF}
                                                                </div>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="d-flex flex-lg-row flex-column ">
                                                            <Form.Group controlId="formGridFirsName">
                                                                <Form.Label>{t('Application_DataDeNascimento')}</Form.Label>
                                                                <Form.Control type="date" value={date_of_birth} onChange={e => setdate_of_birth(e.target.value)} />
                                                                <div className={"text-danger " + (!errodate_of_birth ? "d-none" : "")}>
                                                                    {messagedate_of_birth}
                                                                </div>
                                                            </Form.Group>

                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{"CPF"}</Form.Label>
                                                                <Form.Control type="text" value={idDocument} onChange={e => setIdDocument(e.target.value)} />
                                                                <div className={"text-danger " + (!erroIdDocument ? "d-none" : "")}>
                                                                    {messageIdDocument}
                                                                </div>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="d-flex flex-lg-row flex-column">
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t('Father')}</Form.Label>
                                                                <Form.Control type="text" value={fatherName} onChange={e => setFatherName(e.target.value)} />
                                                                <div className={"text-danger " + (!erroFatherName ? "d-none" : "")}>
                                                                    {messageFatherName}
                                                                </div>
                                                            </Form.Group>
                                                            <Form.Group as={Col} controlId="formGridFirsName">
                                                                <Form.Label>{t('Mother')}</Form.Label>
                                                                <Form.Control type="text" value={motherName} onChange={e => setMotherName(e.target.value)} />
                                                                <div className={"text-danger " + (!erroMotherName ? "d-none" : "")}>
                                                                    {messageMotherName}
                                                                </div>

                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                    <Button variant="primary" type="submit" >
                                                        {t('Save modifies')}
                                                    </Button>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </Card.Body>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar selectedIcon="profile" />
        </>
    )
}

export default UserData
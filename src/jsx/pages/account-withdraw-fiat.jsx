import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar/sidebar";
import Footer2 from "../layout/footer2";
import WithdawTypeSelect from "../element/withdawTypeSelect";
import { useTranslation } from "react-i18next";
import CurrencyInput from "react-currency-input-field";
import axios from "../../services/index";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import DataGridTransfer from '../element/withdrawFiat/FormPagination'
import { User } from '../store/User/User.action'
import { Alert, AlertTitle } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import Loading from '../element/loading'
import BottomBar from "../layout/sidebar/bottom-bar";

function DebitCard() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [type, setType] = useState("");
  const [quantity, setquantity] = useState("");
  const [banks, setBanks] = useState([])
  const [bank, setBank] = useState({});
  const [pixs, setPixs] = useState([]);
  const [pix, setPix] = useState({});
  const [history, setHistory] = useState([])
  const [displaySucess, setDisplaySucess] = useState('none')
  const [displayFiat, setDisplayFiat] = useState('block')
  const [showLoad, setShowLoad] = useState('none');
  const [mensagemErro, setMensagemErro] = useState('teste')
  const [showErro, setShowErro] = useState('none');
  const [showBank, setShowBank] = useState(false)
  const [bankSelected, setBankSelected] = useState(0)

  const quantityNumber = quantity == "" ? "" : parseFloat(quantity.replace(/[^\d.]/g, "").replace(/(\d)(\d{2})$/, "$1.$2"))

  useEffect(() => {
    axios.get(`banks/${user.id}`)
      .then((response) => {
        console.log(response)
        response.data.length != 0 ? setBanks(response.data) : console.log(response)
        response.data[0] != undefined ? setBank(response.data[0]) : setBank({
          accountType: '',
          agency: '',
          account: '',
          digit: '',

        })
      })
      .catch((err) => {
        console.log(err);
      })
    axios.get(`banks/pix/${user.id}`).then((response) => {
      console.log(response)
      response.data.length != 0 ? setPixs(response.data) : console.log(response)
      response.data[0] != undefined ? setPix(response.data[0]) : setPix({
        typePix: '',
        pix: ''
      })
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const getHistory = async () => {
    try {
      const history = (await axios.put(`/withdrawFiat/getHistory`, { authKey: user.authKey }))
      console.log(history)
      setHistory(history.data.reverse())
      return history
    } catch (err) {
      return err.response
    }
  }

  function handleChange(newValue) {
    setquantity("")
    setType(newValue);
    setShowBank(false)
    setBankSelected(0)
  }

  const handlePix = (e) => {
    if (e !== 0 && e !== null) {
      const data = pixs.filter((i) => {
        return i.id == e;
      });
      setPix(data[0]);
      setBankSelected(pix.id)
      setShowBank(true)
    } else {
      setBankSelected(0)
      setShowBank(false)
    }
  };

  const handleBank = (e) => {
    if (e != 0 && e != null) {
      const data = banks.filter((i) => {
        setShowBank(true)
        return i.id == e;
      });
      setBank(data[0]);
      setBankSelected(bank.id)
    } else {
      setShowBank(false)
      setBankSelected(0)
    }
  };

  const handleSubmitPix = async (e) => {
    setShowLoad('block')
    setShowErro('none')
    e.preventDefault();
    let newHolderName = ''
    if (pix.holderName) {
      console.log(pix.holderName)
      newHolderName = pix.holderName
    }
    const data = {
      authKey: user.authKey,
      pix: pix.id,
      holderName: newHolderName,
      status: 0,
      quantity: quantityNumber,
    };
    try {
      if (data.quantity >= 1) {
        const response = await axios.post('/withdrawfiat/pix', data)
        setDisplayFiat('none')
        setDisplaySucess('block')
        setShowLoad('none')
      } else {
        setShowLoad('none')
        setShowErro('block')
        setMensagemErro('Withdrawal must be greater than or equal to 1 Dollar')
      }
    } catch (err) {
      setShowLoad('none')
      setShowErro('block')
      setMensagemErro('An error has occurred. Please try again.')
      console.log(err.erro)
    }
  };

  const handleSubmitAccount = async (e) => {
    setShowLoad('block')
    setShowErro('none')
    e.preventDefault();
    let newHolderName = ''
    if (bank.holderName) {
      console.log('banck', bank.holderName)
      newHolderName = bank.holderName
    }
    const data = {
      authKey: user.authKey,
      account: bank.id,
      holderName: newHolderName,
      status: 0,
      quantity: quantityNumber,
    };
    try {
      if (data.quantity >= 1) {
        const response = await axios.post('/withdrawfiat/bank', data)
        setDisplayFiat('none')
        setDisplaySucess('block')
        setShowLoad('none')
      } else {
        setShowLoad('none')
        setShowErro('block')
        setMensagemErro('Withdrawal must be greater than or equal to 1 Dollar')
      }
    } catch (err) {
      setShowLoad('none')
      setShowErro('block')
      setMensagemErro('An error has occurred. Please try again.')
      console.log(err)
    }
  }

  const backToPage = async () => {
    await getHistory()
    await resetValues()
    setDisplaySucess('none')
    setDisplayFiat('block')
    setShowBank(false)
    setBankSelected(0)
    setType("")
  }

  const resetValues = async () => {
    setType(type)
    setquantity(0)
    setBank({})
    setPix({})
  }

  const validUser = async () => {
    try {
      const valid = await axios.put('user/validUser', { authKey: user.authKey })
      await getHistory()
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

  useEffect(async () => {
    await validUser()
  }, [])

  useEffect(() => { }, [showBank])
  useEffect(() => { }, [bank])

  // useEffect(() => { console.log(quantity) }, [quantity])
  useEffect(() => { console.log(quantityNumber) }, [quantityNumber])
  return (
    <>
      <Header2 title={t("Insert your withdraw info")}/>
      <Sidebar selectedItem="saque-fiat"/>
      <Loading show={showLoad} />
      <div class="content-body">
        <div class="container-fluid h-100" >
          <div class="row">
            <div class="col-md-5">
              <div class="auth-form card">
                <div class="card-header" style={{ display: displayFiat }}>
                  <h4 class="card-title">{t("Insert your withdraw info")}</h4>
                </div>
                <div class="card-body" style={{ display: displaySucess }} >
                  <div class="form-row align-items-center" style={{
                    display: 'flex',
                    alignContent: 'center', justifyContent: 'center'
                  }}>
                    <div class="text-center">
                      <h2 class="card-title">{t("Attention")}!</h2>
                      <Alert style={{ color: "rgb(16 216 118)", backgroundColor: "transparent", fontSize: "15px" }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                        {t("Transaction in progress, wait for confirmation in history.")}
                      </Alert>
                    </div >
                  </div>
                  <div class="form-row align-items-center" style={{
                    display: 'flex',
                    alignContent: 'center', justifyContent: 'center'
                  }}>
                    <button
                      style={{
                        backgroundColor: '#10d876', borderColor: '#10d876',
                        alignContent: 'center', justifyContent: 'center',
                        width: '200px',
                      }}
                      className="btn btn-success btn-block mt-4" onClick={backToPage}>
                      {t('Back')}
                    </button>
                  </div>
                </div>
                <div class="card-body" style={{ display: displayFiat }}>
                  <div class="mb-3 px-4">
                    <Form.Label>{t("Withdrawal method")}</Form.Label>
                    <WithdawTypeSelect onChange={handleChange} />
                  </div>
                  {type == "Bank" ? (
                    <Card.Body>
                      <Form onSubmit={handleSubmitAccount}>
                        <Form.Group controlId="fromGridBank">
                          <Form.Label>{t("Bank")}</Form.Label>
                          <Form.Control
                            value={bankSelected}
                            as="select"
                            onChange={(e) => handleBank(e.target.value)}
                          >
                            {
                              banks.length == 0 ?
                                <option
                                  value={1}>{t('Unregistered data')}
                                </option>
                                :
                                <>
                                  <option value={0}>{t("Select a bank account")}</option>
                                  {banks.map((e) => (
                                    <option value={e.id} >
                                      {`${e.agency} ${e.account}-${e.digit} / ${e.bank}`}
                                    </option>
                                  ))}
                                </>
                            }
                          </Form.Control>
                        </Form.Group>
                        {
                          showBank == true ?
                            <Form.Group className="disabled" controlId="fromGridTypeAccount">
                              <Form.Label>{t("Type of account")}</Form.Label>
                              <Form.Control type="text" value={bank.accountType} />
                            </Form.Group> :
                            null
                        }
                        {
                          showBank == true ?
                            <Form.Group className="disabled" controlId="fromGridUser">
                              <Form.Label>{t("Holder name")} </Form.Label>
                              <Form.Control
                                type="text"
                                value={user.firstName}
                              />
                            </Form.Group> :
                            null
                        }
                        {/* <Form.Group controlId="fromGridBank">
                          <Form.Label>{t("Agency")}</Form.Label>
                          <Form.Control type="text" value={bank.agency} />
                        </Form.Group>
                        <Form.Group controlId="fromGridBank">
                          <Form.Label>{t("Account number")}</Form.Label>
                          <Form.Control type="text" value={bank.account} />
                        </Form.Group>
                        <Form.Group controlId="fromGridBank">
                          <Form.Label>{t("Digit")}</Form.Label>
                          <Form.Control type="text" value={bank.digit} />
                        </Form.Group> */}
                        {
                          showBank == true ?
                            <Form.Group>
                              <Form.Label>{t('Value') + " "}(USD)</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="0.00"
                                value={quantity == "" ? quantityNumber : Intl.NumberFormat("en-US", {
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                }).format(quantityNumber)}
                                onChange={(e) => setquantity(e.target.value)}
                                onInput={(event) => {
                                  event.target.value = event.target.value.replace(/\D/g, "");
                                  if (event.target.value.length == 1) {
                                    event.target.value = event.target.value.replace(/^(\d)/, "0.0$1");
                                  }
                                  if (event.target.value.length == 2) {
                                    event.target.value = event.target.value.replace(/^(\d)/, "0.$1");
                                  } else {
                                    event.target.value = event.target.value.replace(/(\d)(\d{2})$/, "$1.$2");
                                  }
                                  event.target.value = event.target.value.replace(
                                    /(?=(\d{3})+(\D))\B/g,
                                    ","
                                  );
                                }}
                                pattern="[0-9,.]*"
                                style={{ textAlign: "right" }}
                                inputMode="numeric"
                              />
                            </Form.Group> :
                            null
                        }
                        <div class="error-pop-login" style={{ display: showErro, marginTop: "3%" }}>
                          <Alert style={{ fontWeight: '10', padding: " 0px 10px" }} variant="filled" severity="error">
                            {t(mensagemErro)}
                          </Alert>
                        </div>
                        <Button variant="success mt-4" type="submit">
                          {t("Application_EfetuarSaque")} <i className="fa fa-bank"></i>
                        </Button>
                      </Form>
                    </Card.Body>
                  ) : type == "Pix" ? (
                    <Card.Body>
                      <Form onSubmit={handleSubmitPix}>
                        <Form.Group controlId="fromGridUser">
                          <Form.Label>{t('Key Name')}</Form.Label>
                          <Form.Control
                            as="select"
                            value={bankSelected}
                            onChange={(e) => handlePix(e.target.value)}
                          >
                            {
                              pixs.length == 0 ? <option value={1}>{t('Unregistered data')}
                              </option>
                                :
                                <>
                                  <option value={0}>{t("Select a pix key" )}</option>
                                  {
                                    pixs.map(e => (
                                      <option value={e.id}>{`${e.name}`}</option>
                                    ))
                                  }
                                </>
                            }
                          </Form.Control>
                        </Form.Group>
                        {
                          showBank == true ?
                            <Form.Group controlId="fromGridUser" className="disabled">
                              <Form.Label>{t("Holder name")} </Form.Label>
                              <Form.Control
                                type="text"
                                value={pix.holderName}
                              />
                            </Form.Group> :
                            null
                        }
                        {
                          showBank == true ?
                            <Form.Group controlId="fromGridBank" className="disabled">
                              <Form.Label>{t("Type of key")}</Form.Label>
                              <Form.Control type="text" value={pix.typePix} />
                            </Form.Group> :
                            null
                        }
                        {
                          showBank == true ?
                            <Form.Group controlId="fromGridBank" className="disabled">
                              <Form.Label>{t("Key")} Pix</Form.Label>
                              <Form.Control type="text" value={pix.pix} />
                            </Form.Group> :
                            null
                        }
                        {
                          showBank == true ?
                            <Form.Group>
                              <Form.Label>{t('Value') + " "}(USD)</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="0.00"
                                value={quantity == "" ? quantityNumber : Intl.NumberFormat("en-US", {
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                }).format(quantityNumber)}
                                onChange={(e) => setquantity(e.target.value)}
                                onInput={(event) => {
                                  event.target.value = event.target.value.replace(/\D/g, "");
                                  if (event.target.value.length == 1) {
                                    event.target.value = event.target.value.replace(/^(\d)/, "0.0$1");
                                  }
                                  if (event.target.value.length == 2) {
                                    event.target.value = event.target.value.replace(/^(\d)/, "0.$1");
                                  } else {
                                    event.target.value = event.target.value.replace(/(\d)(\d{2})$/, "$1.$2");
                                  }
                                  event.target.value = event.target.value.replace(
                                    /(?=(\d{3})+(\D))\B/g,
                                    ","
                                  );
                                }}
                                pattern="[0-9,.]*"
                                style={{ textAlign: "right" }}
                                inputMode="numeric"
                              />
                            </Form.Group> :
                            null
                        }
                        <div class="error-pop-login" style={{ display: showErro, marginTop: "3%" }}>
                          <Alert style={{ fontWeight: '10', padding: " 0px 10px" }} variant="filled" severity="error">
                            {t(mensagemErro)}
                          </Alert>
                        </div>
                        <Button variant="success mt-4" type="submit">
                          {t("Application_EfetuarSaque")} <i className="fa fa-bank"></i>
                        </Button>
                      </Form>
                    </Card.Body>)
                    : <div></div>
                  }
                </div>
              </div>

            </div>

            <div class="col-xl-7 col-lg-7 col-xxl-7">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title"> {t('Withdraw Fiat History')}</h4>
                </div>
                <DataGridTransfer senderHistory={history} />
              </div>
            </div>

          </div>
        </div>
        <div class="content-body">
          <div class="container">
            <div class="row justify-content-center h-100 w-100 ">

            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
}

export default DebitCard;

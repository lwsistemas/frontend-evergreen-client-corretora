import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";
import '../../css/reactjs-popup.css'
import axios from '../../services/index'
import { Alert, AlertTitle } from '@material-ui/lab';
import Link from '@material-ui/core/Link';
import CheckIcon from '@material-ui/icons/Check';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  body: {
    height: "100%",
    display: "flex",
    alignitems: "center",
    justifycontent: "center",
  }
  ,
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ConfirmEmail(props) {
  const {user}=props
  const [mensagemErro, setMensagemErro] = React.useState('');
  const [showSucess, setShowSucess] = useState('none')
  const [showComfirm, setShowComfirm] = useState('block')
  const [showResend, setShowResend] = React.useState('block');
  const [errorDisplay, setErrorDisplay] = React.useState('none');
  const [sucessDisplay, setSucessDisplay] = React.useState('none');
  const [disabledButton, setDisabledButton] = useState(false);

  const { t } = useTranslation()

  const handleClose = () => {
    setShowSucess('none')
    setShowComfirm('block')
    props.setShowPopupComfirm(false)
  };
  //email confirm
  const [token, setToken] = useState('');

  const handleSubmit2FA = async () => {
    let idUser = props.user.id
    awaitActions(true)
    try {
      let pass =props.newPassword
      if(pass.length >= 6 ){
        const result = (await axios.post('/user/resetPassword', { authKey:user.authKey, token,pass }))
        console.log(result)
        setShowSucess('block')
        setShowComfirm('none')
      }else{ 
        setMensagemErro('Error confirming email, please try again.')
        messageErro()
        }
    } catch (error) {
      setMensagemErro('Error confirming email, please try again.')
      messageErro()
      console.log(error)
    }
    awaitActions(false)
  }
  const messageErro = async () => {
    setErrorDisplay('block')
    function myFunction() {
      setTimeout(function () { setErrorDisplay('none') }, 10000);
    }
    myFunction()

  }
  const messageSucess = async () => {
    setSucessDisplay('block')
    function myFunction() {
      setTimeout(function () { setSucessDisplay('none') }, 10000);
    }
    myFunction()

  }
  const awaitActions = async (awaitAction) => {
    if (awaitAction) {
      setDisabledButton(true)
      setShowResend('none')

    } else {
      setDisabledButton(false)
      setShowResend('block')

    }

  }

  const resendEmail = async () => {
    awaitActions(true)
    try {
      await axios.post('/validateEmail', { email: props.user.email })
      messageSucess()
    } catch (error) {
      setMensagemErro("Error resend email, try again.")
      messageErro()
      console.log(error)
    }
    awaitActions(false)


  }
  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={props.showPopupComfirm}>
        <div class="container h-100" style={{ display: showSucess }}>
          <div class="row justify-content-center h-100 align-items-center">
            <div class="confirm-body">
              <div class="auth-form">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>

                </DialogTitle></div>
                <div class="text-center">
                  <h4 class="card-title">{t("Success")}!</h4>
                <Alert style ={{color:"rgb(16 216 118)",backgroundColor:"transparent"}}icon={<CheckIcon fontSize="inherit" />}severity="success">
                    {t("Password changed successfully.")}
                  </Alert>
                  </div >
              <div class="card-body">

                <div class="text-center">
                  <button disabled={disabledButton} onClick={handleClose} className="btn btn-success btn-block">{t("Confirm")} </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container h-100" style={{ display: showComfirm }}>
          <div class="row justify-content-center h-100 align-items-center">
            <div class="confirm-body">
              <div class="auth-form">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>

                </DialogTitle>
                <div class="card-header justify-content-center">
                  <h4 class="card-title">{t("Confirm Email")}</h4>
                </div>
                <div class="card-body">
                  <div class="form-group">
                  <p class="titleEmail">{t("Enter the code sent to the email")+" "} <strong>{props.user.email}</strong></p>
                    <input type="text" class="form-control" placeholder={t("Confirmation code.")}  value={token} onChange={e => setToken(e.target.value)} />
                  </div>

                  <div class="text-center">
                    <button disabled={disabledButton} onClick={handleSubmit2FA} className="btn btn-success btn-block">{t("Confirm")}</button>
                  </div>
                  <div class="text-center">
                    <p class="rodape">{t("Don't Received?")}</p>
                    <div style={{ display: showResend }}>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={resendEmail}
                      >
                        {t("Resend")}
                      </Link>
                      <div class="error-pop-login" style={{ display: errorDisplay, marginTop: "3%" }}>
                        <Alert style={{ fontWeight: '10', padding: " 0px 10px" }} variant="filled" severity="error">
                          {t(mensagemErro)}
                        </Alert>
                      </div>
                      <div class="error-pop-login" style={{ display: sucessDisplay, marginTop: "3%" }}>
                        <Alert style={{ fontWeight: '10', padding: " 0px 10px" }} variant="filled" severity="success">
                          {t("Email sent.")}
                        </Alert>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>



    </div>
  );
}
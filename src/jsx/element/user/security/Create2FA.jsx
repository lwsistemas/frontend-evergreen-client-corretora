import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";
import '../../../../css/reactjs-popup.css'
import axios from '../../../../services/index'
import apple from '../../../../images/app-icon/Apple-App-Store-Icon.png'
import { Alert, AlertTitle } from '@material-ui/lab';




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


export default function Create2FA(props) {
  const {user} =props
  const [open, setOpen] = React.useState(false);
  const [qrcode, setQrcode] = useState('')
  const [errorDisplay, setErrorDisplay] = React.useState('none');
  const [disabledButton, setDisabledButton] = useState(false);
  const { t } = useTranslation()
  const confirmTwoFactor = async () => {
    setDisabledButton(true)
    try {
      await axios.put(`/user/confirmTwoFactor`, {authKey:user.authKey})
      props.setShowQrcode('none')
      props.setShowCancel('block')
      handleClose()

    } catch (err) {
      messageErro()
      console.log({ err: "erro ao confirmar dois fatores" })
      handleClose()
    }
    setDisabledButton(false)

  }
  const messageErro = async () => {
    setErrorDisplay('block')
    function myFunction() {
      setTimeout(function () { setErrorDisplay('none') }, 10000);
    }
    myFunction()

  }

  const cancelTwoFactor = async () => {
    setDisabledButton(true)
   
    try {
      await axios.post('/validateEmail', { email: props.user.email })
      props.setShowPopupComfirm(true)

    } catch (err) {
      messageErro()
      console.log({ err: "erro ao confirmar dois fatores" })
    }
    setDisabledButton(false)

  }
  const createTwoFactor = async () => {
    setDisabledButton(true)
    try {
      const twoFactor = (await axios.put(`/user/createTwoFactor`, {authKey:user.authKey}))
      setQrcode(twoFactor.data)
      setOpen(true);
    } catch (err) {
      messageErro()
      console.log({ err: "erro ao criar dois fatores" })
      handleClose()
    }
    setDisabledButton(false)
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div class="id_info">
        <div class="w-100" style={{ display: props.showCancel }}>
          <strong class="font-cancel">{t("Google Authenticator Enabled!")}</strong>
          <button disabled={disabledButton} class="btn button-cancel" onClick={cancelTwoFactor}>
            <i class="mdi icon-delete mdi-delete mr-2"></i>{t("Remover")}</button>
        </div>
        <div class="w-100" style={{ display: props.showQrcode }} >

          <button disabled={disabledButton} class="btn btn-primary" onClick={createTwoFactor}>
            <i class="mdi mdi-qrcode mr-2"></i>{t("Activate")}</button>
        </div>
        <div class="error" style={{ display: errorDisplay }} >
          <Alert style={{ fontWeight: '10', padding: " 0px 10px" }} variant="filled" severity="error">
            {t("An error has occurred. Please try again.")}
          </Alert>
        </div>

        <p class="mb-1 mt-3 text-muted">{t("Make sure you have the")}<strong>{" Google Authenticator "}</strong>{t("application installed phone.")}</p>
        <div class="">
          <a href='https://apps.apple.com/br/app/google-authenticator/id388497605' target="_blank"><img class="app-icon" src={apple} alt="" height="32px"></img></a>
          <a target="_blank" href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt_BR&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/pt-BR/badges/static/images/badges/en_badge_web_generic.png' height="50px" /></a>
        </div>
      </div>


       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <div class="popup-overlay" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>

          </DialogTitle>
          <div class="body-popup-check">
            <div class="title-qrcode">{t("SCAN THE QRCODE")}</div>

            <div class="qrcode">

              <img src={qrcode}></img></div>
            <div class="body-popup-check">
              <div>
                <button
                  disabled={disabledButton}
                  style={{
                    backgroundColor: '#10d876', borderColor: '#10d876',
                    alignContent: 'center', justifyContent: 'center',

                  }}
                  className="btn btn-success btn-block mt-4" onClick={confirmTwoFactor}>
                  {t('Confirm')}
                </button>
              </div>
              <div>

                <button
                  style={{
                    backgroundColor: '#bf0202', borderColor: '#bf0202',
                    alignContent: 'center', justifyContent: 'center',

                  }}
                  className="btn btn-success btn-block mt-4" onClick={handleClose}>
                  {t('Cancel')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </Dialog> 
     
    </div>
  );
}
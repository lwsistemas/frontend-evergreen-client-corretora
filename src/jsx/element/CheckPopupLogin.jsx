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
import { User } from '../store/User/User.action'




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

export default function CheckPopupLogin(props) {
  const [mensagemErro, setMensagemErro] = React.useState('');
  const [code, setCode] = useState('')
  const [errorDisplay, setErrorDisplay] = React.useState('none');
  const [disabledButton, setDisabledButton] = useState(true);

  const { t } = useTranslation()
  const confirmCode = async () => {
    setDisabledButton(true)
    let hashUser = props.user
    try {
      let teste = await axios.put(`/login/CheckAuth`,{ hashUser,code})
      if(teste.data){

        props.dispatch(User(props.dispatchUser))
        props.history.push('/dashboard')
        handleClose()

      }else{
      setMensagemErro("Wrong code, try again.")
      messageErro()
      }
      

    } catch (err) {
      setMensagemErro("Erro ao confirmar dois fatores." )
      messageErro()
     
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

  const disabledButtom = async (value) => {
    if(value.length!=6){
      setDisabledButton(true)

    }else{
      setDisabledButton(false)
    }

  }
  const handleClose = () => {
    props.setShowPopup(false)
  };

  return (
    <div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.showPopup}>
        <div class="popup-overlay" style={{ width: '100%',margin: '0 auto' }}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>

          </DialogTitle>
          <div class="" style={{ width: '100%',margin: '0 auto' }}>
            <div class="title-qrcode">Google Authenticator</div>

            <div>

              <input class="input-code" placeholder={t('Digite o codigo')}
                autocomplete="off"
                type="text"
                maxlength='6'
                name="code"
                value={code} onChange={e => {
                  setCode(e.target.value)
                  disabledButtom(e.target.value)}
                }
              />
            </div>
            <div class="error-pop-login" style={{display: errorDisplay,marginTop: "3%"}}>
              <Alert style={{ fontWeight: '10', padding: " 0px 10px" }} variant="filled" severity="error">
                {t(mensagemErro)}
              </Alert>
            </div>
            <div class="body-popup-check">
              <div>
                <button
                  disabled={disabledButton}
                  style={{
                    backgroundColor: '#10d876', borderColor: '#10d876',
                    alignContent: 'center', justifyContent: 'center',

                  }}
                  className="btn btn-success btn-block mt-4" onClick={confirmCode}>
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
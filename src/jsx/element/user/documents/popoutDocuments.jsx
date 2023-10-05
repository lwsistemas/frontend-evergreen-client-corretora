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
import '../../../../css/reactjs-popup-doc.css'
import axios from '../../../../services/index'
import { Alert, AlertTitle } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import DocSelect from './docSelect';
import animated from '../../../../images/animated-gif.gif'

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


export default function PopoutDocuments(props) {
  const { user, setModify, modify } = props
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false);
  const [errorDisplay, setErrorDisplay] = React.useState('block');
  const [disabledButton, setDisabledButton] = useState(true);
  const [typeDoc, setTypeDoc] = React.useState('');
  const [sucessDisplay, setSucessDisplay] = React.useState('none');
  const [docDisplay, setDocDisplay] = React.useState('none');
  const [mensagemErro, setMensagemErro] = useState('errro teste')
  const [typeUser, setTypeUser] = useState('')
  const [cardFile, setCardFile] = useState();
  const [showLoad, setShowLoad] = useState('none')
  const [showInput, setShowInput] = useState('none')

  const stilo = {
    position: 'absolute',
    zIndex: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 200,

    left: 0,
    right: 0,
    color: 'white'
  }

  const onChange = async (file) => {
    setCardFile(file)
    console.log(file)
    if (!file) {
      setCardFile('');
      return;
    }

  }

  const messageErro = async () => {
    setErrorDisplay('block')
    function myFunction() {
      setTimeout(function () { setErrorDisplay('none') }, 10000);
    }
    myFunction()

  }
  const createDocuments = async () => {
    setErrorDisplay('none')
    setShowLoad('none')
    setDocDisplay('block')
    setCardFile()
    setTypeDoc('')
    setDisabledButton(true)
    setOpen(true);
  }
  const pushDocuments = async () => {
    setShowInput('none')
    setShowLoad('block')
    setErrorDisplay('none')
    // console.log('name: ', typeDoc)
    // console.log('arquivo: ', cardFile)
    var formData = new FormData();
    formData.append('file', cardFile, 'documentoTest');

    // const data = new FormData();
    // data.append('file',cardFile)
    formData.append('authKey', user.authKey)
    formData.append('typeDoc', typeDoc)
    formData.append('typeUser', typeUser)
    //toUser or toDepend
    try {
      setModify(modify + 1)
      let doc = await axios.put('/documents/sendDocuments', formData)
      setDocDisplay('none')
      setSucessDisplay('block')

    } catch (error) {
      setMensagemErro('An error has occurred. Please try again.')
      setErrorDisplay('block')
      console.log(error)
    }
    setShowLoad('none')
    // setErrorDisplay('block')
    // function myFunction() {
    //   setTimeout(function () { setErrorDisplay('none') }, 10000);
    // }
    // myFunction()

  }
  const checkValues = (docType, file) => {
    if (docType != undefined && file != undefined && docType != '' && file != '') {
      console.log('file', file.size)
      if (file.size < 5000000) {
        setDisabledButton(false)
      } else {
        setMensagemErro(t("Maximum file size") + " 5MB")
        setErrorDisplay('block')
        setDisabledButton(true)

      }

    } else {
      setDisabledButton(true)

    }
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div class="id_info">
        <div class="w-90" style={{ textAlign: 'right', marginRight: '20px' }}>

          <button class="btn btn-primary" onClick={createDocuments}>
            <i class="mdi mdi-upload mr-2" ></i>{t("Upload document")}</button>
        </div>
      </div>


      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <div class="popup-overlay" open={open}>
          <div>
          </div>
          <div class="body-popup-check" style={{ margin: '20px', flex: 1 }}>
            <div class="body-popup-check">
              <div class="card-header">
                <h4 class="card-title">{t('Upload documents')}</h4>
              </div>
              <div >
                <div style={{ display: showLoad }}>
                  <img src={animated}
                    style={{
                      width: "30%", display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto', marginTop: 50,
                    }}></img>
                </div>
              </div>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>

              </DialogTitle>
              <div style={{ display: sucessDisplay }}>
                <div class="text-center">
                  <h4 class="card-title">{t("Success")}!</h4>
                  <Alert style={{ color: "rgb(16 216 118)", backgroundColor: "transparent", textAlign: 'center !important', marginLeft: '29%' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                    {t("Document sent")}
                  </Alert>
                </div >

                <div class="card-body">
                  <div class="text-center">

                  </div>
                  <div class="text-center">
                    <button onClick={handleClose} className="btn btn-success btn-block">{t("Confirm")} </button>
                  </div>
                </div>
              </div>
              <div style={{ display: docDisplay }}>

                <div class="form-group">
                  <p class=" form-label tex-commun">{t("Document Type") + ":" + " "} </p>
                  <DocSelect setTypeUser={setTypeUser} setTypeDoc={setTypeDoc} checkValues={checkValues} cardFile={cardFile} />
                </div>
                <div>
                  <label className="form-label tex-commun" styles={{ color: "white" }}>{t("Search File") + ":"}</label>

                </div>

                <div style={{ border: '1px solid rgb(232, 244, 253)', borderRadius: '0.25rem' }}>
                  <input className="tex-commun" type="file" accept="image/png,image/jpeg, application/pdf" onChange={(event) => {
                    checkValues(typeDoc, event.target.files[0])
                    onChange(event.target.files[0] || null)
                  }} />
                </div>

                <div class="error-pop-login" style={{ display: errorDisplay, marginTop: "3%" }}>
                  <Alert style={{ fontWeight: '10', padding: " 0px 10px" }} variant="filled" severity="error">
                    {t(mensagemErro)}
                  </Alert>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <button
                    disabled={disabledButton}
                    style={{
                      backgroundColor: '#10d876', borderColor: '#10d876',
                    }}
                    className="btn mdi mdi-upload btn-success mt-4" onClick={pushDocuments}>
                    {t('Submit')}
                  </button>
                </div>
                <div>

                  <Alert severity="info">
                    <AlertTitle>{t("Select the file on your computer")}</AlertTitle>
                    {t("Maximum file size") + " 5MB"}
                  </Alert>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Dialog>

    </div>
  );
}
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";
import '../../../css/reactjs-popup.css'
import { Link } from 'react-router-dom';





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

export default function GoTo2FA(props) {

  const { openGoTo2FA, setOpenGoTo2FA } = props
  const { t } = useTranslation()
  const goTo = async () => {
    console.log("ok")

  }


  const handleClose = () => {
    setOpenGoTo2FA(false)
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openGoTo2FA}>
        {/* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.showPopup}> */}
        <div class="popup-overlay" style={{ width: '100%', margin: '0 auto' }}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          </DialogTitle>
          <div class="" style={{ width: '100%', margin: '0 auto' }}>

            <div class="title-qrcode">Google Authenticator</div>
            <div class="body-popup-check">
              <div>
                <h4>
                  {t('To complete a transaction, you get your "Google Authenticator" activated.')}
                </h4>
              </div>
              <div style={{ marginTop: '20px' }}>
                <h5>
                  {t("Do you want to continue?")}
                </h5>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>


                <Link to={"../user/secutiry"}>
                  <button
                    style={{
                      backgroundColor: '#10d876', borderColor: '#10d876',
                      alignContent: 'center', justifyContent: 'center',

                    }}
                    className="btn btn-success btn-block " >
                    {t("Continue")}
                  </button>
                </Link>

              </div>
            </div>
          </div>

        </div>
      </Dialog>
    </div>
  );
}
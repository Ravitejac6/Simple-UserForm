import React,{useState} from 'react'
import {Button, Dialog, Typography} from '@material-ui/core'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {UserForm} from './forms/formSlice'
import {useSelector} from 'react-redux'


const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
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

const DialogContent = withStyles((theme: Theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme: Theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
}))(MuiDialogActions);



export const DialogBoxComponent = () =>{
    const [open, setOpen] = useState(false);
    const selectUserForm:UserForm = useSelector((state:UserForm) => state)


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="dialog-box">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Open dialog
          </Button>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                User Data
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                  FirstName:
                    {selectUserForm.firstName}
              </Typography>
              <Typography gutterBottom>
                  Email:
                    {selectUserForm.email}
              </Typography>
              <Typography gutterBottom>
                  Gender:
                    {selectUserForm.gender}
              </Typography>
              <Typography gutterBottom>
                  Mobile Number:
                    {selectUserForm.mobileNumber}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Save changes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}
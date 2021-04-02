import React, { useState } from "react";
import { Button, Dialog, Typography, List, ListItem } from "@material-ui/core";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { UserForm } from "./forms/reducer";
import { useSelector } from "react-redux";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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

export const DialogBoxComponent = () => {
  const [open, setOpen] = useState(false);
  const selectUserForm: UserForm = useSelector((state: UserForm) => state);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="dialog-box">
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Preview
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
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
          <Typography gutterBottom>Languages:</Typography>
          <List>
            <ListItem>{selectUserForm.c === true ? "C" : ""}</ListItem>
            <ListItem>{selectUserForm.c_plus === true ? "C++" : ""}</ListItem>
            <ListItem>
              {selectUserForm.python === true ? "Python" : ""}
            </ListItem>
          </List>
          <img
            src={`data:image/jpeg/png;base64,${selectUserForm.userImage}`}
            alt="Image not loaded"
            width="275"
            height="325"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Submit
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

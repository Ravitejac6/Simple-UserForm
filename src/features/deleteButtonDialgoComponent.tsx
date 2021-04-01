import React, { FunctionComponent, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Button, DialogActions, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Theme, withStyles } from "@material-ui/core/styles";

interface Props {
  userEmail: string;
}
export const DeleteButtonDialogComponent: FunctionComponent<Props> = (
  props
) => {
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState("");

  const DialogActions = withStyles((theme: Theme) => ({
    root: {
      margin: 4,
      padding: theme.spacing(4),
    },
  }))(MuiDialogActions);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleButtonClick = (val: string) => {
    setDel(val);
    console.log(props.userEmail);
    setOpen(false);
    if (val === "yes") {
      fetch("/records/" + props.userEmail, {
        method: "DELETE",
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <Typography variant="h6">Confirm</Typography>
        <DialogActions>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => handleButtonClick("yes")}
          >
            Yes
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => handleButtonClick("no")}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

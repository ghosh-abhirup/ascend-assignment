import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ onClose, open, taskData, setCallGetTasks }) => {
  const deleteTaskHandler = async () => {
    try {
      const response = await axios.delete(`/api/deleteTask/${taskData.id}`);

      console.log(response);
      setCallGetTasks(true);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-paper": {
          width: "90%",
          maxWidth: "500px",
        },
      }}
    >
      <DialogTitle>
        <p className="font-semibold text-base">{taskData.desc}</p>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <p>Have you completed the task?</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            setCallGetTasks(false);
          }}
        >
          <p>No</p>
        </Button>
        <Button onClick={deleteTaskHandler}>
          <p>Yes</p>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;

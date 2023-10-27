import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTaskModal = ({ onClose, open, listData, setCallGetTasks }) => {
  const [taskName, setTaskName] = useState("");
  const { userData, notifyToast } = useContext(AppContext);

  const onCreateHandler = async () => {
    if (taskName.trim().length !== 0) {
      try {
        const { data } = await axios.post("/api/addTask", {
          listId: listData.id,
          desc: taskName,
        });

        // console.log(data);
        setCallGetTasks(true);
        onClose();
      } catch (e) {
        console.log(e);
      }
    } else {
      notifyToast("Please give a title to your task", "danger");
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
        <p className="font-semibold text-base">Enter your task</p>
      </DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          sx={{
            width: "100%",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            setTaskName("");
            setCallGetTasks(false);
          }}
        >
          <p>Cancel</p>
        </Button>
        <Button onClick={onCreateHandler}>
          <p>Create</p>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskModal;

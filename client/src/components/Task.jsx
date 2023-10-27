import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import Modal from "./ui/Modal";

const Task = ({ data, setCallGetTasks, index }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Draggable draggableId={data.id} index={index}>
        {(provided) => (
          <div
            className="w-full p-2 sm:p-4 rounded-md themeText bg-slate-500"
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            onClick={() => setOpenModal(true)}
          >
            <p className="text-white font-semibold w-full truncate">
              {data.desc}
            </p>
            <Toaster />
          </div>
        )}
      </Draggable>

      {openModal && (
        <Modal
          taskData={data}
          open={openModal}
          onClose={() => setOpenModal(false)}
          setCallGetTasks={setCallGetTasks}
        />
      )}
    </>
  );
};

export default Task;

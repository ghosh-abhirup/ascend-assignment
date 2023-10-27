import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { AppContext } from "../context/AppContext";
import CreateTaskModal from "./ui/CreateTaskModal";
import { Button } from "@mui/material";
import axios from "axios";

const List = ({ data }) => {
  const { userData, reloadAllTasks, setReloadAllTasks } =
    useContext(AppContext);

  const [openModal, setOpenModal] = useState(false);
  const [callGetTasks, setCallGetTasks] = useState(false);

  const [allTasks, setAllTasks] = useState([]);

  const getAllTasks = async () => {
    // console.log(data);
    try {
      const response = await axios.get(`/api/getTasks/${data?.id}`);
      // console.log(response.data);

      setAllTasks(response.data);
    } catch (e) {
      console.log("Error in getLists call", e);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    if (reloadAllTasks) {
      getAllTasks();
      setReloadAllTasks(false);
    }
  }, [reloadAllTasks]);

  useEffect(() => {
    if (callGetTasks) {
      getAllTasks();
    }
  }, [callGetTasks]);

  return (
    <>
      <div className="w-full text-center shadow-lg min-h-[300px] rounded-lg flex flex-col overflow-hidden">
        <p className="w-full bg-black py-4 text-white font-bold">{data.name}</p>
        <div className="flex-1 flex flex-col justify-between gap-2 p-4 bg-white">
          <Droppable droppableId={data.id} className="h-full">
            {(provided) => (
              <div
                className="h-full flex flex-col gap-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {allTasks &&
                  allTasks.map((task, index) => (
                    <Task
                      data={task}
                      setCallGetTasks={setCallGetTasks}
                      key={task.id}
                      index={index}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            <span className="mr-4">
              <FontAwesomeIcon icon={faPlus} className="" />
            </span>
            <span className="font-bold text-base sm:text-lg">Add Task</span>
          </Button>
        </div>
      </div>

      {openModal && (
        <CreateTaskModal
          listData={data}
          open={openModal}
          onClose={() => setOpenModal(false)}
          setCallGetTasks={setCallGetTasks}
        />
      )}
    </>
  );
};

export default List;

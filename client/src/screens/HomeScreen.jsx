import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import List from "../components/List";
import { DragDropContext } from "react-beautiful-dnd";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Button } from "@mui/material";
import CreateListModal from "../components/ui/CreateListModal";

const HomeScreen = () => {
  const {
    getProfileUser,
    userData,
    allLists,
    setAllLists,
    reloadAllTasks,
    setReloadAllTasks,
  } = useContext(AppContext);

  const [openModal, setOpenModal] = useState(false);
  const [callGetLists, setCallGetLists] = useState(true);
  const [callingDependency, setCallingDependency] = useState(true);

  useEffect(() => {
    getProfileUser();
  }, []);

  const getAllLists = async () => {
    console.log("calling get list");
    try {
      const { data } = await axios.get(`/api/getLists/${userData.id}`);
      // console.log(data);

      setAllLists(data);
    } catch (e) {
      console.log("Error in getLists call", e);
    }
  };

  useEffect(() => {
    if (userData && callGetLists) {
      console.log("called again");
      getAllLists();
      setCallGetLists(false);
    }
  }, [userData, callGetLists, callingDependency]);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  // Drag
  const handleOnDragEnd = async (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    try {
      const response = await axios.put("/api/updateParentList", {
        listId: destination.droppableId,
        taskId: draggableId,
      });
      setReloadAllTasks(true);

      console.log(response);
    } catch (e) {
      console.log("Error in drag and drop", e);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen  bg-white dark:bg-dark-grey px-4 sm:px-10 py-2 sm:py-4 flex flex-col items-center">
        <Button variant="contained" onClick={openModalHandler}>
          <span className="mr-4">
            <FontAwesomeIcon icon={faPlus} className="" />
          </span>
          <span className="font-bold text-base sm:text-lg">Add list</span>
        </Button>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="listGroup mt-5 sm:mt-10">
            {allLists &&
              allLists.map((listData, index) => (
                <List data={listData} key={listData.id} />
              ))}
          </div>
        </DragDropContext>
      </div>

      {openModal && (
        <CreateListModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          setCallGetLists={setCallGetLists}
          setCallingDependency={setCallingDependency}
        />
      )}
    </>
  );
};

export default HomeScreen;

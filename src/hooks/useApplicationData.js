import { useState, useEffect } from "react";
import actionJSON from "../data/actions.json";
import workflowJSON from "../data/workflow.json";
import { arrayMove } from "@dnd-kit/sortable";

const useApplicationData = () => {
  const [state, setState] = useState({
    actionList: [],
    savedList: {},
    actions: [],
  });

  useEffect(() => {
    // Ensure actionJSON is not empty and is an array
    if (actionJSON && Array.isArray(actionJSON)) {
      setState((prevState) => ({
        ...prevState,
        actions: actionJSON,
      }));
    } else {
      console.error("Invalid or empty actions.json file.");
    }

    // Ensure workflowJSON is not empty and is an object
    if (
      workflowJSON &&
      typeof workflowJSON === "object" &&
      Object.keys(workflowJSON).length > 0
    ) {
      setState((prevState) => ({
        ...prevState,
        actionList: workflowJSON.Stages,
        savedList: workflowJSON,
      }));
    } else {
      console.error("Invalid or empty workflow.json file.");
    }
  }, []);

  const getActionPos = (id) =>
    state.actionList.findIndex((action) => action.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const overId = over.data.current.sortable.containerId;

    if (active.id === over.id) return;

    if (overId === "Sortable-1") {
      setState((prevState) => {
        const originalPos = getActionPos(active.id);
        const newPos = getActionPos(over.id);

        const updatedActions = prevState.actionList.map((action) => {
          if (action.id === active.id) {
            return {
              ...action,
              nextStage: newPos + 1,
              prevStage: newPos - 1,
            };
          } else {
            return action;
          }
        });

        const movedActions = arrayMove(updatedActions, originalPos, newPos);

        return { ...prevState, actionList: movedActions };
      });
    } else {
      setState((prevState) => {
        const originalPos = getActionPos(active.id);
        const newPos = getActionPos(over.id);

        const updatedActions = prevState.actionList.map((action) => {
          if (action.id === active.id) {
            return {
              ...action,
              nextStage: null,
              prevStage: null,
            };
          } else {
            return action;
          }
        });

        const movedActions = arrayMove(updatedActions, originalPos, newPos);

        return { ...prevState, actionList: movedActions };
      });
    }
  };

  // Saves changes on click
  const handleOnSaveClick = () => {
    // Create a new object with the updated Stages property
    const updatedSavedList = {
      ...state.savedList,
      Stages: [...state.actionList],
    };

    // Update the state with the updated object
    setState((prevState) => ({
      ...prevState,
      savedList: updatedSavedList,
    }));
  };

  // Cancels changes on click
  const handleOnCancelClick = () => {
    // Reset the actionList to the saved state
    setState((prevState) => ({
      ...prevState,
      actionList: [...state.savedList.Stages],
    }));
  };

  // Return the state variables and functions you want to expose
  return {
    state,
    handleOnSaveClick,
    handleOnCancelClick,
    handleDragEnd
  };
};

export default useApplicationData;

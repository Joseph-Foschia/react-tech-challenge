import { useState, useEffect } from "react";
import actionJSON from "../data/actions.json";
import workflowJSON from "../data/workflow.json";
import { arrayMove } from "@dnd-kit/sortable";

const useApplicationData = () => {

  // Stateful variables
  const [state, setState] = useState({
    actionList: [],
    savedList: {},
    actions: [],
  });

  // Grab local JSON files
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

  // Main functions below

  // Takes the id of the task and goes through the tasks array where the given id occurs
  const getActionPos = (id) =>
    state.actionList.findIndex((action) => action.id === id);

  // Handles functionality when the dragged item is let go
  const handleDragEnd = (event) => {
    const { active, over } = event;
    const overId = over.data.current.sortable.containerId;

    // if the item is let go in the same position it will do nothing
    if (active.id === over.id) return;

    const originalPos = getActionPos(active.id);
    const newPos = getActionPos(over.id);

    // If the item is dropped on the Canvas it update the values within the object so it becomes visible in a later check, if not it sets them to null
    if (overId === "Sortable-1") {

      setState((prevState) => {

        // Updates actionList and arrayMove
        const updatedActions = prevState.actionList.map((action, idx) => {
          if (action.id === active.id) {
            // Setting the isStart, prevStage and nextStage keys
            let start = false;
            let prev = idx - 1;
            let next = idx + 1;

            if (idx === 0) {
              start = true;
              prev = null;
            } else if (idx === prevState.actionList.length) {
              next = null;
            }

            // Set nextStage and prevStage to have a value so they appear in the canvas
            return {
              ...action,
              isStart: start,
              nextStage: next,
              prevStage: prev,
            };
          } else {
            return action;
          }
        });

        // Move the dragged element to its new position
        const movedActions = arrayMove(updatedActions, originalPos, newPos);

        return { ...prevState, actionList: movedActions };
      });

    } else {

      setState((prevState) => {
        const updatedActions = prevState.actionList.map((action) => {
          if (action.id === active.id) {
            // Set nextStage and prevStage to null so they get displayed in the Workflow Editor
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

  // Return state variables
  return {
    state,
    handleOnSaveClick,
    handleOnCancelClick,
    handleDragEnd,
  };
};

export default useApplicationData;

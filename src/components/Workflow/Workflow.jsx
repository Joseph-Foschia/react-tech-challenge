import Canvas from "../Canvas/Canvas";
import WorkflowEditor from "../WorkflowEditor/WorkflowEditor";
import { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { checkMissingActions } from "../../hooks/helpers";
import useApplicationData from "../../hooks/useApplicationData";
import actionJSON from "../../data/actions.json";
import workflowJSON from "../../data/workflow.json";

const Workflow = () => {
  const { state, handleOnSaveClick, handleOnCancelClick, handleDragEnd } =
  useApplicationData();

  
  // const [actionList, setActionList] = useState([]);
  // const [savedList, setSavedList] = useState({});
  // const [actions, setActions] = useState([]);

  // useEffect(() => {
  //   // Ensure actionJSON is not empty and is an array
  //   if (actionJSON && Array.isArray(actionJSON)) {
  //       setActions(actionJSON);
  //   } else {
  //       console.error("Invalid or empty actions.json file.");
  //   }

  //   // Ensure workflowJSON is not empty and is an object
  //   if (workflowJSON && typeof workflowJSON === 'object' && Object.keys(workflowJSON).length > 0) {
  //       setActionList(workflowJSON.Stages);
  //       setSavedList(workflowJSON);
  //   } else {
  //       console.error("Invalid or empty workflow.json file.");
  //   }

    // Checks if any Actions are missing from the JSON data and adds them if they are abscent
    // I just chose to add the missing action instead
    // checkMissingActions(workflowJSON, actionJSON);
// }, []);
  // const parsedActionJSON = JSON.parse(actionJSON);
  // const parsedWorkflowJSON = JSON.parse(workflowJSON);

  // Takes the id of the task and goes through the tasks array where the given id occurs
  // const getActionPos = (id) =>
  //   actionList.findIndex((action) => action.id === id);

  // // Handles functionality when the dragged item is let go
  // const handleDragEnd = (event) => {
  //   // active is the current element and over is the element that will be replaced
  //   const { active, over } = event;

  //   const overId = over.data.current.sortable.containerId;

  //   // if the item is let go in the same position it will do nothing
  //   if (active.id === over.id) return;

  //   // If the item is dropped on the Canvas it update the values within the object so it becomes visible in a later check, if not it sets them to null
  //   if (overId === "Sortable-1") {

  //     setActionList((actions) => {
  //       const originalPos = getActionPos(active.id);
  //       const newPos = getActionPos(over.id);

  //       // Updates actionList and arrayMove
  //       const updatedActions = actions.map((action) => {
  //         if (action.id === active.id) {
  //           // Set nextStage and prevStage to have a value so they appear in the canvas
  //           return {
  //             ...action,
  //             nextStage: newPos + 1,
  //             prevStage: newPos - 1
  //           };
  //         } else {
  //           return action;
  //         }
  //       });
    
  //       // Move the dragged element to its new position
  //       const movedActions = arrayMove(updatedActions, originalPos, newPos);
    
  //       return movedActions;
  //     });
  //   } else {
  //     setActionList((actions) => {
  //       const originalPos = getActionPos(active.id);
  //       const newPos = getActionPos(over.id);

  //       const updatedActions = actions.map((action) => {
  //         if (action.id === active.id) {
  //           // Set nextStage and prevStage to null so they get displayed in the Workflow Editor
  //           return {
  //             ...action,
  //             nextStage: null,
  //             prevStage: null
  //           };
  //         } else {
  //           return action;
  //         }
  //       });
    
  //       const movedActions = arrayMove(updatedActions, originalPos, newPos);
    
  //       return movedActions;
  //     });
  //   }
    
  // };

  // // Saves changes on click
  // const handleOnSaveClick = () => {
  //   // Create a new object with the updated Stages property
  //   const updatedSavedList = {
  //     ...savedList,
  //     Stages: [...actionList]
  //   };
  
  //   // Update the savedList state with the updated object
  //   setSavedList(updatedSavedList);
  // };
  
  // // Cancels changes on click
  // const handleOnCancelClick = () => {
  //   setActionList([...savedList.Stages]);
  // };

  return (
    <div className="Workflow">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <h1>Canvas</h1>
        <Canvas data={state.actionList}/>
        <h1>Workflow Editor</h1>
        <WorkflowEditor data={state.actionList} />
      </DndContext>
      <div className="button-box">
        <button onClick={() => handleOnSaveClick()}>Save</button>
        <button onClick={() => handleOnCancelClick()}>Cancel</button>
      </div>
    </div>
  );
};

export default Workflow;

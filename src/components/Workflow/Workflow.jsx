import Canvas from "../Canvas/Canvas";
import WorkflowEditor from "../WorkflowEditor/WorkflowEditor";
import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { checkMissingActions } from "../../hooks/helpers";

const Workflow = () => {
  const data = {
    _id: "bU4rMI7fEeeqxlvy4NOyyA==",
    ProjectId: "bOd74o7fEeeqxlvy4NOyyA==",
    AcctId: "GVb1w0skuUKO+FfzgvG+JA==",
    Stages: [
      {
        id: 1,
        action: "Import",
        isStart: true,
        prevStage: null,
        nextStage: 2,
      },
      {
        id: 2,
        action: "Sort",
        isStart: false,
        prevStage: 1,
        nextStage: 3,
      },
      {
        id: 3,
        action: "Extract",
        isStart: false,
        prevStage: 2,
        nextStage: null,
      },
      {
        id: 4,
        action: "Export",
        isStart: false,
        prevStage: null,
        nextStage: null,
      },
    ],
  };

  const Actions = ["Import", "Export", "Sort", "Extract", "Split"];

  // Checks if any Actions are missing from the JSON data and adds them if they are abscent
  checkMissingActions(data, Actions);

  const [actionList, setActionList] = useState(data.Stages);
  const [savedList, setSavedList] = useState(data);

  // Takes the id of the task and goes through the tasks array where the given id occurs
  const getActionPos = (id) =>
    actionList.findIndex((action) => action.id === id);

  // Handles functionality when the dragged item is let go
  const handleDragEnd = (event) => {
    // active is the current element and over is the element that will be replaced
    const { active, over } = event;

    const overId = over.data.current.sortable.containerId;

    // if the item is let go in the same position it will do nothing
    if (active.id === over.id) return;

    // If the item is dropped on the Canvas it update the values within the object so it becomes visible in a later check, if not it sets them to null
    if (overId === "Sortable-1") {

      setActionList((actions) => {
        const originalPos = getActionPos(active.id);
        const newPos = getActionPos(over.id);

        // Updates actionList and arrayMove
        const updatedActions = actions.map((action) => {
          if (action.id === active.id) {
            // Set nextStage and prevStage to have a value so they appear in the canvas
            return {
              ...action,
              nextStage: newPos + 1,
              prevStage: newPos - 1
            };
          } else {
            return action;
          }
        });
    
        // Move the dragged element to its new position
        const movedActions = arrayMove(updatedActions, originalPos, newPos);
    
        return movedActions;
      });
    } else {
      setActionList((actions) => {
        const originalPos = getActionPos(active.id);
        const newPos = getActionPos(over.id);

        const updatedActions = actions.map((action) => {
          if (action.id === active.id) {
            // Set nextStage and prevStage to null so they get displayed in the Workflow Editor
            return {
              ...action,
              nextStage: null,
              prevStage: null
            };
          } else {
            return action;
          }
        });
    
        const movedActions = arrayMove(updatedActions, originalPos, newPos);
    
        return movedActions;
      });
    }
    
  };

  // Saves changes on click
  const handleOnSaveClick = () => {
    // Create a new object with the updated Stages property
    const updatedSavedList = {
      ...savedList,
      Stages: [...actionList]
    };
  
    // Update the savedList state with the updated object
    setSavedList(updatedSavedList);
  };
  
  // Cancels changes on click
  const handleOnCancelClick = () => {
    setActionList([...savedList.Stages]);
  };

  return (
    <div className="Workflow">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <h1>Canvas</h1>
        <Canvas data={actionList} setActionList={setActionList} />
        <h1>Workflow Editor</h1>
        <WorkflowEditor data={actionList} setActionList={setActionList} />
      </DndContext>
      <div className="button-box">
        <button onClick={() => handleOnSaveClick()}>Save</button>
        <button onClick={() => handleOnCancelClick()}>Cancel</button>
      </div>
    </div>
  );
};

export default Workflow;

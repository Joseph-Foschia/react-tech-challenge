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

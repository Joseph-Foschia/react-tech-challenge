import Canvas from "./Canvas";
import WorkflowEditor from "./WorkflowEditor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Items from "./Items";
import { useState } from "react";


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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Workflow">
        <Canvas data={data}/>
        <WorkflowEditor data={data}/>
      </div>
    </DndProvider>
  );
};

export default Workflow;

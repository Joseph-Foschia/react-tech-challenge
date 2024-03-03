import { useState } from 'react';
import Items from '../Items/Items';

const WorkflowEditor = ({data}) => {

  const Actions = [
    "Import",
    "Export",
    "Sort",
    "Extract",
    "Split",
  ]

  return (
    <div className="WorkflowEditor drag-zone" >
    </div>
  );
}

export default WorkflowEditor;
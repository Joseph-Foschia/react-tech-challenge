import { useState } from 'react';
import { useDrop } from 'react-dnd';
import Items from './Items';

const WorkflowEditor = ({data}) => {

  const [board, setBoard] = useState([]);

  const Actions = [
    "Import",
    "Export",
    "Sort",
    "Extract",
    "Split",
  ]

  const [{isOver}, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item) => addItemToBoard(item.id),
    collect: (monitor) => ({ // Allows us to check if the dragging has completed
      isOver: !!monitor.isOver(),
    }),
  }))

  const addItemToBoard = (id) => {
    console.log(id);
    const ActionList = data.Stages.filter((Action) => id === Action.id);
    setBoard((board) => [...board, ActionList[0]]);
    setBoard([ActionList[0]]);
  }

  const editorItems = board.map((item) => {
    return <Items id={item.id} name={item.action} />
  });

  return (
    <div className="WorkflowEditor drag-zone" ref={drop}>
      {editorItems}
    </div>
  );
}

export default WorkflowEditor;
import Items from "../Items/Items";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";

const Canvas = ({ data, setActionList }) => {
  console.log("data", data);

  // Takes the id of the task and goes through the tasks array where the given id occurs
  const getActionPos = (id) => data.findIndex(action => action.id === id);

  const handleDragEnd = (event) => {
    // active is the current element and over is the element that will be replaced
    const {active, over} = event;

    // if it's let go in the same position it will do nothing
    if (active.id === over.id) return; 

    setActionList(actions => {
      const originalPos = getActionPos(active.id);
      const newPos = getActionPos(over.id);
      console.log("original position: ", originalPos);
      console.log("newPosition:", newPos);
      console.log("ARRAY MOVE", arrayMove(actions, originalPos, newPos));
      return arrayMove(actions, originalPos, newPos);
    })
  }

  const dataList = data.map((stage) => {
    return <Items id={stage.id} name={stage.action} key={stage.id}/>;
  });

  return (
    <div className="Canvas drag-zone">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <SortableContext items={data} strategy={horizontalListSortingStrategy}>{dataList}</SortableContext>
      </DndContext>
    </div>
  );
};

export default Canvas;
import Items from "../Items/Items";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

const Canvas = ({ data, setActionList }) => {

  const dataList = data.map((stage) => {
    if (stage.prevStage !== null || stage.nextStage !== null)
    return <Items id={stage.id} name={stage.action} key={stage.id}/>;
  });

  return (
    <div className="Canvas drag-zone">
        <SortableContext key={1} items={data} strategy={horizontalListSortingStrategy}>{dataList}</SortableContext>
    </div>
  );
};

export default Canvas;
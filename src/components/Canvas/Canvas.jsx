import Items from "../Items/Items";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./canvas.css";

const Canvas = ({ data }) => {
  // If either prevStage or nextStage has value it will append it
  const dataList = data.map((stage) => {
    if (stage.prevStage !== null || stage.nextStage !== null)
      return <Items id={stage.id} name={stage.action} key={stage.id} />;
  });

  return (
    <div className="Canvas drag-zone">
      <SortableContext items={data} strategy={horizontalListSortingStrategy}>
        {dataList}
      </SortableContext>
    </div>
  );
};

export default Canvas;

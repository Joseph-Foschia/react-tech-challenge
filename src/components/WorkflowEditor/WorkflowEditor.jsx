import Items from "../Items/Items";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const WorkflowEditor = ({ data }) => {

  const dataList = data.map((stage) => {
    if (stage.prevStage === null && stage.nextStage === null)
    return <Items id={stage.id} name={stage.action} key={stage.id} />;
  });
  return (
    <div className="WorkflowEditor drag-zone">
        <SortableContext key={2} items={data} strategy={horizontalListSortingStrategy}>
          {dataList}
        </SortableContext>
    </div>
  );
};

export default WorkflowEditor;

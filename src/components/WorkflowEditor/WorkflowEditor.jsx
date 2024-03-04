import Items from "../Items/Items";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./workfloweditor.css";

const WorkflowEditor = ({ data }) => {
  // Diplays only the items whos prevStage and nextStage aren't both null
  const dataList = data.map((stage) => {
    if (stage.prevStage === null && stage.nextStage === null)
      return <Items id={stage.id} name={stage.action} key={stage.id} />;
  });

  return (
    <div className="WorkflowEditor drag-zone">
      <SortableContext items={data} strategy={horizontalListSortingStrategy}>
        {dataList}
      </SortableContext>
    </div>
  );
};

export default WorkflowEditor;

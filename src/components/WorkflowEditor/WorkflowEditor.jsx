import Items from "../Items/Items";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./workfloweditor.css";
import { checkListLength } from "../../hooks/helpers";

const WorkflowEditor = ({ data }) => {

  // Diplays only the items whos prevStage and nextStage aren't both null
  const dataList = data.map((stage) => {
    if (stage.prevStage === null && stage.nextStage === null)
      return <Items id={stage.id} name={stage.action} key={stage.id} />;
  });

  // Checks how populated the list is
  const dataListLength = checkListLength(dataList);

  return (
    <div className="WorkflowEditor drag-zone">
      <SortableContext items={data} strategy={horizontalListSortingStrategy}>
        {dataList}
        {dataListLength === 0 && <Items id={0} name={"Drop Here"} empty={"empty"}></Items>}
      </SortableContext>
    </div>
  );
};

export default WorkflowEditor;

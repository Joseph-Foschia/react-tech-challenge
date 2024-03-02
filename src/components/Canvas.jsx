import Items from "./Items";

const Canvas = ({data}) => {

  

  const dataList = data.Stages.map((stage) => {
    return <Items id={stage.id} name={stage.action} />
  });
  
  return (
    <div className="Canvas drag-zone">
      {dataList}
    </div>
  );
}

export default Canvas;
import { useDrag } from 'react-dnd';

const Items = ({id, name}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: "item",
    item: {id: id},
    collect: (monitor) => ({ // Technically optional function but if you want to keep track if it is dragging or not this will monitor it
      isDragging: !!monitor.isDragging(),
    })
  }));
  return (
    <div className="Items container" ref={drag} style={{border: isDragging ? "5px solid pink" : "0px"}}>
    <p>{name}</p>
    </div>
  );
};

export default Items;

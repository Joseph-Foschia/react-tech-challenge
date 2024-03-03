import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Items = ({ id, name }) => {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: id});

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div
      className="Items container"
      ref={setNodeRef} {...attributes} {...listeners} style={style}
    >
      <p>{name}</p>
    </div>
  );
};

export default Items;

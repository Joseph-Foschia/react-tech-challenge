import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./items.css";

const Items = ({ id, name }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  // This is how @dnd-kit can control what the element looks like while dragging it
  const style = {
    transition,
    // transform variable is not a string and needs to be converted
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="Items container"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <p>{name}</p>
    </div>
  );
};

export default Items;

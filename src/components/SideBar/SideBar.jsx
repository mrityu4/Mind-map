import React, { memo } from "react";
import { Handle, Position } from "react-flow-renderer";

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

export const Circle = () => {
  return (
    <div style={{ position: "relative" }}>
      <Handle
        id="1"
        className="drop-handle-target"
        type="target"
        position={Position.Left}
      />
      <Handle id="2" type="target" position={Position.Left} />
      <Handle id="3" type="source" position={Position.Left} />
      <div
        className="dndnode circle"
        onDragStart={(event) => onDragStart(event, "Circle")}
        draggable
      >
        Circle
      </div>
      <Handle
        id="4"
        className="drop-handle-target"
        type="target"
        position={Position.Right}
      />
      <Handle id="5" type="target" position={Position.Right} />
      <Handle id="6" type="source" position={Position.Right} />
    </div>
  );
};

export const Square = () => {
  return (
    <div style={{ position: "relative" }}>
      <Handle
        id="7"
        className="drop-handle-target"
        type="target"
        position={Position.Left}
      />
      <Handle id="8" type="target" position={Position.Left} />
      <Handle id="9" type="source" position={Position.Left} />
      <div
        className="dndnode square"
        onDragStart={(event) => onDragStart(event, "Square")}
        draggable
      >
        Square
      </div>
      <Handle
        id="10"
        className="drop-handle-target"
        type="target"
        position={Position.Right}
      />
      <Handle id="11" type="target" position={Position.Right} />
      <Handle id="12" type="source" position={Position.Right} />
    </div>
  );
};

export const Rectangle = () => {
  return (
    <div style={{ position: "relative" }}>
      <Handle
        id="13"
        className="drop-handle-target"
        type="target"
        position={Position.Left}
      />
      <Handle id="14" type="target" position={Position.Left} />
      <Handle id="15" type="source" position={Position.Left} />
      <div
        className="dndnode rectangle"
        onDragStart={(event) => onDragStart(event, "Rectangle")}
        draggable
      >
        Rectangle
      </div>
      <Handle
        id="16"
        className="drop-handle-target"
        type="target"
        position={Position.Right}
      />
      <Handle id="17" type="target" position={Position.Right} />
      <Handle id="18" type="source" position={Position.Right} />
    </div>
  );
};

export const Heading = memo(({ data }) => {
  return (
    <div style={{ position: "relative" }} onChange={data.onChange}>
      <Handle
        id="19"
        className="drop-handle-target"
        type="target"
        position={Position.Left}
      />
      <Handle id="20" type="target" position={Position.Left} />
      <Handle id="21" type="source" position={Position.Left} />
      <input
        className="dndnode heading"
        onDragStart={(event) => onDragStart(event, "Heading")}
        draggable
        placeholder="Yo!"
        value={data.value}
      />
      <Handle
        id="22"
        className="drop-handle-target"
        type="target"
        position={Position.Right}
      />
      <Handle id="23" type="target" position={Position.Right} />
      <Handle id="24" type="source" position={Position.Right} />
    </div>
  );
});

export const Text = memo(({ data }) => {
  return (
    <div style={{ position: "relative" }} onChange={data.onChange}>
      <Handle
        id="25"
        className="drop-handle-target"
        type="target"
        position={Position.Left}
      />
      <Handle id="26" type="target" position={Position.Left} />
      <Handle id="27" type="source" position={Position.Left} />
      <textarea
        className="dndnode text"
        onDragStart={(event) => onDragStart(event, "Text")}
        draggable
        placeholder="Yo Boi!"
        rows="5"
        value={data.value}
      />
      <Handle
        id="28"
        className="drop-handle-target"
        type="target"
        position={Position.Right}
      />
      <Handle id="29" type="target" position={Position.Right} />
      <Handle id="30" type="source" position={Position.Right} />
    </div>
  );
});

export const HeadingSideBar = () => {
  return (
    <div
      className="dndnode heading"
      onDragStart={(event) => onDragStart(event, "Heading")}
      draggable
    >
      Heading
    </div>
  );
};

export const TextSideBar = () => {
  return (
    <div
      className="dndnode text"
      onDragStart={(event) => onDragStart(event, "Text")}
      draggable
    >
      Text
    </div>
  );
};

export default () => {
  // const store = useStoreApi();
  // console.log(store.getState().nodeInternals);

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <TextSideBar />
      <HeadingSideBar />
      <Rectangle />
      <Square />
      <Circle />
    </aside>
  );
};

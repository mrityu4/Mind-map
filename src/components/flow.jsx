import React, { useState, useRef, useCallback, useEffect } from "react";
import "./flow.scss";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "react-flow-renderer";

import Sidebar from "./SideBar";
import saveBtn from "./save.webp";
import restoreBtn from "./restore.svg";

import { Circle, Square, Rectangle, Heading, Text } from "./SideBar/SideBar";

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = {
  Circle: Circle,
  Square: Square,
  Rectangle: Rectangle,
  Heading: Heading,
  Text: Text,
};

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => {
    params.targetHandle = `${+params.targetHandle + 1}`;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const applySize = (nodesData) => {
    nodesData.map((n) => {
      const element = document
        .querySelector(`[data-id="${n.id}"]`)
        ?.querySelector(".dndnode");
      if (element) {
        element.style.width = `${n.width}px`;
        element.style.height = `${n.height}px`;
      }
    });
  };

  const onChange = (event) => {
    const id = event.currentTarget.parentElement.getAttribute("data-id");
    const value = event.target.value;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== id) {
          return node;
        }
        return {
          ...node,
          data: {
            ...node.data,
            value,
          },
        };
      })
    );
  };

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({ nodes, edges })
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        onChange,
        dragHandle: ".dndnode",
        data: { label: `${type} node` },
      };
      if (type === "Text" || type === "Heading") {
        newNode.data.value = "";
        newNode.data.onChange = onChange;
      }
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          defaultZoom={0.5}
          nodeTypes={nodeTypes}
          selectNodesOnDrag={false}
          noDragClassName="selected"
        >
          <div className="save__controls">
            <button type="button" onClick={exportData}>
              <img src={saveBtn} />
            </button>
            <label htmlFor="inputFile">
              <img src={restoreBtn} />
            </label>
            <input
              type="file"
              id="inputFile"
              accept="text/json"
              onChange={(ev) => {
                if (ev.type == "click") ev.preventDefault();
                let importedFile =
                  document.getElementById("inputFile")?.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  const fileContent = JSON.parse(reader.result);
                  setNodes(fileContent.nodes);
                  setEdges(fileContent.edges);
                  id = fileContent?.nodes?.length ?? 0;
                  setTimeout(() => applySize(fileContent.nodes), 100);
                };
                reader.readAsText(importedFile);
              }}
              onClick={(event) => {
                event.target.value = null;
              }}
            />
          </div>
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DnDFlow;

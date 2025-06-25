import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  MarkerType
} from "react-flow-renderer";
import ContextMenu from "./ContextMenu";
import { toast } from 'react-hot-toast';

const FlowCanvas = () => {
  const { project, getNode } = useReactFlow();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const reactFlowWrapper = useRef(null);
  const id = useRef(0);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const block = JSON.parse(data);
      const bounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: `node_${id.current++}`,
        type: "default",
        position,
        data: {
          label: block.label,
        },
        sourcePosition: 'bottom',
        targetPosition: 'top',
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project]
  );

  // Restrict connection logic
  const onConnect = useCallback(
    (params) => {
      const sourceNode = getNode(params.source);
      const targetNode = getNode(params.target);

      const sourceType = sourceNode?.data?.label;
      const targetType = targetNode?.data?.label;

      if (sourceType === "Block A" && targetType === "Block B") {
        setEdges((eds) =>
          addEdge(
            { ...params, animated: true, style: { stroke: "#4ade80", strokeWidth: 4 }, markerEnd: {type: MarkerType.ArrowClosed, color:"#4ade80"}, selectable: true },
            eds
          )
        );
      } else {
        toast.error("Only Block A ➝ Block B connections are allowed.");
      }
    },
    [getNode]
  );


  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
    });
  }, []);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((prevNodes) => {
        const updated = applyNodeChanges(changes, prevNodes);
        setHistory((h) => [...h, { nodes: prevNodes, edges }]);
        setFuture([]); // clear redo stack
        saveToLocalStorage(updated, edges);
        return updated;
      });
    },
    [edges]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((prevEdges) => {
        const updated = applyEdgeChanges(changes, prevEdges);
        setHistory((h) => [...h, { nodes, edges: prevEdges }]);
        setFuture([]);
        saveToLocalStorage(nodes, updated);
        return updated;
      });
    },
    [nodes]
  );

    const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((h) => h.slice(0, h.length - 1));
    setFuture((f) => [{ nodes, edges }, ...f]);
    setNodes(previous.nodes);
    setEdges(previous.edges);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setHistory((h) => [...h, { nodes, edges }]);
    setNodes(next.nodes);
    setEdges(next.edges);
  };

  const saveToLocalStorage = (nodesToSave, edgesToSave) => {
    const flowData = {
      nodes: nodesToSave,
      edges: edgesToSave,
      id: id.current,
    };
    localStorage.setItem("my-flow", JSON.stringify(flowData));
  };

  useEffect(() => {
    try {
      const savedFlow = localStorage.getItem("my-flow");
      if (savedFlow) {
        const flow = JSON.parse(savedFlow);
        if (flow.nodes && flow.edges) {
          setNodes(flow.nodes);
          setEdges(flow.edges);
          id.current = flow.id || 0;
        }
      }
    } catch (err) {
      console.error("Failed to load flow from localStorage", err);
    }
  }, []);


  return (
    <div
      className="h-full w-3/4 border-r border-gray-300 relative"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      ref={reactFlowWrapper}
    >
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        <button
          onClick={handleUndo}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          Redo
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        // edges={styledEdges}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        selectNodesOnDrag={true}
  deleteKeyCode={['Backspace', 'Delete']}
  multiSelectionKeyCode={['Meta', 'Control']}
  onNodesDelete={(deleted) => toast.success(`${deleted.length} node(s) deleted`)}
  onEdgesDelete={(deleted) => toast.success(`${deleted.length} edge(s) deleted`)}
        fitView
      >
        {contextMenu && (
          <ContextMenu
            position={contextMenu}
            onClose={() => setContextMenu(null)}
          />
        )}
        <Background gap={16} size={1.5} color="#aaa" />
        <Controls />
        <MiniMap nodeColor={() => "#10b981"} nodeStrokeWidth={2} />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;

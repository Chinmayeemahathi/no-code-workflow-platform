import React, { useCallback, useState, useMemo } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";

import UserQueryNode from "./nodes/UserQueryNode";
import LLMNode from "./nodes/LLMNode";
import OutputNode from "./nodes/OutputNode";

let id = 0;
const getId = () => `${id++}`;

const nodeTypes = {
  userQuery: UserQueryNode,
  llm: LLMNode,
  output: OutputNode,
};

function FlowEditor() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [executingNodeId, setExecutingNodeId] = useState(null);

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId),
    [nodes, selectedNodeId]
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const isValidConnection = useCallback(
    (connection) => {
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!sourceNode || !targetNode) return false;

      if (sourceNode.type === "userQuery" && targetNode.type === "llm") return true;
      if (sourceNode.type === "llm" && targetNode.type === "output") return true;

      return false;
    },
    [nodes]
  );

  const onConnect = useCallback(
    (params) => {
      if (!isValidConnection(params)) {
        alert("❌ Invalid connection. Use: User Query → LLM → Output");
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [isValidConnection]
  );

  const addNode = (type, label) => {
    const newNode = {
      id: getId(),
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeClick = (_, node) => {
    setSelectedNodeId(node.id);
  };

  const updateNodeData = (id, newData) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...newData } } : n
      )
    );
  };

  // 🔥 Animated execution engine
  const runWorkflow = async () => {
    const userNode = nodes.find((n) => n.type === "userQuery");
    const llmNode = nodes.find((n) => n.type === "llm");
    const outputNode = nodes.find((n) => n.type === "output");

    if (!userNode || !llmNode || !outputNode) {
      alert("❌ Invalid workflow");
      return;
    }

    try {
      setExecutingNodeId(userNode.id);
      await new Promise((r) => setTimeout(r, 600));

      setExecutingNodeId(llmNode.id);
      await new Promise((r) => setTimeout(r, 600));

      const res = await fetch("http://127.0.0.1:8000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await res.json();

      setExecutingNodeId(outputNode.id);
      updateNodeData(outputNode.id, { result: data.result });

      await new Promise((r) => setTimeout(r, 600));
      setExecutingNodeId(null);
    } catch (err) {
      console.error(err);
      alert("❌ Backend error");
      setExecutingNodeId(null);
    }
  };

  const animatedNodes = nodes.map((node) => ({
    ...node,
    style:
      node.id === executingNodeId
        ? { border: "3px solid green", background: "#eaffea" }
        : {},
  }));

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel */}
      <div style={{ width: "20%", borderRight: "1px solid #ccc", padding: "10px" }}>
        <h3>Components</h3>

        <div onClick={() => addNode("userQuery", "User Query")} style={{ cursor: "pointer", marginBottom: 10 }}>
          ➕ User Query
        </div>

        <div onClick={() => addNode("llm", "LLM")} style={{ cursor: "pointer", marginBottom: 10 }}>
          ➕ LLM
        </div>

        <div onClick={() => addNode("output", "Output")} style={{ cursor: "pointer", marginBottom: 10 }}>
          ➕ Output
        </div>

        <hr />
        <button onClick={runWorkflow} style={{ marginTop: 10 }}>
          ▶ Run Workflow
        </button>
      </div>

      {/* Canvas */}
      <div style={{ width: "60%" }}>
        <ReactFlow
          nodes={animatedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Right Panel */}
      <div style={{ width: "20%", borderLeft: "1px solid #ccc", padding: "10px" }}>
        <h3>Configuration</h3>

        {selectedNode ? (
          <div>
            <p>
              <strong>Node:</strong> {selectedNode.data.label}
            </p>

            {selectedNode.type === "userQuery" && (
              <>
                <label>User Query</label>
                <textarea
                  value={selectedNode.data.text || ""}
                  onChange={(e) =>
                    updateNodeData(selectedNode.id, { text: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </>
            )}

            {selectedNode.type === "llm" && (
              <>
                <label>Model</label>
                <select
                  value={selectedNode.data.model || "GPT"}
                  onChange={(e) =>
                    updateNodeData(selectedNode.id, { model: e.target.value })
                  }
                >
                  <option value="GPT">GPT</option>
                  <option value="Gemini">Gemini</option>
                </select>
              </>
            )}

            {selectedNode.type === "output" && (
              <>
                <p>Result:</p>
                <div style={{ background: "#f4f4f4", padding: 10 }}>
                  {selectedNode.data.result || "No output yet"}
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Select a node to configure</p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}





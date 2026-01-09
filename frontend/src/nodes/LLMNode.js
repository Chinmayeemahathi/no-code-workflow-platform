import React from "react";

import { Handle, Position } from "reactflow";

export default function LLMNode({ data }) {
  return (
    <div className="node-box">
      <strong>LLM</strong>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}



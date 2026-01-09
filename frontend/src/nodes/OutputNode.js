import React from "react";
import { Handle, Position } from "reactflow";

export default function OutputNode({ data }) {
  return (
    <div className="node-box">
      <strong>Output</strong>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}




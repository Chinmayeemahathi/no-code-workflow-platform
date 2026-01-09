import React from "react";
import { Handle, Position } from "reactflow";

export default function UserQueryNode({ data }) {
  return (
    <div className="node-box">
      <strong>User Query</strong>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}


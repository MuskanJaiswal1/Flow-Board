import React from 'react';
import { blocksList } from '../data/blocksData';

const BlockPanel = () => {
  const onDragStart = (event, block) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(block));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-1/4 p-4 border-l border-gray-300 bg-gray-100">
      <h3 className="font-bold mb-2">Available Blocks</h3>
      {blocksList.map((block) => (
        <div
          key={block.id}
          onDragStart={(e) => onDragStart(e, block)}
          draggable
          className="p-2 mb-2 border bg-white rounded shadow cursor-move"
        >
          {block.label}
        </div>
      ))}
    </div>
  );
};

export default BlockPanel;
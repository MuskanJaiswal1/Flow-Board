// App.jsx
import React from 'react';
import BlockPanel from './components/BlockPanel';
import FlowCanvas from './components/FlowCanvas';
import { ReactFlowProvider } from 'react-flow-renderer';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <ReactFlowProvider>
      <Toaster position="top-right" />
      <div className="flex h-screen">
        <FlowCanvas />
        <BlockPanel />
      </div>
    </ReactFlowProvider>
  );
};

export default App;

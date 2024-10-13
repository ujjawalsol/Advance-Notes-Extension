import React from 'react';
import MonacoEditor  from '@monaco-editor/react';


const CodeStorage = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Code Storage Editor</h3>
      <MonacoEditor
        height="400px"
        language="javascript"
        theme="vs-dark"
        defaultValue="// Start coding..."
      />
    </div>  
  );
};


export default CodeStorage;
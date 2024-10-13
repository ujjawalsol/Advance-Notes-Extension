import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useState } from 'react';

const BlankPage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Blank Page Editor</h3>
      <div className="border p-4 min-h-[200px]">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
};


export default BlankPage;   
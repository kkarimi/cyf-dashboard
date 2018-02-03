import React from "react";

import { Input } from "reactstrap";

var divStyle = {
  width: "100%",
  height: "500px",
  maxHeight: "500px",
  border: "1px solid black"
};

const EmailEditor = ({ editorState, onChange }) => {
  return (
    <div>
      <div className="editorContainer">
        <Input
          type="textarea"
          onChange={onChange}
          name="text"
          id="exampleText"
          maxLength="1000"
          value={editorState}
          style={divStyle}
        />

        {/* <Editor
        editorState={editorState}
        placeholder="Enter some text..."
        onChange={onChange}
        style={{
          maxHeight: "inherit",
          overflow: "auto"
        }}
      /> */}
      </div>
    </div>
  );
};

export default EmailEditor;

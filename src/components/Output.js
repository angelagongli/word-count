import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
 
const stackTokens = {
  childrenGap: 4,
  maxWidth: "100%",
};

function Output(props) {
  return (
    <div className="ms-depth-64 tile">
      <h5>Essay word count</h5>
      <div>
        <Stack horizontal verticalAlign="center" tokens={stackTokens}>
          <Label>Essay name:</Label>
          <span>{props.nickname}</span>
        </Stack>
        <Stack horizontal verticalAlign="center" tokens={stackTokens}>
          <Label>File name:</Label>
          <span>{props.file.name}</span>
        </Stack>
        <Stack horizontal verticalAlign="center" tokens={stackTokens}>
          <Label>Upload time:</Label>
          <span>{props.timestamp}</span>
        </Stack>
        <Stack horizontal verticalAlign="center" tokens={stackTokens}>
          <Label>Word count:</Label>
          <span>{props.wordCount}</span>
        </Stack>
        <Stack horizontal verticalAlign="center" tokens={stackTokens}>
          <Label>Text from .PDF:</Label>
          <span>
            {props.isParsing ? <Spinner label="Parsing..." /> : ""}
          </span>
        </Stack>
        {props.parsedPDF === "" ? "" : <div className="parsed">{props.parsedPDF}</div>}
      </div>
    </div>
  );
};

export default Output;

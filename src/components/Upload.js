import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PrimaryButton } from 'office-ui-fabric-react';

const columnProps = {
    tokens: { childrenGap: 10 },
    styles: { root: { width: "100%" } },
};

const iconProps = { iconName: 'PDF' };

function Upload(props) {
    const [nickname, setNickname] = React.useState("");
    const [file, setFile] = React.useState(undefined);
    const [filePath, setFilePath] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleInputChange = (event) => {
        setNickname(event.target.value);
    };

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
        setFilePath(event.target.value);
    }

    function uploadPDF() {
        if (nickname && file) {
            if (errorMessage) {
                setErrorMessage("");
            }
            props.updateUpload(file, filePath, nickname);
        } else if (!nickname) {
            setErrorMessage("Please nickname your essay.");
        }
    }

    return (
        <div className="ms-depth-64 tile">
            <h5>Upload your essay</h5>
            <form>
                <Stack {...columnProps}>
                    <TextField 
                        name="nickname"
                        value={nickname}
                        onChange={handleInputChange}
                        label="Essay nickname"
                        placeholder="e.g. Liberal arts college essay version 1.0"
                        iconProps={iconProps}
                        required
                        errorMessage={errorMessage}
                    />
                    <Label htmlFor="upload" required>Upload your essay as .PDF file:</Label>
                    <input type="file" accept=".pdf" id="upload" name="upload" onChange={handleFileSelect} />
                </Stack>
                <br />
                <PrimaryButton text="Upload .PDF" onClick={uploadPDF} />
            </form>
        </div>
    );
};

export default Upload;

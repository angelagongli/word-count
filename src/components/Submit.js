import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { useConstCallback } from '@uifabric/react-hooks';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const columnProps = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: "100%" } },
};

const dropdownStyles = { dropdown: { width: "100%" } };

const stackTokens = {
    childrenGap: 4,
    maxWidth: 300,
};

const iconProps = { iconName: 'Info' };
const iconButtonStyles = { root: { marginBottom: -3 } };

const promptOptions = [
    { key: '1', text: 'Prompt 1' },
    { key: '2', text: 'Prompt 2' },
    { key: '3', text: 'Prompt 3' },
    { key: '4', text: 'Prompt 4' },
    { key: '5', text: 'Prompt 5' },
    { key: '6', text: 'Prompt 6' },
    { key: '7', text: 'Prompt 7' }
];

const prompts = [
    "Some students have a background, identity, interest, or talent so meaningful they believe their application would be incomplete without it. If this sounds like you, please share your story.",
    "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
    "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?",
    "Describe a problem you’ve solved or a problem you’d like to solve. It can be an intellectual challenge, a research query, an ethical dilemma — anything of personal importance, no matter the scale. Explain its significance to you and what steps you took or could be taken to identify a solution.",
    "Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.",
    "Describe a topic, idea, or concept you find so engaging it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?",
    "Share an essay on any topic of your choice. It can be one you’ve already written, one that responds to a different prompt, or one of your own design."
];

const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    height: '80vh',
    position: 'relative',
    maxHeight: 'inherit',
  },
  pane: {
    maxWidth: "99%",
    border: '1px solid ' + theme.palette.neutralLight,
  },
  sticky: {
    color: theme.palette.neutralDark,
    padding: '5px 20px 5px 10px',
    fontSize: '13px',
    borderTop: '1px solid ' + theme.palette.black,
    borderBottom: '1px solid ' + theme.palette.black,
  },
  textContent: {
    padding: '15px 10px',
  },
});
const scrollablePaneStyles = { root: classNames.pane };
const colors = ['#eff6fc', '#deecf9', '#eaeaea', '#dadada', '#c8c8c8', '#c7e0f4', '#71afe5'];
const items = Array.from({ length: 7 }).map((item, index) => ({
    color: colors[index],
    text: prompts[index],
    index
}));

function Submit() {
    const dropdownRef = React.createRef();
    const [isOpen, setIsOpen] = React.useState(false);
    const openPanel = useConstCallback(() => setIsOpen(true));
    const dismissPanel = useConstCallback(() => setIsOpen(false));

    const CustomLabel = (props) => {
        return (
            <Stack horizontal verticalAlign="center" tokens={stackTokens}>
                <Label id={props.id}>{props.label}</Label>
                <IconButton
                    id="iconButton"
                    iconProps={iconProps}
                    title="Info"
                    ariaLabel="Info"
                    onClick={props.openPanel}
                    styles={iconButtonStyles}
                />
            </Stack>
        );
    };

    const onRenderLabel = (props) => <CustomLabel id="prompt" openPanel={openPanel} {...props} />

    const createContentArea = (item) => (
        <div
            key={item.index}
            style={{
                backgroundColor: item.color,
            }}
        >
            <Sticky stickyPosition={StickyPositionType.Both}>
                <div className={classNames.sticky}>Prompt {item.index + 1}</div>
            </Sticky>
            <div className={classNames.textContent}>{item.text}</div>
        </div>
      );

    const contentAreas = items.map(createContentArea);
      
    function submitEssay() {
        //@TODO
    }

    return (        
        <div className="ms-depth-64 tile">
            <h5><span className="todo">@TODO</span> Submit your essay</h5>
            <Stack {...columnProps}>
                <TextField label="Name" required />
                <TextField label="Email address" description="Use the email address associated with your Common App account" required />
                <Dropdown
                    componentRef={dropdownRef}
                    placeholder="Select an institution"
                    label="Institution to which you are applying"
                    options={[
                        { key: 'UT', text: 'The University of Texas at Austin' },
                        { key: 'A&M', text: 'Texas A&M University' }
                    ]}
                    required
                    styles={dropdownStyles}
                />
                <TextField label="Program of study" description="Note that your choice of program may impact your admissions essay requirements" />
                <Dropdown
                    componentRef={dropdownRef}
                    placeholder="Select an option"
                    label="Your chosen prompt"
                    onRenderLabel={onRenderLabel}
                    defaultSelectedKey="1"
                    options={promptOptions}
                    required
                    styles={dropdownStyles}
                />
                <Label htmlFor="upload">Upload your essay as .PDF file:</Label>
                <input type="file" accept=".pdf" id="upload" name="upload" />
            </Stack>
            <br />
            <PrimaryButton text="Submit Essay" onClick={submitEssay} />
            <Panel
                isLightDismiss
                isOpen={isOpen}
                onDismiss={dismissPanel}
                closeButtonAriaLabel="Close"
                headerText="First-year essay prompts"
            >
                <p>Common App has announced that the <a href="https://www.commonapp.org/apply/essay-prompts" target="_blank" rel="noopener noreferral">2020-2021 essay prompts</a> will remain the same as the 2019–2020 essay prompts.</p>
                <div className={classNames.wrapper}>
                    <ScrollablePane styles={scrollablePaneStyles}>{contentAreas}</ScrollablePane>
                </div>
            </Panel>
        </div>
    );
};

export default Submit;

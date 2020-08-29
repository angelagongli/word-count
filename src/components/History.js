import * as React from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();
const { palette, semanticColors, fonts } = theme;
const classNames = mergeStyleSets({
  container: {
    overflow: 'auto',
    maxHeight: "50%",
  },
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  }
});

const stackTokens = {
  childrenGap: 4,
  maxWidth: "100%",
};

function History(props) {
  const items = JSON.parse(props.history);

  const onRenderCell = (item, index) => {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <div className={classNames.itemContent}>
          <div className={classNames.itemIndex}>
            {`Upload ${index + 1}: ${item.timestamp}`}
          </div>
          <div className={classNames.itemName}>{item.nickname}</div>
          <Stack horizontal verticalAlign="center" tokens={stackTokens}>
            <Label>File name:</Label>
            <span>{item.fileName}</span>
          </Stack>
          <Stack horizontal verticalAlign="center" tokens={stackTokens}>
            <Label>Word count:</Label>
            <span>{item.wordCount}</span>
          </Stack>
        </div>
      </div>
    );
  };
  
  return (
    <div className="ms-depth-64 tile">
      <h5>Your essay uploads</h5>
      {(items === null) ? <p>No uploads yet</p> :
      <FocusZone direction={FocusZoneDirection.vertical}>
        <div className={classNames.container} data-is-scrollable>
          <List items={items} onRenderCell={onRenderCell} />
        </div>
      </FocusZone>}
    </div>
  );
};

export default History;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Skill from './Skill';

type Props = {
  title: string;
  items: string[];
  onSelect: (name: string, level: string) => void;
  onRemove: (name: string) => void;
  maxHeight?: string;
};

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panelDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxHeight: '350px',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
}));

export default function SkillBox({
  title,
  items,
  onSelect,
  onRemove,
  maxHeight,
}: Props) {
  const classes = useStyles();

  return (
    <ExpansionPanel expanded>
      <ExpansionPanelSummary>
        <Typography className={classes.heading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        className={classes.panelDetails}
        style={{ maxHeight: `${maxHeight}` }}
      >
        {items.map(item => (
          <ListItem key={`${title}-${item}`} className={classes.item}>
            <Skill name={item} onSelect={onSelect} onRemove={onRemove} />
          </ListItem>
        ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

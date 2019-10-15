import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

const EXPERIENCE = ['junior', 'pleno', 'senior', 'expert'];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
    },
    skillName: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'left',
      fontSize: '1.5em',
      cursor: 'pointer',
      padding: theme.spacing(1),
    },
    buttons: {
      display: 'flex',
      flexGrow: 1,
    },
    level: {
      flexGrow: 1,
    },
    chosenLevel: {
      textTransform: 'capitalize',
      fontWeight: 'bold',
      flexGrow: 0,
    },
  })
);

type Props = {
  name: string;
  onSelect: (name: string, level: string) => void;
  onRemove: (name: string) => void;
};

type State = { active: boolean; level: string };

export default function Skill({ name, onSelect, onRemove }: Props) {
  const classes = useStyles();
  const [{ active, level }, setState] = useState<State>({
    active: false,
    level: '',
  });

  const handleClick = () => {
    setState(state => ({ ...state, active: true }));
  };

  const handleSelectSkill = (level: string) => {
    setState({ level, active: false });
    onSelect(name, level);
  };

  const handleRemoveSkill = () => {
    setState({ level: '', active: false });
    onRemove(name);
  };

  return (
    <Grid container className={classes.root}>
      {!active && (
        <Grid item className={classes.skillName} onClick={() => handleClick()}>
          <Typography className={classes.level}>{name}</Typography>
          {level && (
            <Typography className={classes.chosenLevel}>{level}</Typography>
          )}
        </Grid>
      )}
      {active && (
        <Grid item className={classes.buttons}>
          <ButtonGroup
            fullWidth
            color="default"
            variant="contained"
            size="medium"
            aria-label="medium contained button group"
          >
            {EXPERIENCE.map(level => (
              <Button key={level} onClick={() => handleSelectSkill(level)}>
                {level}
              </Button>
            ))}
            <Button key="cancel" onClick={handleRemoveSkill}>
              <CancelIcon color="error" />
            </Button>
          </ButtonGroup>
        </Grid>
      )}
    </Grid>
  );
}

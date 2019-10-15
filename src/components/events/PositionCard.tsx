import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';

import { Position, Skill } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '100%',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  skillRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    fontSize: 16,
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  skillName: {
    flexGrow: 1,
  },
  skillValue: {
    fontWeight: 'bold',
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

function SkillDescriptor({ name, level }: Skill) {
  const classes = useStyles();
  return (
    <Grid container className={classes.skillRow}>
      <Grid item className={classes.skillName}>
        {name}
      </Grid>
      <Grid item className={classes.skillValue}>
        {level}
      </Grid>
    </Grid>
  );
}

export default function PositionCard({
  name,
  description,
  company,
  location,
  experience,
  education,
  skills,
}: Position) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          <span role="img" aria-label="pin">
            📍{company} - {location}
          </span>
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {description}
        </Typography>
        <div>
          <SkillDescriptor key="formacao" name="Formação" level={education} />
          <SkillDescriptor
            key="experiencia"
            name="Experiência"
            level={experience}
          />
          <Divider />
          {skills.map(({ name, level }) => (
            <SkillDescriptor key={name} name={name} level={level} />
          ))}
        </div>
        <Divider />
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant="contained" color="secondary" size="large">
          <span role="img" aria-label="nope">
            👎Nope
          </span>
        </Button>
        <Button variant="contained" color="primary" size="large">
          <span role="img" aria-label="te quiero">
            😍Te Quiero!
          </span>
        </Button>
      </CardActions>
    </Card>
  );
}

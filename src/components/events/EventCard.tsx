import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fromUnixTime, format } from 'date-fns';

const useStyles = makeStyles({
  card: {
    width: '100%',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type Props = {
  id: string;
  name: string;
  description: string;
  venue: string;
  date: string;
  showOpenButton?: boolean;
};
export default function EventCard({
  id,
  name,
  description,
  venue,
  date,
  showOpenButton = false,
}: Props) {
  const classes = useStyles();
  const history = useHistory();

  const open = () => {
    history.push(`/event/${id}`);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <span role="img" aria-label="calendar">
            🗓
          </span>
          {format(fromUnixTime(parseInt(date, 10)), 'dd/MM/yyyy')}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <span role="img" aria-label="pin">
            📍
          </span>
          {venue}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {showOpenButton && (
          <Button size="small" onClick={open}>
            Abrir Evento
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

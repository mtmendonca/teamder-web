import React, { useState } from 'react';
import { getUnixTime } from 'date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Grid, Button } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import EventCard from '../components/events/EventCard';
import EventForm from '../components/events/EventForm';
import Loading from '../components/Loading';
import useEvents from '../graphql/queries/useEvents';
import useCreateEvent from '../graphql/mutations/useCreateEvent';
import { EventFormProps } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    inline: {
      display: 'inline',
    },
    header: {
      width: '100%',
      display: 'flex',
      '& h1': {
        flexGrow: 1,
      },
      '& div': {
        display: 'flex',
        flexGrow: 0,
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 680,
    },
  })
);

export default function Events() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading, error, refetch } = useEvents();
  const [createEvent] = useCreateEvent();

  const handleSubmit = (input: EventFormProps) => {
    return createEvent({
      variables: {
        input: {
          ...input,
          date: String(getUnixTime(input.date || new Date())),
        },
      },
    }).then(() => refetch());
  };

  return (
    <>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item className={classes.header}>
          <h1>Próximos eventos</h1>
          <div>
            <Button color="primary" onClick={() => setModalOpen(true)}>
              <Add />
              Criar Evento
            </Button>
          </div>
        </Grid>
      </Grid>

      <EventForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {loading && <Loading />}
      {error && `Whoopsie... ${error}`}
      {!loading && !error && data && data.events.length === 0 && (
        <h3>Não existem eventos cadastrados</h3>
      )}
      {!loading && !error && data && (
        <List className={classes.root}>
          {data.events.map(event => (
            <ListItem key={event.id} alignItems="center">
              <EventCard {...event} showOpenButton />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

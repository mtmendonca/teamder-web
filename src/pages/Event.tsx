import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button, Paper } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import Loading from '../components/Loading';
import useEvent from '../graphql/queries/useEvent';
import EventCard from '../components/events/EventCard';
import PositionCard from '../components/events/PositionCard';
import PositionForm from '../components/events/PositionForm';
import { PositionFormProps } from '../types';
import useCreatePosition from '../graphql/mutations/useCreatePosition';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      width: '100%',
      display: 'flex',
      '& h2': {
        flexGrow: 1,
      },
      '& div': {
        display: 'flex',
        flexGrow: 0,
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    positionCard: {
      margin: theme.spacing(2, 0),
    },
  })
);

export default function Event() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createPosition] = useCreatePosition();
  const { id = '' } = useParams();
  const classes = useStyles();

  const { loading, error, data, refetch } = useEvent(id);

  const handleSubmit = (data: PositionFormProps) => {
    const { skills: items } = data;
    const skills = Object.keys(items).map(key => ({
      name: key,
      level: items[key],
    }));

    const input = {
      ...data,
      skills,
    };

    createPosition({ variables: { input, eventID: id } }).then(() => refetch());
  };

  return (
    <>
      {error && `Whoopsie ${error}`}
      {loading && <Loading />}
      {!loading && !error && data && (
        <>
          <h1>Evento</h1>
          <EventCard {...data.event} />
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item className={classes.header}>
              <h2>Vagas Anunciadas</h2>
              <div>
                <Button color="primary" onClick={() => setModalOpen(true)}>
                  <Add />
                  Criar Anúncio
                </Button>
              </div>
            </Grid>
          </Grid>
          <PositionForm
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
          />
          {data.event.positions.map((pos, i) => (
            <Paper key={i} className={classes.positionCard}>
              <PositionCard {...pos} />
            </Paper>
          ))}
        </>
      )}
    </>
  );
}

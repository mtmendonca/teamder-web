import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  MaterialUiPickersDate,
} from '@material-ui/pickers';

import { EventFormProps } from '../../types';
import { Grid, Button } from '@material-ui/core';
import AlertDialog from '../AlertDialog';

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
      flexDirection: 'column',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 680,
    },
    buttonRow: {
      marginTop: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(0, 1),
    },
  })
);

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormProps) => void;
};

export default function EventForm({ open, onClose, onSubmit }: Props) {
  const classes = useStyles();
  const [formState, setFormState] = useState<EventFormProps>({
    name: '',
    description: '',
    venue: '',
    date: null,
  });
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleFormChange = (input: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target) {
      const value = e.target.value;
      setFormState(state => ({
        ...state,
        [input]: value,
      }));
    }
  };

  const handleDateChange = (
    date: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    setFormState(state => ({
      ...state,
      date,
    }));
  };

  const handleClose = () => {
    setFormState({ name: '', description: '', date: null, venue: '' });
    onClose();
  };

  const handleSave = () => {
    const filled = Object.values(formState).filter(n => !!n).length;

    if (filled !== 4) {
      setErrorDialogOpen(true);
    } else {
      onSubmit({ ...formState });
      handleClose();
    }
  };

  return (
    <>
      <AlertDialog
        title="Formulário incompleto"
        message="Por favor preencha todos itens no formulario"
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Novo Evento</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <form className={classes.form} noValidate autoComplete="off">
                <KeyboardDatePicker
                  className={classes.textField}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Data"
                  value={formState.date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <TextField
                  label="Nome"
                  className={classes.textField}
                  value={formState.name}
                  onChange={handleFormChange('name')}
                  margin="normal"
                />
                <TextField
                  label="Descrição"
                  className={classes.textField}
                  value={formState.description}
                  onChange={handleFormChange('description')}
                  margin="normal"
                />
                <TextField
                  label="Local"
                  className={classes.textField}
                  value={formState.venue}
                  onChange={handleFormChange('venue')}
                  margin="normal"
                />
                <Grid
                  container
                  className={classes.buttonRow}
                  direction="row"
                  justify="flex-end"
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClose}
                      className={classes.button}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      className={classes.button}
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </MuiPickersUtilsProvider>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

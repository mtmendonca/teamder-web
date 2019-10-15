import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid, Button } from '@material-ui/core';

import SkillBox from '../settings/SkillBox';
import { PositionFormProps } from '../../types';
import { ROLES, TECHNOLOGIES, EXPERIENCE, EDUCATION } from '../../constants';
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
      maxHeight: '90vh',
      overflow: 'scroll',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    buttonRow: {
      marginTop: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(0, 1),
    },
    inputWrapper: {
      margin: theme.spacing(1),
      width: '100%',
    },
  })
);

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PositionFormProps) => void;
};

export default function PositionForm({ open, onClose, onSubmit }: Props) {
  const classes = useStyles();
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [formState, setFormState] = useState<PositionFormProps>({
    name: '',
    company: '',
    location: '',
    description: '',
    experience: '',
    education: '',
    skills: {},
  });

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

  const handleClose = () => {
    setFormState({
      name: '',
      company: '',
      location: '',
      description: '',
      experience: '',
      education: '',
      skills: {},
    });
    onClose();
  };

  const handleSelectChange = (name: string) => (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setFormState(state => ({
      ...state,
      [name]: String(event.target.value),
    }));
  };

  const handleSelectSkill = (name: string, level: string) => {
    setFormState(state => ({
      ...state,
      skills: {
        ...state.skills,
        [name]: level,
      },
    }));
  };

  const handleRemoveSkill = (name: string) => {
    const { skills } = formState;
    delete skills[name];
    setFormState(state => ({
      ...state,
      skills,
    }));
  };

  const handleSave = () => {
    const { skills, ...rest } = formState;
    const filled = Object.values(rest).filter(n => !!n).length;

    if (filled !== 6) {
      setErrorDialogOpen(true);
      return;
    }

    onSubmit({ ...formState });
    handleClose();
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
            <h2 id="transition-modal-title">Novo Anúncio</h2>
            <form className={classes.form} noValidate autoComplete="off">
              <Grid container>
                <Grid item sm={12} md={6}>
                  <FormControl className={classes.inputWrapper}>
                    <InputLabel htmlFor="cargo">Cargo</InputLabel>
                    <Select
                      value={formState.name}
                      onChange={handleSelectChange('name')}
                    >
                      {ROLES.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField
                    label="Descrição"
                    className={classes.inputWrapper}
                    value={formState.description}
                    onChange={handleFormChange('description')}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sm={12} md={6}>
                  <FormControl className={classes.inputWrapper}>
                    <InputLabel htmlFor="formacao">Formação</InputLabel>
                    <Select
                      value={formState.education}
                      onChange={handleSelectChange('education')}
                    >
                      {EDUCATION.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={12} md={6}>
                  <FormControl className={classes.inputWrapper}>
                    <InputLabel htmlFor="experiencia">Experiência</InputLabel>
                    <Select
                      value={formState.experience}
                      onChange={handleSelectChange('experience')}
                    >
                      {EXPERIENCE.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sm={12} md={6}>
                  <TextField
                    label="Empresa"
                    className={classes.inputWrapper}
                    value={formState.company}
                    onChange={handleFormChange('company')}
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField
                    label="Local"
                    className={classes.inputWrapper}
                    value={formState.location}
                    onChange={handleFormChange('location')}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <SkillBox
                title="Tecnologias"
                items={TECHNOLOGIES}
                onSelect={handleSelectSkill}
                onRemove={handleRemoveSkill}
                maxHeight="200px"
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
          </div>
        </Fade>
      </Modal>
    </>
  );
}

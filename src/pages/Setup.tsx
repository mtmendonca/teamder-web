import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SkillBox from '../components/settings/SkillBox';
import useSetProfile from '../graphql/mutations/useSetProfile';
import { KVList } from '../types';
import { ROLES, TECHNOLOGIES, EXPERIENCE, EDUCATION } from '../constants';

interface Handler {
  onSelect: (name: string, level: string) => void;
  onRemove: (name: string) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  actionRow: {
    paddingBottom: theme.spacing(10),
  },
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
  formControl: {
    width: '100%',
    margin: theme.spacing(1, 0),
  },
}));

type Props = RouteComponentProps;
type State = {
  education: string;
  experience: string;
  role: string;
  skills: KVList;
};

export default function Setup({ history }: Props) {
  const classes = useStyles();

  const [setProfile] = useSetProfile();

  const [state, setState] = useState<State>({
    education: '',
    experience: '',
    role: '',
    skills: {},
  });

  const handleSelectChange = (name: string) => (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setState(state => ({
      ...state,
      [name]: String(event.target.value),
    }));
  };

  const handleSelect = (name: string, level: string) => {
    setState(state => ({
      ...state,
      skills: {
        ...state.skills,
        [name]: level,
      },
    }));
  };

  const handleRemove = (name: string) => {
    const { skills } = state;
    delete skills[name];
    setState(state => ({
      ...state,
      skills,
    }));
  };

  const submit = () => {
    const { skills: items } = state;
    const skills = Object.keys(items).map(key => ({
      name: key,
      level: items[key],
    }));

    const input = {
      ...state,
      skills,
    };

    setProfile({ variables: { input } })
      .then(() => {
        history.push('/');
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <h1>Preencha seu perfil para continuar</h1>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="formacao">Formação</InputLabel>
        <Select
          value={state.education}
          onChange={handleSelectChange('education')}
        >
          {EDUCATION.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="experiencia">Experiência</InputLabel>
        <Select
          value={state.experience}
          onChange={handleSelectChange('experience')}
        >
          {EXPERIENCE.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="cargo">Cargo</InputLabel>
        <Select value={state.role} onChange={handleSelectChange('role')}>
          {ROLES.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <SkillBox
        title="Tecnologias"
        items={TECHNOLOGIES}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
      <Grid
        container
        justify="flex-end"
        direction="row"
        className={classes.actionRow}
      >
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => submit()}>
            Salvar perfil
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

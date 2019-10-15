import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { AuthenticatedUserContext } from '../types';
import { Button, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

type LoginProps = {
  setAuthContext: (context: AuthenticatedUserContext) => void;
};

type LoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

function isGoogleLoginResponseOffline(
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): response is GoogleLoginResponseOffline {
  return (response as GoogleLoginResponseOffline).code !== undefined;
}

export default function Login({ setAuthContext }: LoginProps) {
  const classes = useStyles();
  const [error, setError] = useState<string>();

  const handleSuccess = async (response: LoginResponse) => {
    if (process.env.REACT_APP_USE_MOCKS) {
      setAuthContext({ token: 'mock-token' });
      return;
    }
    if (!isGoogleLoginResponseOffline(response)) {
      const profile = response.getBasicProfile();
      const { id_token } = response.getAuthResponse();
      try {
        const teamderLoginResponse = await fetch(
          'http://localhost:3000/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: id_token,
              name: profile.getName(),
              email: profile.getEmail(),
              avatar: profile.getImageUrl(),
              provider: 'google',
            }),
          }
        );

        if (teamderLoginResponse.status === 200) {
          const { data } = await teamderLoginResponse.json();
          setAuthContext({ token: data });
        } else {
          setError(teamderLoginResponse.statusText);
        }
      } catch (e) {
        setError(`${e}`);
      }
    }
  };

  const handleFailure = () => {
    setError('Could not log you in. Please try again later.');
  };

  const logInAnnonymously = () => {
    localStorage.setItem('token', 'mock-token');
    window.location.reload();
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <GoogleLogin
            clientId="199204435434-19f06aihu94nhtn8pdh4nbbr1m58ugr6.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <Divider variant="fullWidth" className={classes.divider} />
          <Button
            onClick={logInAnnonymously}
            size="large"
            color="primary"
            variant="contained"
          >
            Login anônimo
          </Button>
          {error && <h3>{error}</h3>}
        </div>
      </Grid>
    </Grid>
  );
}

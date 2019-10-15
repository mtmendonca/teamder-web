import React from 'react';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
  },
}));

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  const classes = useStyles();

  return (
    <Box>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <a href="/" className={classes.link}>
            Teamder
          </a>
        </Typography>
      </Toolbar>
      {children}
    </Box>
  );
}

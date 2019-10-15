import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import CssBaseline from '@material-ui/core/CssBaseline';

const ThemeDecorator = storyFn => (
  <div>
    <CssBaseline />
    {storyFn()}
  </div>
);

addDecorator(muiTheme());
addDecorator(ThemeDecorator);
configure(require.context('../src', true, /\.stories\.tsx?$/), module);

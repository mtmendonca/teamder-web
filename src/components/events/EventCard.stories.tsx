import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
// @ts-ignore
import { muiTheme } from 'storybook-addon-material-ui';

import EventCard from './EventCard';

const stories = storiesOf('EventCard', module).addDecorator(muiTheme());

stories
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Event Card', () => (
    <EventCard
      id="gdg"
      name="GDG 2019"
      venue="UniAlfa"
      date={String(Date.now())}
      description="Evento google em goiania com várias paleastras"
      showOpenButton
    />
  ));

import * as React from 'react';
import { storiesOf } from '@storybook/react';
// @ts-ignore
import { muiTheme } from 'storybook-addon-material-ui';

import PositionCard from './PositionCard';

const stories = storiesOf('EventCard', module).addDecorator(muiTheme());

const props = {
  id: 'id-1',
  name: 'Full-stack engineer',
  description:
    'engage with clients and internal stakeholders to develop bespoke solution in the education business',
  company: 'globo.com',
  location: 'Rio de janeiro',
  experience: '1-3 years',
  education: 'Graduate Degree',
  skills: [
    {
      name: 'php',
      level: 'junior',
    },
    {
      name: 'mysql',
      level: 'pleno',
    },
    {
      name: 'linux',
      level: 'senior',
    },
  ],
};

stories.add('Position Card', () => <PositionCard {...props} />);

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Event } from '../../types';

const GQL = gql`
  query events {
    events {
      id
      name
      description
      venue
      date
    }
  }
`;

export default () => useQuery<{ events: Event[] }>(GQL);

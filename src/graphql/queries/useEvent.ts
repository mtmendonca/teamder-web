import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Event } from '../../types';

const GQL = gql`
  query event($id: String!) {
    event(id: $id) {
      id
      name
      description
      venue
      date
      positions {
        name
        company
        location
        description
        experience
        education
        skills {
          name
          level
        }
      }
    }
  }
`;

export default (id: string | undefined) =>
  useQuery<{ event: Event }>(GQL, {
    variables: { id },
  });

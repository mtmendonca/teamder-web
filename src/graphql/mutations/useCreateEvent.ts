import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Event } from '../../types';

type CreateEventInput = {
  name: string;
  description: string;
  venue: string;
  date: string;
};

const GQL = gql`
  mutation createEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      name
      description
      venue
      date
    }
  }
`;

export default () =>
  useMutation<{ createEvent: Event }, { input: CreateEventInput }>(GQL);

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Skill, Position } from '../../types';

export type Input = {
  name: string;
  company: string;
  location: string;
  description: string;
  experience: string;
  education: string;
  skills: Skill[];
};

const GQL = gql`
  mutation createPosition($input: CreatePositionInput!, $eventID: String!) {
    createPosition(input: $input, eventID: $eventID)
  }
`;

export default () =>
  useMutation<
    { createPosition: Position },
    {
      input: Input;
      eventID: string;
    }
  >(GQL);

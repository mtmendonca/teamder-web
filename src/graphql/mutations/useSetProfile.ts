import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Skill } from '../../types';

const GQL = gql`
  mutation setSkills($input: SetProfileInput!) {
    setProfile(input: $input)
  }
`;

export default () =>
  useMutation<
    { setProfile: boolean },
    {
      input: {
        education: string;
        experience: string;
        role: string;
        skills: Skill[];
      };
    }
  >(GQL);

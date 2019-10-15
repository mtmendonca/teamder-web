import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import mocks from './mocks';

const resolvers = {};

const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    name: String!
    email: String!
    avatar: String!
    profile: Profile!
  }

  type Profile {
    experience: String!
    education: String!
    role: String!
    skills: [Skill]!
  }

  type Skill {
    name: String!
    level: String!
  }

  type Event {
    id: String!
    name: String!
    description: String!
    venue: String!
    date: String!
    positions: [Position]!
  }

  input SkillInput {
    name: String!
    level: String!
  }

  input SetProfileInput {
    experience: String!
    education: String!
    role: String!
    skills: [SkillInput]!
  }

  input CreateEventInput {
    name: String!
    description: String!
    venue: String!
    date: String!
  }

  type Position {
    name: String!
    company: String!
    location: String!
    description: String!
    experience: String!
    education: String!
    skills: [Skill]!
  }

  input CreatePositionInput {
    name: String!
    company: String!
    location: String!
    description: String!
    experience: String!
    education: String!
    skills: [SkillInput]!
  }

  type Mutation {
    setProfile(input: SetProfileInput!): Boolean!
    createEvent(input: CreateEventInput!): Event!
    createPosition(input: CreatePositionInput!, eventID: String!): Boolean!
  }

  type Query {
    events: [Event]!
    event(id: String!): Event!
  }
`;

export default (): GraphQLSchema => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  if (process.env.REACT_APP_USE_MOCKS) {
    addMockFunctionsToSchema({ schema, mocks });
  }
  return schema;
};

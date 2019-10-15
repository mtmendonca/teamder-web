import React, { useContext } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { SchemaLink } from 'apollo-link-schema';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthenticatedUserContext } from '../types';
import { context as AuthContext } from './Auth';
import getSchema from '../graphql/schema';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

type Props = {
  children: React.ReactNode;
};

function getClient(authContext?: AuthenticatedUserContext) {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization:
        authContext && authContext.token ? `Bearer ${authContext.token}` : '',
    },
  }));

  return new ApolloClient({
    link: process.env.REACT_APP_USE_MOCKS
      ? new SchemaLink({ schema: getSchema() })
      : authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export default function ApolloClientProvider({ children }: Props) {
  const { context } = useContext(AuthContext);

  return (
    <ApolloProvider client={getClient(context)}>{children}</ApolloProvider>
  );
}

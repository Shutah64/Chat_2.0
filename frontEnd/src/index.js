
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'https://chat-app-30.herokuapp.com/graphql'
});
const wsLink = new WebSocketLink({
  uri: 'wss://chat-app-30.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
});
console.log(wsLink, "wss://chat-app-30.herokuapp.com/graphql")
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
render(
  <ApolloProvider client={client}>
  <App/>
  </ApolloProvider>,

  document.getElementById('root'),
  );

  export {client}
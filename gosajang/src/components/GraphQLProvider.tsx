import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
// import useMount from './useMount';
import React, {createContext, useContext, useRef} from 'react';
import StorageContext from './StorageContext';
import AsyncStorage from '@react-native-community/async-storage';

export const GraphQLContext = createContext<{
  client: ApolloClient<NormalizedCacheObject>;
}>({client: {}});

const GraphQLProvider = (props: {children: React.ReactNode}) => {
  const httpLink = createHttpLink({
    uri: `${$config.BACKEND_ENDPOINT}/query`,
  });
  const {store} = useContext(StorageContext);
  const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const storeString = await AsyncStorage.getItem('store');
    let token;
    if (storeString) {
      token = JSON.parse(storeString).token;
    }
    console.log('link module token', storeString);
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    } else {
      return headers;
    }
  });

  const client = useRef(
    new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    }),
  );

  // useEffect(() => {
  //   console.log("store changed", store)
  //   client.current = new ApolloClient({
  //     link: authLink.concat(httpLink),
  //     cache: new InMemoryCache(),
  //   });
  // }, [authLink, httpLink, store]);
  console.log('GraphQL render triggered', store);

  return (
    <GraphQLContext.Provider value={{client: client.current}}>
      <ApolloProvider client={client.current}>{props.children}</ApolloProvider>
    </GraphQLContext.Provider>
  );
};

export default GraphQLProvider;

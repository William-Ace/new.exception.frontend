import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { useFirebase } from '../firebase';
import { REACT_APP_GRAPH_URI } from '../util/constants';

const cache = new InMemoryCache({ freezeResults: false });

const useApolloClient = () => {
  const { token } = useFirebase();

  return new ApolloClient({
    cache,
    uri: REACT_APP_GRAPH_URI,
    request: (operation: any) => {
      if (token) {
        operation.setContext({
          headers: {
            Authorization: token || ''
          }
        });
      }
    }
  });
};

export default useApolloClient;

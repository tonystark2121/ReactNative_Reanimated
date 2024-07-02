import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import store from './src/services/store';

import {QueryClient, QueryClientProvider} from 'react-query';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/routes';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';

export const persistor = persistStore(store);
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

Geocoder.init('AIzaSyABlI8WjXoGl_Va_TxQfFelLj1QDCEbLas');

const App = () => {
  const [state, setState] = React.useState({
    location: '',
  });

  console.log(state?.location, 'location');
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider
            theme={{
              colors: {
                ...DefaultTheme.colors,
                primary: '#164B92',
                secondary: '#2789FD',
                outline: 'rgba(12, 47, 73, 0.5)',
                placeholder: 'rgba(12, 47, 73, 0.5)',
                surface: 'rgba(12, 47, 73, 0.5)',
                surfaceVariant: 'rgba(12, 47, 73, 0.5)',
                onSurfaceVariant: 'rgba(12, 47, 73, 0.5)',
                background: '#fff',
              },
            }}>
            <QueryClientProvider client={queryClient}>
              <Routes />
            </QueryClientProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
      <Toast ref={ref => Toast.setRef(ref)} />
    </GestureHandlerRootView>
  );
};

export default App;

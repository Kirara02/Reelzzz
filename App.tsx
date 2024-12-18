import 'react-native-gesture-handler';
import './src/sheets/sheet';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Navigation from './src/navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

GoogleSignin.configure({
  webClientId: '27629668508-j009o4er0nvgugm6bom47aea6eoihe59.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId: '27629668508-egtl9frf44fle7t8e3ifc5lv5qai1tod.apps.googleusercontent.com',
});

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar translucent={Platform.OS === 'ios'} backgroundColor="transparent" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

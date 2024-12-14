import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {mergerStack} from './ScreenCollections';
import {UploadProvider} from '../components/uploadService/UploadContext';

const Stack = createNativeStackNavigator();

const MainNavigator: FC = () => {
  return (
    <UploadProvider>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        {mergerStack.map((item, index) => {
          return <Stack.Screen key={index} name={item.name} component={item.component} />;
        })}
      </Stack.Navigator>
    </UploadProvider>
  );
};

export default MainNavigator;

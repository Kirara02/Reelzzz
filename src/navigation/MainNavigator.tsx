import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {mergerStack} from './ScreenCollections';
import {UploadProvider} from '../components/uploadService/UploadContext';
import {SheetProvider} from 'react-native-actions-sheet';

const Stack = createNativeStackNavigator();

const MainNavigator: FC = () => {
  return (
    <SheetProvider>
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
    </SheetProvider>
  );
};

export default MainNavigator;

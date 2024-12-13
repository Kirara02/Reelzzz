import {PermissionsAndroid, Platform} from 'react-native';

export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'App Camera Permission',
      message: 'App needs access to your camera',
      buttonNeutral: 'Ask me later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS permissions are handled differently
};

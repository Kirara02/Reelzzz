import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {token_storage} from './storage';
import {setUser} from './reducers/userSlice';
import {navigate, resetAndNavigate} from '../utils/NavigationUtils';
import {Alert} from 'react-native';
import {LOGIN} from './API';

interface RegisterData {
  id_token: string;
  provider: string;
  name: string;
  email: string;
  userImage: string;
}

const handleSignInSuccess = async (res: any, dispatch: any) => {
  token_storage.set('access_token', res.data.tokens.access_token);
  token_storage.set('refresh_token', res.data.tokens.refresh_token);
  await dispatch(setUser(res.data.user));
  resetAndNavigate('BottomTab');
};

const handleSignInError = (error: any, data: RegisterData) => {
  console.log(error);
  if (error.response.status == 401) {
    navigate('RegisterScreen', {
      ...data,
    });
    return;
  }
  Alert.alert('We are facing issues, try again later');
};

export const signInWithGoogle = () => async (dispatch: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const {data: userData} = await GoogleSignin.signIn();

    await axios
      .post(LOGIN, {
        provider: 'google',
        id_token: userData?.idToken,
      })
      .then(async res => {
        console.log(res);
        await handleSignInSuccess(res, dispatch);
      })
      .catch((err: any) => {
        const errorData = {
          email: userData?.user.email,
          name: userData?.user.name,
          userImage: userData?.user.photo,
          provider: 'google',
          id_token: userData?.idToken,
        };
        handleSignInError(err, errorData as RegisterData);
      });
  } catch (error) {
    console.log('GOOGLE ERROR', error);
  }
};

import {View, StyleSheet, Animated, Alert} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import CustomView from '../../components/global/CustomView';
import Logo from '../../assets/images/logo_t.png';
import CustomText from '../../components/global/CustomText';
import {FONTS} from '../../constants/Fonts';
import {token_storage} from '../../redux/storage';
import {jwtDecode} from 'jwt-decode';
import {resetAndNavigate} from '../../utils/NavigationUtils';
import {refresh_tokens} from '../../redux/apiConfig';
import {useAppDispatch} from '../../redux/reduxHook';
import {refetchUser} from '../../redux/actions/userAction';

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const [isStop, setIsStop] = useState(false);
  const scale = new Animated.Value(1);
  const dispatch = useAppDispatch();

  const tokenCheck = async () => {
    const access_token = token_storage.getString('access_token') as string;
    const refresh_token = token_storage.getString('refresh_token') as string;

    if (access_token) {
      const decodedAccessToken = jwtDecode<DecodedToken>(access_token);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refresh_token);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('LoginScreen');
        Alert.alert('Session Expired, please login again');
        return false;
      }

      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens();
          dispatch(refetchUser());
        } catch (error) {
          console.log(error);
          Alert.alert('There was an error');
          return false;
        }
      }
      resetAndNavigate('BottomTab');
      return true;
    }
    resetAndNavigate('LoginScreen');
    return false;
  };

  useEffect(() => {
    async function deeplinks() {
      await tokenCheck();
    }

    deeplinks();
  }, []);

  useEffect(() => {
    const breathAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );

    if (!isStop) {
      breathAnimation.start();
    }

    return () => {
      breathAnimation.stop();
    };
  }, [isStop]);

  return (
    <CustomView>
      <View style={style.imageContainer}>
        <Animated.Image
          source={Logo}
          style={{
            width: '65%',
            height: '25%',
            resizeMode: 'contain',
            transform: [{scale}],
          }}
        />
        <CustomText variant="h3" fontFamily={FONTS.Reelz}>
          Reelzzz @Kirara
        </CustomText>
      </View>
    </CustomView>
  );
};

const style = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;

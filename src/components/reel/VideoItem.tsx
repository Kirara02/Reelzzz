import {View, Text} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import {useAppDispatch} from '../../redux/reduxHook';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Loader from '../../assets/images/loader.jpg';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../constants/Colors';
import LottieView from 'lottie-react-native';
import DoubleTapAnim from '../../assets/animations/heart.json';

interface VideoItemProps {
  item: any;
  isVisible: boolean;
  preload: boolean;
}

const VideoItem: React.FC<VideoItemProps> = ({item, isVisible, preload}) => {
  const dispatch = useAppDispatch();
  const [paused, setPaused] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [showLikeAnim, setShowLikeAnim] = useState<boolean>(false);

  const isFocused = useIsFocused();

  const handleTogglePlay = useCallback(() => {
    let currentState = !paused ? 'paused' : 'play';
    setIsPaused(!isPaused);
    setPaused(currentState);
    setTimeout(() => {
      if (currentState === 'play') setPaused(null);
    }, 700);
  }, [paused, isPaused]);

  const handleDoubleTapLike = useCallback(() => {
    setShowLikeAnim(true);
    setTimeout(() => {
      setShowLikeAnim(false);
    }, 1200);
  }, []);

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      handleTogglePlay();
    })
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      handleDoubleTapLike();
    })
    .runOnJS(true);

  useEffect(() => {
    setIsPaused(!isVisible);
    if (!isVisible) {
      setPaused(null);
      setVideoLoaded(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isFocused) {
      setIsPaused(true);
    }
    if (isPaused && isVisible) {
      setIsPaused(false);
    }
  }, [isFocused]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
        <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
          <View style={styles.videoContainer}>
            {!videoLoaded && (
              <FastImage
                source={{uri: item.thumbUri, priority: FastImage.priority.high}}
                style={styles.videoContainer}
                defaultSource={Loader}
                resizeMode="cover"
              />
            )}
            {isVisible || preload ? (
              <Video
                poster={item.thumbUri}
                posterResizeMode="cover"
                source={isVisible || preload ? {uri: convertToProxyURL(item.videoUri)} : undefined}
                bufferConfig={{
                  minBufferMs: 2500,
                  maxBufferMs: 3000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 2500,
                }}
                ignoreSilentSwitch={'ignore'}
                playWhenInactive={false}
                playInBackground={false}
                useTextureView={false}
                controls={false}
                disableFocus={true}
                style={styles.videoContainer}
                paused={isPaused}
                repeat={true}
                hideShutterView
                minLoadRetryCount={5}
                resizeMode="cover"
                shutterColor="transparent"
                onReadyForDisplay={handleVideoLoad}
              />
            ) : null}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>

      {showLikeAnim && (
        <View style={styles.lottieContainer}>
          <LottieView style={styles.lottie} source={DoubleTapAnim} autoPlay loop={false} />
        </View>
      )}

      {paused !== null && (
        <View style={styles.playPauseButton}>
          <View style={styles.shadow} pointerEvents="none">
            <Icon
              name={paused === 'paused' ? 'pause' : 'play-arrow'}
              color={Colors.white}
              size={50}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const areEqual = (prevProps: VideoItemProps, nextProps: VideoItemProps) => {
  return (
    prevProps?.item?._id === nextProps?.item?._id && prevProps?.isVisible === nextProps?.isVisible
  );
};

export default memo(VideoItem, areEqual);

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    flexGrow: 1,
    flex: 1,
  },
  videoContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    height: screenHeight,
    aspectRatio: 9 / 16,
    flex: 1,
    zIndex: -1,
  },
  playPauseButton: {
    position: 'absolute',
    top: '47%',
    bottom: 0,
    left: '44%',
    opacity: 0.7,
  },
  shadow: {
    zIndex: -1,
  },
  lottieContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

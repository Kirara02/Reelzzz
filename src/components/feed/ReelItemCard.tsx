import {View, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import {Colors} from '../../constants/Colors';
import FastImage from 'react-native-fast-image';
import ReelCardLoader from '../loader/ReelCardLoader';

interface ReelItemCardProps {
  style?: ViewStyle;
  loading: boolean;
  item: any;
  onPressReel: () => {};
}

const ReelItemCard: React.FC<ReelItemCardProps> = ({style, loading, item, onPressReel}) => {
  return (
    <View style={[styles.card, style]}>
      {loading ? (
        <ReelCardLoader style={styles.skeltonLoader} />
      ) : (
        <TouchableOpacity onPress={onPressReel}>
          <FastImage
            source={{
              uri: item?.thumbUri,
              priority: FastImage.priority.high,
            }}
            style={styles.img}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.25,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  skeltonLoader: {
    width: '100%',
    height: '100%',
  },
});

export default ReelItemCard;

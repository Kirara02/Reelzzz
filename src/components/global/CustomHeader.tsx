import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {goBack} from '../../utils/NavigationUtils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from './CustomText';

interface HeaderProps {
  title: string;
  onInfoPress?: () => void;
}

const CustomHeader: React.FC<HeaderProps> = ({title, onInfoPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
      }}>
      <TouchableOpacity onPress={() => goBack()}>
        <Icon name="keyboard-backspace" color={Colors.text} size={RFValue(20)} />
      </TouchableOpacity>
      <CustomText variant="h4">{title}</CustomText>
      <TouchableOpacity onPress={onInfoPress}>
        <Icon name="information-outline" color={Colors.disabled} size={RFValue(20)} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

import { Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
  containerStyle,
  textStyle,
  label,
  onPress,
  disabled = false,
}) => {
  return (
    <View style={[containerStyle, disabled && { opacity: 0.5 }]}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <Text style={textStyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

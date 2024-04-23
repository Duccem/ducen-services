import { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput } from 'react-native';
export type MobileInputTextProps = {
  placeholder: string,
  secureTextEntry?: boolean,
  onChange?: (text: string) => void,
  onBlur?: () => void,
  error?: string,
  value?: any,
  required?: boolean
  prefix?: string
}
export function MobileInputText({ placeholder, secureTextEntry, onChange, onBlur, error, value, required, prefix }: MobileInputTextProps) {
  const animatedValue = useRef(new Animated.Value(0));
  const [text, onChangeText] = useState('');
  const returnAnimatedTitleStyles = {
    transform: [
      {
        translateY: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [16, -6],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const onFocusAnimation = () => {
    Animated.timing(animatedValue?.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };
  const onBlurAnimation = () => {
    if (!text) {
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <Animated.View style={styles.inputBox}>
      <Animated.Text style={[styles.label, returnAnimatedTitleStyles, { left: prefix ? 40: -10 }]}>{placeholder} <Animated.Text style={{color: '#DE2AC3'}}>{required ? '*' : ''}</Animated.Text></Animated.Text>
      { prefix && <Text style={styles.prefix}>{prefix}</Text>}
      <TextInput
        onChangeText={(text) => {
          onChangeText(text);
          if(onChange) {
            onChange(text);
          }
        }}
        style={[styles.input, error ? {borderColor: '#DE2AC3'} : {}, prefix ? { paddingLeft: 65 } : {}]}
        cursorColor={'#000'}
        secureTextEntry={secureTextEntry}
        onBlur={() => {
          onBlurAnimation();
          if(onBlur) {
            onBlur();
          }
        }}
        onFocus={onFocusAnimation}
        value={value}
      >
      </TextInput>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F0F0F0',
    height: 40,
    width: '100%',
    margin: 'auto',
    borderRadius: 5,
    position: 'absolute',
    fontFamily: 'Nunito_700Bold',
    paddingLeft: 15,
  },
  inputBox: {
    backgroundColor: 'transparent',
    height: 40,
    width: '90%',
    position: 'relative',
    borderRadius: 5,
    marginLeft: '5%',
  },
  label: {
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    position: 'absolute',
    zIndex: 1,
    top: -10,
    left: -10,
    backgroundColor: 'transparent',
  },
  prefix: {
    position: 'absolute',
    top:6,
    left: 5,
    zIndex: 1,
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#000',
    width: 50,
  }
});

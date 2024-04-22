import { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import MaskInput from 'react-native-mask-input';
export type MobileInputPhoneProps = {
  placeholder: string,
  secureTextEntry?: boolean,
  onChange?: (text: string) => void,
  onBlur?: () => void,
  error?: string,
  value?: any,
  required?: boolean
  prefix?: string
}
export function MobileInputPhone({ placeholder, secureTextEntry, onChange, onBlur, error, value, required, prefix }: MobileInputPhoneProps) {
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
  const returnAnimatedPrefixStyles = {
    transform: [
      {
        translateX: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -55],
          extrapolate: 'clamp',
        }),
      },
    ],
  }
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
      <Animated.Text style={[styles.label, returnAnimatedTitleStyles]}>{placeholder} <Animated.Text style={{color: '#DE2AC3'}}>{required ? '*' : ''}</Animated.Text></Animated.Text>
      { prefix && <Animated.Text style={[styles.prefix, returnAnimatedPrefixStyles]}>{prefix}</Animated.Text>}
      <MaskInput
        onChangeText={(_masked, unmasked) => {
          onChangeText(unmasked);
          if(onChange) {
            onChange(unmasked);
          }
        }}
        style={[styles.input, error ? {borderColor: '#DE2AC3'} : {}, prefix ? { paddingLeft: 75 } : {}]}
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
        mask={[/\d/, /\d/,/\d/, ' ', /\d/, /\d/, /\d/,'-', /\d/,/\d/, '-',  /\d/, /\d/]}
        placeholder=''
      >
      </MaskInput>

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
    left: 65,
    zIndex: 1,
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: '#969696',
    borderLeftColor: '#969696',
    borderLeftWidth: 1,
    paddingHorizontal: 5,
  }
});

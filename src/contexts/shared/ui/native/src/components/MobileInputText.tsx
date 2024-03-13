import { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, TextInput } from 'react-native';
export type MobileInputTextProps = {
  placeholder: string,
  secureTextEntry?: boolean,
  onChange?: (text: string) => void,
  onBlur?: () => void,
  error?: string,
  value?: any,
  required?: boolean
}
export function MobileInputText({ placeholder, secureTextEntry, onChange, onBlur, error, value, required }: MobileInputTextProps) {
  const animatedValue = useRef(new Animated.Value(0));
  const [text, onChangeText] = useState('');
  const returnAnimatedTitleStyles = {
    transform: [
      {
        translateY: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [16, -3],
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
      <Animated.Text style={[styles.label, returnAnimatedTitleStyles]}>{placeholder} <Animated.Text style={{color: '#DE2AC3'}}>{required ? '*' : ''}</Animated.Text></Animated.Text>
      <TextInput
        onChangeText={(text) => {
          onChangeText(text);
          if(onChange) {
            onChange(text);
          }
        }}
        style={[styles.input, error ? {borderColor: '#DE2AC3'} : {}]}
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
    backgroundColor: '#ffff',
    height: 40,
    width: '100%',
    margin: 'auto',
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
    top: -3,
    left: -3,
    fontFamily: 'Nunito_700Bold',
    paddingLeft: 15,
  },
  inputBox: {
    backgroundColor: '#000',
    height: 43,
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
    top: -13,
    left: -10,
    backgroundColor: '#fff',
  },
});

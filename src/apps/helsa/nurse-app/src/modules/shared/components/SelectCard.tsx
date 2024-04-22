import { ReactNode, useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text } from "react-native";

export function SelectCard({ placeholder, icon, onPress, selected }: { placeholder: string, icon?: ReactNode, onPress?: () => void, selected?: boolean}) {
  const animatedValue = useRef(new Animated.Value(0));
  useEffect(() => {
    if(selected) {
      Animated.timing(animatedValue?.current, {
        toValue: 1,
        duration: 600,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }else {
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 600,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  }, [selected])
  return (
    <Animated.View style={[
      styles.inputBox,
      {
        borderColor: selected ? '#9747FF' : '#fff',
        backgroundColor: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: ['#fff', '#9747FF'],
          extrapolate: 'clamp',
        }),
      }
    ]}>
      <Pressable style={styles.input} onPress={onPress}>
      {icon}
      <Text style={styles.label}>{placeholder}</Text>
    </Pressable>
    </Animated.View>

  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    height: 140,
    width: 140,
    margin: 'auto',
    fontFamily: 'Nunito_700Bold',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#9747FF',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 100,
  },
  inputBox: {
    backgroundColor: '#fff',
    height: 140,
    width: 140,
    position: 'relative',
    borderColor: '#9747FF',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
});

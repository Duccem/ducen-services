import { Pressable, StyleSheet, Text, View } from "react-native";

export function MobileButton({ text, onPress, icon, style }: { text: string, onPress?: (...args: any[]) => void | Promise<void>, icon?: JSX.Element, style?: any}) {
  return (
    <View style={styles.buttonBox}>
      <Pressable style={({pressed}) => [
        styles.button,
        style,
        {
          backgroundColor: pressed ? '#fff' : '#9747FF',
          borderColor: pressed ? '#9747FF' : '#fff',
        }
      ]} onPress={onPress}>
        <Text style={styles.buttonText}>
          {text}
        </Text>
        {icon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9747FF',
    height: 40,
    width: '90%',
    margin: 'auto',
    borderRadius: 5,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
  },
  buttonBox: {
    backgroundColor: 'transparent',
    height: 40,
    width: '100%',
    position: 'relative',
    borderRadius: 5,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: '#000',
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
  }
});

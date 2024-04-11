import { Pressable, StyleSheet, Text, View } from "react-native";

export function MobileButton({ text, onPress, icon }: { text: string, onPress?: (...args: any[]) => void | Promise<void>, icon?: JSX.Element }) {
  return (
    <View style={styles.buttonBox}>
      <Pressable style={({pressed}) => [
        styles.button,
        {
          top: pressed ? -2 : -3,
          left: pressed ? -2 : -3,
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
    width: '100%',
    margin: 'auto',
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
    top: -3,
    left: -3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1
  },
  buttonBox: {
    backgroundColor: '#000',
    height: 43,
    width: '90%',
    position: 'relative',
    borderRadius: 5,
    marginLeft: '5%',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
  }
});

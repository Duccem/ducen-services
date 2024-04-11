import { Pressable, StyleSheet } from "react-native";

export function MobileSocialButton({ icon }: { icon: JSX.Element }) {
  return (
    <Pressable style={({pressed}) => [
      styles.box,
      {
        borderColor: pressed ? '#000' : '#E5E5E5',
      }
    ]}>
      {icon}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  }
})

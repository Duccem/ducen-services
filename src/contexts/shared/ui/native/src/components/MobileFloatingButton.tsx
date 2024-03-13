import { Pressable } from "react-native"

export const MobileFloatingButton = ({ children, onPress }: any) => {
  return (
    <Pressable onPress={onPress}
      style={
        ({pressed}) => [
          {
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            height: 70,
            backgroundColor: '#110f14',
            borderRadius: 20,
            borderWidth: 2,
            borderStyle: 'solid'
          },
          {
            borderColor: pressed ? '#fff' : '#110f14',
          }
        ]
      }
    >
        {children}
    </Pressable>
  )
}

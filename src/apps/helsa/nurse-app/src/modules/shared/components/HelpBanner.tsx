import { Pressable, Text, View } from "react-native";
import { Help } from "./icons/help";

export function HelpBanner() {
  return (
    <Pressable style={{
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#000',
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,zIndex: 0,
    }}>
      <Help/>
      <View style={{flex: 1}}>
        <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16}}>Help</Text>
        <Text style={{ flexShrink: 1, fontFamily: 'Nunito_500Medium', fontSize: 14 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
      </View>

    </Pressable>
  )
}

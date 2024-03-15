import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function SelectCard({ placeholder, icon, onPress }: { placeholder: string, icon?: ReactNode, onPress?: () => void }) {
  return (
    <View style={styles.inputBox}>
      <Pressable style={({pressed})=> [
        styles.input,
        {
          top: pressed ? -1 : -3,
          left: pressed ? -1 : -3,
        }
      ]} onPress={onPress}>
        {icon}
        <Text style={styles.label}>{placeholder}</Text>
        <FontAwesomeIcon icon={faAngleRight} color={'#000'} size={30}/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffff',
    height: 50,
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
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputBox: {
    backgroundColor: '#000',
    height: 53,
    width: '90%',
    position: 'relative',
    borderRadius: 5,
    marginLeft: '5%',
  },
  label: {

    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    zIndex: 1,
    backgroundColor: '#fff',
  },
});

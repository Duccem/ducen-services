import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export const Back = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <FontAwesomeIcon icon={faArrowLeft} color="#000" size={30}/>
    </Pressable>
  )
}

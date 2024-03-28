import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Back } from "../../../modules/shared/components/Back";
import { SelectCard } from "../../../modules/shared/components/SelectCard";
import { Doctor } from "../../../modules/shared/components/icons/doctor";
import { Heart } from "../../../modules/shared/components/icons/heart";
import { useUserContext } from "../../../modules/user/state/UserContext";

export function SelectRegisterType() {
  const { setRegisterType } = useUserContext();
  const navigator = useNavigation();
  const selectAndGoToRegister = (type: 'DOCTOR' | 'PATIENT') => {
    setRegisterType(type);
    navigator.navigate('register' as never);
  }
  return (
    <View style={styles.container}>

      <View style={styles.form}>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: 10,
          paddingHorizontal: '5%',
        }}>
          <Back/>
          <Text style={styles.title}>Ducen</Text>
        </View>
        <View style={{ width: '100%', alignItems: 'flex-start', paddingLeft: '5%', marginBottom: 40 }}>
          <Text style={styles.subtitle}>Select the type of profile you are.</Text>
        </View>
        <SelectCard placeholder="Medico" icon={<Doctor size={30}/>} onPress={() => selectAndGoToRegister('DOCTOR')}></SelectCard>
        <SelectCard placeholder="Paciente" icon={<Heart size={30}/>} onPress={() => selectAndGoToRegister('PATIENT')}></SelectCard>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  title: {
    color: '#000',
    fontSize: 35,
    fontFamily: 'Nunito_700Bold',
  },
  subtitle: {
    color: '#000',
    fontSize: 25,
    fontFamily: 'Nunito_700Bold',
  },
  form: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 40,
  },
})

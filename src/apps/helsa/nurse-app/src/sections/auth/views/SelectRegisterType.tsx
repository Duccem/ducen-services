import { MobileButton } from "@ducen/ui-native";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { Back } from "../../../modules/shared/components/Back";
import { SelectCard } from "../../../modules/shared/components/SelectCard";
import { useUserContext } from "../../../modules/user/state/UserContext";

export function SelectRegisterType() {
  const { setRegisterType, userState: { registerType } } = useUserContext();
  const navigator = useNavigation();
  const selectAndGoToRegister = (type: 'DOCTOR' | 'PATIENT') => {
    setRegisterType(type);
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
        <SelectCard
          selected={registerType === 'DOCTOR'}
          placeholder="Medico"
          icon={
            <Image
             height={30}
             width={30}
             style= {{width: 50, height: 50}}
             source={require('../../../../assets/nutritionist.png')}/>
          }
          onPress={() => selectAndGoToRegister('DOCTOR')}
        />
        <SelectCard
          selected={registerType === 'PATIENT'}
          placeholder="Paciente"
          icon={
            <Image
            height={30}
            width={30}
            style= {{width: 50, height: 50}}
            source={require('../../../../assets/ophthalmology.png')}/>
          }
          onPress={() => selectAndGoToRegister('PATIENT')}
        />
        <MobileButton text="Start" style={{ borderRadius: 100, width: '35%' }} onPress={() => navigator.navigate('register' as never)}/>
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

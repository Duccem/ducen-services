import { MobileButton, MobileInputCheck, MobileInputDate, MobileInputSelect, MobileInputText, useMobileForm } from "@ducen/ui-native"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import { Back } from "../../../modules/shared/components/Back"
import { useUserContext } from "../../../modules/user/state/UserContext"
import { formRegisterPrincipal } from "../forms/register-principal"
const genders = ['MALE', 'FEMALE', 'OTHER'];
export function Register() {
  const navigation = useNavigation();
  const { setPartialUser } = useUserContext();
  const { registerMobile, handleSubmit } = useMobileForm({
    fields: formRegisterPrincipal
  })

  const send = () => {
    handleSubmit((values) => {
      console.log(values)
      setPartialUser({
        name: {
          firstName: values.firstName,
          lastName: values.lastName
        },
        email: values.email,
        birthDate: values.birthDate,
        gender: values.gender,
      })
      navigation.navigate('register-contact' as never)
    }, errors => console.log(errors))
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
        <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 10, paddingHorizontal: '5%' }}>
          <Text style={styles.subtitle}>Tus datos principales</Text>
          <Text style={{ fontFamily: 'Nunito_500Medium' }}>Datos esenciales para saber quien eres.</Text>
        </View>
        <View style={{ width: '100%', gap: 30 }}>
          <MobileInputText placeholder={'Email'} required {...registerMobile('email')}/>
          <MobileInputText placeholder={'First name'} required {...registerMobile('firstName')}/>
          <MobileInputText placeholder={'Last name'} required {...registerMobile('lastName')}/>
          <MobileInputDate placeholder="Birth Date" required mode="date" {...registerMobile('birthDate')}/>
          <MobileInputSelect placeholder="Gender" options={genders} {...registerMobile('gender')}/>
          <MobileInputCheck placeholder='Service terms' {...registerMobile('terms')} />
          <MobileButton text='Siguiente' icon={<FontAwesomeIcon icon={faAngleRight} color={'#000'} size={30}/>} onPress={send}></MobileButton>
        </View>
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

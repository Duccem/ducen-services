import { MobileButton, MobileInputText, useMobileForm } from "@ducen/ui-native"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Back } from "../../../modules/shared/components/Back"
import { useUserContext } from "../../../modules/user/state/UserContext"
import { formRegisterCredentials } from "../forms/register-credentials"

export function RegisterCredentials() {
  const { setPartialUser, userState: { user }, register } = useUserContext();
  const { registerMobile, handleSubmit } = useMobileForm({
    fields: formRegisterCredentials
  })

  useEffect(() => {
    register();
  }, [user])

  const send = () => {
    handleSubmit((values) => {
      setPartialUser({
        password: values.password
      })
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
          <Text style={styles.subtitle}>Contraseñas</Text>
          <Text style={{ fontFamily: 'Nunito_500Medium' }}>Contraseña de seguridad</Text>
        </View>
        <View style={{ width: '100%', gap: 25 }}>
          <MobileInputText placeholder={'Password'} secureTextEntry {...registerMobile('password')}/>
          <MobileInputText placeholder={'Confirm Password'} secureTextEntry {...registerMobile('confirmPassword')}/>
          <MobileButton text='Finish' icon={<FontAwesomeIcon icon={faAngleRight} color={'#000'} size={30}/>} onPress={send}></MobileButton>
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

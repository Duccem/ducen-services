import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useNavigation } from "@react-navigation/native"
import { MobileButton, MobileInputText, useMobileForm } from "@shared/ui-native"
import { StyleSheet, Text, View } from "react-native"
import { Back } from "../../../modules/shared/components/Back"
import { useUserContext } from "../../../modules/user/state/UserContext"
import { formRegisterContact } from "../forms/register-contact"

export function RegisterContact() {
  const navigation = useNavigation();
  const { setPartialUser } = useUserContext();
  const { registerMobile, handleSubmit } = useMobileForm({
    fields: formRegisterContact
  })
  const send = () => {
    handleSubmit((values) => {
      setPartialUser({
        phoneNumber: values.phoneNumber,
        photo: 'image.jpg',
        address: {
          country: values.country,
          city: values.city,
          street: values.street,
          zipCode: values.zipCode,
          coordinates: {
            latitude: 0,
            longitude: 0
          }
        },
        configuration: {
          lang: 'es',
          timezone: 'America/Caracas',
          theme: 'light'
        }
      })
      navigation.navigate('register-credentials' as never)
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
          <Text style={styles.subtitle}>Tu dirección</Text>
          <Text style={{ fontFamily: 'Nunito_500Medium' }}>Datos usados para tu contacto</Text>
        </View>
        <View style={{ width: '100%', gap: 25 }}>
          <MobileInputText placeholder={'Phone'} {...registerMobile('phoneNumber')}/>
          <MobileInputText placeholder={'Country'} {...registerMobile('country')}/>
          <MobileInputText placeholder={'City'} {...registerMobile('city')}/>
          <MobileInputText placeholder={'Street'} {...registerMobile('street')}/>
          <MobileInputText placeholder={'Zip Code'} {...registerMobile('zipCode')}/>
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

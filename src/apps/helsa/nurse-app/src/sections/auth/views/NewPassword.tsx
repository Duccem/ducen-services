import { MobileButton, MobileInputText, useMobileForm } from "@ducen/ui-native";
import { StyleSheet, Text, View } from "react-native";
import { Back } from "../../../modules/shared/components/Back";
import { useUserContext } from "../../../modules/user/state/UserContext";
import { formRegisterCredentials } from "../forms/register-credentials";

export function NewPassword() {
  const {  } = useUserContext();
  const { registerMobile, handleSubmit } = useMobileForm({
    fields: formRegisterCredentials
  })


  const send = () => {
    handleSubmit((values) => {
    }, errors => console.log(errors))
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 10,
            paddingHorizontal: '5%',
          }}
        >
          <Back />
          <Text style={styles.title}>Ducen</Text>
        </View>
        <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 10, paddingHorizontal: '5%' }}>
          <Text style={styles.subtitle}>Indica el email de tu cuenta</Text>
        </View>
        <View style={{ width: '100%', gap: 30 }}>
          <MobileInputText placeholder={'Email'} />
          <MobileButton text="Send email" ></MobileButton>
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
    paddingTop: 40,
  },
  title: {
    color: '#000',
    fontSize: 35,
    fontFamily: 'Nunito_700Bold',
  },
  subtitle: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
  },
  form: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 40,
  },
});

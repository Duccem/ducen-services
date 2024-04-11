import { MobileButton, MobileInputText, MobileSocialButton } from '@ducen/ui-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Facebook } from '../../../modules/shared/components/icons/facebook';
import { Google } from '../../../modules/shared/components/icons/google';
import { XIcon } from '../../../modules/shared/components/icons/x';
import { useUserContext } from '../../../modules/user/state/UserContext';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUserContext();
  const navigation = useNavigation();
  const makeLogin = async () => {
    if(email && password) {
      await login(email, password);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Ducen</Text>
        <View style={{ width: '100%', alignItems: 'flex-start', paddingLeft: '5%', marginBottom: 40 }}>
          <Text style={styles.subtitle}>Welcome to Ducen. Medical assistance everywhere</Text>
        </View>
        <View style={{ width: '100%', justifyContent: 'center', gap: 30 }}>
          <MobileInputText placeholder={'Email'} onChange={(value: string) => setEmail(value) }/>
          <MobileInputText placeholder={'Password'} secureTextEntry onChange={(value: string) => setPassword(value)}/>
          <MobileButton text='Iniciar Sesión' onPress={makeLogin}></MobileButton>
          <View style={{
            width: '100%',
            paddingHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.signLink} onPress={() => navigation.navigate('select-type' as never)}>SignUp for Free</Text>
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 50 }}>
          <MobileSocialButton icon={<Google size={30}/>}></MobileSocialButton>
          <MobileSocialButton icon={<Facebook size={30}/>}></MobileSocialButton>
          <MobileSocialButton icon={<XIcon size={30}/>}></MobileSocialButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 35,
    marginBottom: 40,
    fontFamily: 'Nunito_700Bold',
  },
  subtitle: {
    color: '#000',
    fontSize: 25,
    fontFamily: 'Nunito_700Bold',
  },
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 0,
  },
  signLink: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  }
});

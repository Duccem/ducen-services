import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './auth/auth-navigator';
import { HomeNavigator } from './home/home.navigator';

const Stack = createNativeStackNavigator();
export function GlobalNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" component={AuthNavigator} />
        <Stack.Screen name="home" component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

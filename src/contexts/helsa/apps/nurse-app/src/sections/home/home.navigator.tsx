import { faChartSimple, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MobileFloatingButton } from '@shared/ui-native';
import { Home } from "./views/Home";
const Tab = createBottomTabNavigator();
export function HomeNavigator() {
  return (
    <>
      <Tab.Navigator initialRouteName='dash' screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#110f14',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#6C63FF',
          height: 60,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          backgroundColor: '#6C63FF',
        },
        headerShown: false,
      }}>
          <Tab.Screen name='stats' component={Home} options={{
            tabBarLabel: 'Stats',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faChartSimple} color={color} size={size}/>
            ),
          }}/>
          <Tab.Screen name='dash' component={Home} options={{
            tabBarLabel: 'Dash',
            tabBarIcon: ({ size  }) => (
              <FontAwesomeIcon icon={faMoon} color={'#6C63FF'} size={size}/>
            ),
            tabBarButton: (props) => (
              <MobileFloatingButton {...props} />
            ),

          }}/>
          <Tab.Screen name='me' component={Home} options={{
            tabBarLabel: 'Me',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={size}/>
            ),
          }}/>
      </Tab.Navigator>
    </>
  );
}

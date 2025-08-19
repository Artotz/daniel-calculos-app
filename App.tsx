import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import './global.css';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: 'default',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Daniel Cálculos 🔥' }}
        />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Resultado' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cálculo' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Resultado' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

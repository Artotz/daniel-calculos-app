import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import './global.css';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            animation: 'default',

            headerShown: false,
            // headerStyle: {
            //   backgroundColor: '#f4511e',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Cálculo de Produção', cardStyle: { flex: 1 } }}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ title: 'Resultado', cardStyle: { flex: 1 } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

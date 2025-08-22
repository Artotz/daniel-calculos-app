import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { calcularSaidas } from 'utils/calculator';

export default function ResultScreen({ route }: any) {
  const input = route.params;

  const output = calcularSaidas(input);

  return (
    <ImageBackground
      source={require('../assets/bg2.jpg')}
      className="h-100 flex-1"
      resizeMode="cover"
      resizeMethod="scale">
      <ScrollView className="flex-1  p-4">
        <Text className="mb-4 text-2xl font-bold text-white">Resultado dos Cálculos</Text>

        {Object.entries(output).map(([key, valor], index) => (
          <View
            key={index}
            className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 opacity-75 shadow-sm">
            <Text className="font-medium text-gray-600">{key}</Text>
            <Text className="text-lg font-bold text-gray-800">{valor}</Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

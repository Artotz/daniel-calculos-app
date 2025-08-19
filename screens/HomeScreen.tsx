// import { useState } from 'react';
// import { View, TextInput, Text, TouchableOpacity } from 'react-native';

// export default function HomeScreen({ navigation }: any) {
//   const [volume, setVolume] = useState('');

//   const handleCalcular = () => {
//     if (!volume) return;
//     navigation.navigate('Result', { volume: parseFloat(volume) });
//   };

//   return (
//     <View className="flex-1 items-center justify-center bg-gray-50 p-6">
//       <Text className="mb-6 text-2xl font-bold text-gray-800">Cálculo de Produção</Text>

//       <TextInput
//         className="mb-4 w-64 rounded-xl border border-gray-300 bg-white p-3 text-center"
//         placeholder="Volume da caçamba (m³)"
//         keyboardType="numeric"
//         value={volume}
//         onChangeText={setVolume}
//       />

//       <TouchableOpacity
//         className="rounded-2xl bg-blue-600 px-6 py-3 shadow-md"
//         onPress={handleCalcular}>
//         <Text className="text-lg font-semibold text-white">Calcular</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-red-200">
      <Text className="text-xl font-bold text-blue-600">Tailwind Funcionando! 🎉</Text>
    </View>
  );
}

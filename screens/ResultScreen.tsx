import { View, Text, ScrollView } from 'react-native';

export default function ResultScreen({ route }: any) {
  const { volume } = route.params;

  // Constantes (fixas da planilha)
  const FE = 1.2;
  const nCaçambadas = 5;
  const densidade = 1.6; // ton/m³
  const tempoCiclo = 26; // segundos por ciclo
  const DF = 0.93;

  // Cálculos
  const volumeEficiente = volume * FE;
  const volumeTotal = volumeEficiente * nCaçambadas;
  const tonViagem = volumeTotal * densidade;
  const tempoTotal = tempoCiclo * nCaçambadas;
  const viagensHora = 3600 / tempoTotal;
  const tonHora = tonViagem * viagensHora;
  const producaoEstimada = tonHora * DF;

  const resultados = [
    { label: `Volume da caçamba`, valor: `${volume} m³` },
    { label: `Volume efetivo`, valor: `${volumeEficiente.toFixed(2)} m³` },
    { label: `Total (${nCaçambadas} caçambadas)`, valor: `${volumeTotal.toFixed(2)} m³` },
    { label: `Peso por viagem`, valor: `${tonViagem.toFixed(2)} ton` },
    { label: `Tempo total por viagem`, valor: `${tempoTotal} seg` },
    { label: `Viagens por hora`, valor: `${viagensHora.toFixed(2)}` },
    { label: `Produção (bruta)`, valor: `${tonHora.toFixed(2)} ton/h` },
    { label: `Produção estimada (DF ${DF})`, valor: `${producaoEstimada.toFixed(2)} ton/h` },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="mb-4 text-2xl font-bold text-gray-800">Resultado dos Cálculos</Text>

      {resultados.map((item, index) => (
        <View
          key={index}
          className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <Text className="font-medium text-gray-600">{item.label}</Text>
          <Text className="text-lg font-bold text-gray-800">{item.valor}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

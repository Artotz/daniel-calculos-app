import { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { calcularSaidas } from 'utils/calculator';
import Info from '@expo/vector-icons/Feather'; // Ícone de info

// Mapeamento de descrições para cada saída
const descricoes: Record<string, string> = {
  volumeEfetivo:
    'Capacidade x FatorEnchimento\nMédia de volume que o operador consegue encher na escavadeira.',
  massaEfetiva: 'VolumeEfetivo x Densidade\nKg por ciclo.',
  volumeCarregado: 'VolumeEfetivo x Ciclo\nVolume por caminhão.',
  massaCarregada: 'MassaEfetiva x Ciclo\nMassa por caminhão.',
  viagensHora: '(3600 * DF) / TempoCarregamento\nQuantidade de viagens por hora.',
  volumeHora: 'ViagemHora x VolumeCarregado\nVolume carregado por hora.',
  pesoHora: 'ViagemHora x MassaCarregada\nPeso carregado por hora.',
  eficiencia: 'PesoHora / ConsumoCombustivel\nToneladas movimentadas por litro de combustível.',
  custoHora: 'PreçoDiesel x ConsumoCombustivel\nValor gasto com combustivel por hora de operação.',
  custoDia:
    '(PreçoDiesel x ConsumoCombustivel) x Dia\nValor gasto com combustivel por dia de operação.',
  custoMes:
    '(ValorDiesel x ConsumoCombustivel) x (Dia x DiasMês)\nValor gasto com combustivel por mês de produção.',
  custoPorM3: 'CustoHora / VolumeHora\nValor gasto com combustivel por metro cúbico.',
  custoPorToneladaHora: 'CustoHora / PesoHora\nValor gasto com combustível por tonelada hora.',
};

export default function ResultScreen({ route }: any) {
  const input = route.params;
  const output = calcularSaidas(input);

  const [tooltipKey, setTooltipKey] = useState<string | null>(null);

  return (
    <ImageBackground
      source={require('../assets/bg2.jpg')}
      className="flex-1 overflow-clip"
      resizeMode="cover"
      resizeMethod="scale">
      <ScrollView className="flex-1 bg-[#231f1e]/90 p-4">
        <Text className="mb-6 text-center text-3xl font-extrabold text-[#ffde2d]">
          Resultado dos Cálculos
        </Text>

        {Object.entries(output).map(([key, valor], index) => (
          <View key={index} className="relative mb-4 rounded-2xl bg-white p-5 shadow-lg">
            {/* Faixa amarela */}
            <View className="absolute left-0 top-0 h-2 w-full rounded-t-2xl bg-[#ffde2d]" />

            {/* Cabeçalho com info */}
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium capitalize text-gray-500">{key}</Text>
              <TouchableOpacity onPress={() => setTooltipKey(tooltipKey === key ? null : key)}>
                <Info name="info" size={18} color="#231f1e" />
              </TouchableOpacity>
            </View>

            <Text className="mt-1 text-xl font-bold text-[#231f1e]">{valor.toFixed(2)}</Text>

            {/* Tooltip */}
            {tooltipKey === key && (
              <View className="absolute right-2 top-10 z-10" style={{ zIndex: 10, elevation: 10 }}>
                <View className="flex w-56 rounded-lg bg-[#231f1e] p-3 shadow-lg">
                  <Text className="text-xs text-[#ffde2d]">{descricoes[key]}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

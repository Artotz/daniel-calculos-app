import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, TextInput, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

const opcoesDensidade = [
  { nome: 'Lascas, madeira para celulose', valor: 1000 },
  { nome: 'Cinzas (carvão, cinzas, escória de carvão)', valor: 1000 },
  { nome: 'Argila e cascalho, secos', valor: 1602 },
  { nome: 'Argila, compacta, sólida', valor: 1746 },
  { nome: 'Argila, seca, em pedaços soltos', valor: 1009 },
  { nome: 'Argila, escavada na água', valor: 1282 },
  { nome: 'Carvão, antracite, quebrado, solto', valor: 1000 },
  { nome: 'Carvão, betuminoso, moderadamente úmido', valor: 1000 },
  { nome: 'Terra, argila comum, seca', valor: 1218 },
  { nome: 'Terra, lama, compactada', valor: 1843 },
  { nome: 'Granito, quebrado', valor: 1538 },
  { nome: 'Gesso', valor: 2275 },
  { nome: 'Calcário, grosso, granulado', valor: 1570 },
  { nome: 'Calcário, vários tamanhos', valor: 1682 },
  { nome: 'Calcário, pulverizado ou triturado', valor: 1362 },
  { nome: 'Areia, úmida', valor: 2083 },
  { nome: 'Areia, seca', valor: 1762 },
  { nome: 'Areia, espaços vazios, cheios de água', valor: 2083 },
  { nome: 'Arenito, extraído', valor: 1314 },
  { nome: 'Xisto, triturado, quebrado', valor: 1362 },
  { nome: 'Escória, de forno, granulada', valor: 1955 },
  { nome: 'Pedra ou cascalho (37,5 a 87,5 mm)', valor: 1442 },
  { nome: 'Pedra ou cascalho (18,75 mm)', valor: 1602 },
];

export default function HomeScreen({ navigation }: any) {
  const [inputs, setInputs] = useState<
    Record<string, { key: string; label: string; value: string }>
  >({
    tempoTotal: { key: 'tempoTotal', label: 'Tempo total de carregamento (s)', value: '' },
    quantidadeCiclos: { key: 'quantidadeCiclos', label: 'Quantidade de ciclos', value: '' },
    capacidadeCacamba: { key: 'capacidadeCacamba', label: 'Capacidade da caçamba (m³)', value: '' },
    fatorEnchimento: { key: 'fatorEnchimento', label: 'Fator de enchimento (%)', value: '' },
    densidadeMaterial: {
      key: 'densidadeMaterial',
      label: 'Densidade do material (kg/m³)',
      value: '',
    },
    consumoCombustivel: {
      key: 'consumoCombustivel',
      label: 'Consumo de combustível (l/h)',
      value: '',
    },
    precoDiesel: { key: 'precoDiesel', label: 'Preço do diesel (R$)', value: '' },
    capacidadeCaminhao: {
      key: 'capacidadeCaminhao',
      label: 'Capacidade do caminhão (m³)',
      value: '',
    },
    disponibilidadeFisica: {
      key: 'disponibilidadeFisica',
      label: 'Disponibilidade física (%)',
      value: '',
    },
    diasMes: { key: 'diasMes', label: 'Dias disponíveis do mês', value: '' },
    horasDia: { key: 'horasDia', label: 'Dia (h)', value: '' },
  });

  const [erro, setErro] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('inputs');
        if (saved) setInputs(JSON.parse(saved));
      } catch (e) {
        console.log('Erro ao carregar dados salvos', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('inputs', JSON.stringify(inputs)).catch((e) =>
      console.log('Erro ao salvar', e)
    );
    const algumVazio = Object.values(inputs).some((field) => !field.value);
    setErro(algumVazio);
  }, [inputs]);

  function handleChange(key: string, text: string) {
    setInputs((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: text },
    }));
  }

  function handleSubmit() {
    const parsedInputs = Object.fromEntries(
      Object.entries(inputs).map(([k, field]) => [k, parseFloat(field.value)])
    );
    navigation.navigate('Result', parsedInputs);
  }

  const clearKey = async () => {
    const cleared = Object.fromEntries(
      Object.entries(inputs).map(([k, field]) => [k, { ...field, value: '' }])
    );
    setInputs(cleared);
    try {
      await AsyncStorage.removeItem('inputs');
    } catch (error) {
      console.error('Erro ao remover chave', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      className="flex-1 overflow-clip"
      resizeMode="cover"
      resizeMethod="scale">
      <ScrollView className="flex-1 bg-[#231f1e]/90 p-4">
        <Text className="mb-6 text-center text-3xl font-extrabold text-[#ffde2d]">
          Cálculo de Produção
        </Text>

        {Object.values(inputs).map((field) =>
          field.key === 'densidadeMaterial' ? (
            <View
              key={field.key}
              className="mb-4 rounded-2xl border border-[#ffde2d] bg-white p-4 shadow-lg">
              <Text className="mb-2 text-sm font-semibold text-[#231f1e]">{field.label}</Text>
              <Picker
                selectedValue={field.value}
                onValueChange={(value) => handleChange(field.key, value.toString())}>
                <Picker.Item label="Selecione uma densidade..." value="" />
                {opcoesDensidade.map((opcao, idx) => (
                  <Picker.Item
                    key={idx}
                    label={`${opcao.nome} (${opcao.valor})`}
                    value={opcao.valor.toString()}
                  />
                ))}
              </Picker>
            </View>
          ) : (
            <View
              key={field.key}
              className="mb-4 rounded-2xl border border-[#ffde2d] bg-white p-4 shadow-lg">
              <Text className="mb-2 text-sm font-semibold text-[#231f1e]">{field.label}</Text>
              <TextInput
                className="rounded-xl border border-gray-300 bg-gray-50 p-3 text-[#231f1e]"
                placeholder={field.label}
                placeholderTextColor="#888"
                value={field.value}
                onChangeText={(text) => handleChange(field.key, text)}
                keyboardType="numeric"
              />
            </View>
          )
        )}
      </ScrollView>
      <View className="flex bg-[#231f1e]/90 p-4">
        <TouchableOpacity
          disabled={erro}
          onPress={handleSubmit}
          className={`mt-2 rounded-2xl p-4 ${erro ? 'bg-gray-400' : 'bg-[#ffde2d]'}`}>
          <Text
            className={`text-center text-lg font-bold ${
              erro ? 'text-gray-700' : 'text-[#231f1e]'
            }`}>
            Calcular
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={clearKey}
          className="mt-3 rounded-2xl border border-[#ffde2d] bg-[#231f1e] p-4">
          <Text className="text-center text-lg font-bold text-[#ffde2d]">Apagar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

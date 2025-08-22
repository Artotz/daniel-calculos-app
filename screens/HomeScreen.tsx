import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, TextInput, Text, ImageBackground, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }: any) {
  const [inputs, setInputs] = useState<
    Record<string, { key: string; label: string; value: string }>
  >({
    tempoTotal: {
      key: 'tempoTotal',
      label: 'Tempo total de carregamento (s)',
      value: '',
    },
    quantidadeCiclos: {
      key: 'quantidadeCiclos',
      label: 'Quantidade de ciclos',
      value: '',
    },
    capacidadeCacamba: {
      key: 'capacidadeCacamba',
      label: 'Capacidade da caçamba (m³)',
      value: '',
    },
    fatorEnchimento: {
      key: 'fatorEnchimento',
      label: 'Fator de enchimento (%)',
      value: '',
    },
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
    precoDiesel: {
      key: 'precoDiesel',
      label: 'Preço do diesel (R$)',
      value: '',
    },
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
    diasMes: {
      key: 'diasMes',
      label: 'Dias disponíveis do mês',
      value: '',
    },
    horasDia: {
      key: 'horasDia',
      label: 'Dia (h)',
      value: '',
    },
  });

  const [erro, setErro] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('inputs');
        if (saved) {
          setInputs(JSON.parse(saved));
        }
      } catch (e) {
        console.log('Erro ao carregar dados salvos', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('inputs', JSON.stringify(inputs)).catch((e) =>
      console.log('Erro ao salvar', e)
    );

    // validação: todos os campos devem estar preenchidos
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
    // envia para próxima tela já como números
    const parsedInputs = Object.fromEntries(
      Object.entries(inputs).map(([k, field]) => [k, parseFloat(field.value)])
    );

    console.log(parsedInputs);

    navigation.navigate('Result', parsedInputs);
  }

  const clearKey = async () => {
    setInputs({
      tempoTotal: {
        key: 'tempoTotal',
        label: 'Tempo total de carregamento (s)',
        value: '',
      },
      quantidadeCiclos: {
        key: 'quantidadeCiclos',
        label: 'Quantidade de ciclos',
        value: '',
      },
      capacidadeCacamba: {
        key: 'capacidadeCacamba',
        label: 'Capacidade da caçamba (m³)',
        value: '',
      },
      fatorEnchimento: {
        key: 'fatorEnchimento',
        label: 'Fator de enchimento (%)',
        value: '',
      },
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
      precoDiesel: {
        key: 'precoDiesel',
        label: 'Preço do diesel (R$)',
        value: '',
      },
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
      diasMes: {
        key: 'diasMes',
        label: 'Dias disponíveis do mês',
        value: '',
      },
      horasDia: {
        key: 'horasDia',
        label: 'Dia (h)',
        value: '',
      },
    });

    try {
      await AsyncStorage.removeItem('inputs');
    } catch (error) {
      console.error('Erro ao remover chave', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      className="h-100 flex-1"
      resizeMode="cover"
      resizeMethod="scale">
      <ScrollView className="flex-1 p-4">
        {Object.values(inputs).map((field) => (
          <View key={field.key} className="mb-4 bg-gray-500">
            <Text className="mt-1 text-xs text-white">{field.label}</Text>
            <TextInput
              className="rounded border bg-white p-2"
              placeholder={field.label}
              value={field.value}
              onChangeText={(text) => handleChange(field.key, text)}
              keyboardType="numeric"
            />
          </View>
        ))}

        <Button title="Calcular" disabled={erro} onPress={handleSubmit} />
        <Button title="Apagar" onPress={clearKey} />
      </ScrollView>
    </ImageBackground>
  );
}

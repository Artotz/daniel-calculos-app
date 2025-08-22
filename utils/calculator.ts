// calculos.ts
export type Entradas = {
  tempoTotal: number; // Tempo total em segundos
  quantidadeCiclos: number; // Quantidade de ciclos
  capacidadeCacamba: number; // m³
  fatorEnchimento: number; // em %, ex: 51.77
  densidadeMaterial: number; // kg/m³
  consumoCombustivel: number; // l/h
  precoDiesel: number; // R$/l
  capacidadeCaminhao: number; // m³
  disponibilidadeFisica: number; // em %, ex: 77
  diasMes: number; // dias disponíveis
  horasDia: number; // horas por dia
};

export type Saidas = {
  volumeEfetivo: number;
  massaEfetiva: number;
  volumeCarregado: number;
  massaCarregada: number;
  viagensHora: number;
  volumeHora: number;
  pesoHora: number;
  eficiencia: number;
  custoHora: number;
  custoDia: number;
  custoMes: number;
  custoPorM3: number;
  custoPorToneladaHora: number;
};

export function calcularSaidas(input: Entradas): Saidas {
  const fator = input.fatorEnchimento / 100;
  const disponibilidadeFisica = input.disponibilidadeFisica / 100;

  // Volume efetivo = Capacidade x Fator de Enchimento
  const volumeEfetivo = input.capacidadeCacamba * fator;

  // Massa efetiva = Volume efetivo x Densidade
  const massaEfetiva = volumeEfetivo * input.densidadeMaterial;

  // Volume carregado = Volume efetivo x ciclos
  const volumeCarregado = volumeEfetivo * input.quantidadeCiclos;

  // Massa carregada = Massa efetiva x ciclos
  const massaCarregada = massaEfetiva * input.quantidadeCiclos;

  // Viagens por hora = (3600 * disponibilidadeFisica) / tempoCarregamento
  const viagensHora = (3600 * disponibilidadeFisica) / input.tempoTotal;

  // Volume por hora = viagensHora x capacidade do caminhão
  const volumeHora = viagensHora * input.capacidadeCaminhao;

  // Peso por hora = volumeHora x densidade
  const pesoHora = volumeHora * input.densidadeMaterial;

  // Eficiência = (pesoHora / 1000) / consumo de combustível  (ton/litro)
  const eficiencia = pesoHora / 1000 / input.consumoCombustivel;

  // Custo por hora = consumo/hora x preço diesel
  const custoHora = input.consumoCombustivel * input.precoDiesel;

  // Custo por dia = custoHora x horasDia
  const custoDia = custoHora * input.horasDia;

  // Custo por mês = custoDia x diasMes
  const custoMes = custoDia * input.diasMes;

  // Custo por m³ = custoHora / volumeHora
  const custoPorM3 = custoHora / volumeHora;

  // Custo por tonelada hora = custoHora / (pesoHora/1000)
  const custoPorToneladaHora = custoHora / (pesoHora / 1000);

  return {
    volumeEfetivo,
    massaEfetiva,
    volumeCarregado,
    massaCarregada,
    viagensHora,
    volumeHora,
    pesoHora,
    eficiencia,
    custoHora,
    custoDia,
    custoMes,
    custoPorM3,
    custoPorToneladaHora,
  };
}

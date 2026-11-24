export const orgao = 'Defesa Civil SP'

export const agente = {
  nome: 'Carla Menezes',
  iniciais: 'CM',
  email: 'carla.menezes@defesacivil.sp.gov.br',
}

export const zonasRisco = [
  'Morro da Esperança',
  'Zona Leste',
  'Marginal Tietê',
  'Zona Sul',
  'Vila Industrial',
  'Parque Leste',
]

export const tiposEvento = [
  { id: 'deslizamento', label: 'Deslizamento' },
  { id: 'alagamento', label: 'Alagamento' },
  { id: 'vendaval', label: 'Vendaval' },
  { id: 'outros', label: 'Outro' },
]

export const niveisSeveridade = ['critico', 'alto', 'medio', 'info']

export const statusPedido = [
  { id: 'recebido', label: 'Recebido', proxima: 'Iniciar atendimento' },
  { id: 'atendimento', label: 'Em atendimento', proxima: 'Concluir' },
  { id: 'concluido', label: 'Concluído', proxima: null },
]

export const pedidosIniciais = [
  {
    protocolo: '#8971',
    solicitante: 'Maria Aparecida Lima',
    localizacao: 'Rua do Rio, 88 — Marginal Tietê',
    horario: '14:48',
    minutosAtras: 6,
    status: 'recebido',
  },
  {
    protocolo: '#8969',
    solicitante: 'João Pedro Santos',
    localizacao: 'Avenida Brasil, 1500 — Zona Leste',
    horario: '14:41',
    minutosAtras: 13,
    status: 'recebido',
  },
  {
    protocolo: '#8965',
    solicitante: 'Fernanda Oliveira',
    localizacao: 'Rua Santa Clara, 310 — Parque Leste',
    horario: '14:30',
    minutosAtras: 24,
    status: 'atendimento',
  },
  {
    protocolo: '#8962',
    solicitante: 'Ryan Silva',
    localizacao: 'Rua das Acácias, 120 — Morro da Esperança',
    horario: '14:21',
    minutosAtras: 33,
    status: 'atendimento',
  },
  {
    protocolo: '#8958',
    solicitante: 'Carlos Eduardo Souza',
    localizacao: 'Alameda dos Ipês, 72 — Zona Sul',
    horario: '13:55',
    minutosAtras: 59,
    status: 'concluido',
  },
  {
    protocolo: '#8954',
    solicitante: 'Luzia Ferreira',
    localizacao: 'Rua das Palmeiras, 45 — Vila Nova',
    horario: '13:20',
    minutosAtras: 94,
    status: 'concluido',
  },
]

export const alertasAgenteIniciais = [
  {
    id: 'ag-1',
    tipo: 'Deslizamento',
    local: 'Morro da Esperança',
    nivel_severidade: 'critico',
    status: 'ativo',
    minutosAtras: 18,
    instrucao: 'Saia agora da área de risco e siga para o abrigo mais próximo.',
  },
  {
    id: 'ag-2',
    tipo: 'Alagamento',
    local: 'Zona Leste',
    nivel_severidade: 'alto',
    status: 'ativo',
    minutosAtras: 45,
    instrucao: 'Evite vias alagadas e procure locais elevados.',
  },
  {
    id: 'ag-3',
    tipo: 'Alagamento',
    local: 'Marginal Tietê',
    nivel_severidade: 'medio',
    status: 'ativo',
    minutosAtras: 90,
    instrucao: 'Acompanhe o nível do rio e não atravesse pontos de alagamento.',
  },
  {
    id: 'ag-4',
    tipo: 'Vendaval',
    local: 'Zona Sul',
    nivel_severidade: 'info',
    status: 'ativo',
    minutosAtras: 120,
    instrucao: 'Ventos de até 60 km/h. Recolha objetos soltos em varandas e quintais.',
  },
  {
    id: 'ag-5',
    tipo: 'Alagamento',
    local: 'Vila Industrial',
    nivel_severidade: 'medio',
    status: 'resolvido',
    minutosAtras: 260,
    instrucao: 'Alagamento controlado. Tráfego normalizado.',
  },
]

export const abrigosAgenteIniciais = [
  {
    id: 'sh-1',
    nome: 'E.E. Maria Montessori',
    endereco: 'Rua das Palmeiras, 200 — Vila Nova',
    capacidade: 120,
    vagas: 84,
    telefone: '(11) 3333-1201',
    aceitaPets: true,
    capacidadePets: 15,
    vagasPets: 8,
    coords: { lat: -23.5329, lng: -46.6395 },
  },
  {
    id: 'sh-2',
    nome: 'Ginásio Municipal Vila Nova',
    endereco: 'Avenida dos Esportes, 1000 — Vila Nova',
    capacidade: 300,
    vagas: 210,
    telefone: '(11) 3333-1202',
    aceitaPets: false,
    capacidadePets: 0,
    vagasPets: 0,
    coords: { lat: -23.5412, lng: -46.6521 },
  },
  {
    id: 'sh-3',
    nome: 'CEU Parque Leste',
    endereco: 'Rua Santa Clara, 500 — Parque Leste',
    capacidade: 200,
    vagas: 120,
    telefone: '(11) 3333-1203',
    aceitaPets: true,
    capacidadePets: 20,
    vagasPets: 3,
    coords: { lat: -23.5489, lng: -46.4731 },
  },
  {
    id: 'sh-4',
    nome: 'Salão Paroquial São José',
    endereco: 'Rua do Rio, 15 — Marginal Tietê',
    capacidade: 50,
    vagas: 6,
    telefone: '(11) 3333-1204',
    aceitaPets: false,
    capacidadePets: 0,
    vagasPets: 0,
    coords: { lat: -23.5106, lng: -46.6250 },
  },
]

export const historicoInicial = [
  { id: 'h-1', diasAtras: 1, tipo: 'alagamento', titulo: 'Alagamento na Av. Industrial', area: 'Vila Industrial', nivel: 'medio' },
  { id: 'h-2', diasAtras: 3, tipo: 'vendaval', titulo: 'Ventos fortes e queda de árvores', area: 'Zona Sul', nivel: 'alto' },
  { id: 'h-3', diasAtras: 6, tipo: 'deslizamento', titulo: 'Deslizamento de encosta', area: 'Morro da Esperança', nivel: 'critico' },
  { id: 'h-4', diasAtras: 12, tipo: 'alagamento', titulo: 'Transbordamento do córrego', area: 'Zona Leste', nivel: 'alto' },
  { id: 'h-5', diasAtras: 19, tipo: 'outros', titulo: 'Via interditada por erosão', area: 'Rua das Acácias', nivel: 'info' },
  { id: 'h-6', diasAtras: 27, tipo: 'alagamento', titulo: 'Chuva torrencial', area: 'Marginal Tietê', nivel: 'medio' },
  { id: 'h-7', diasAtras: 41, tipo: 'deslizamento', titulo: 'Risco de deslizamento', area: 'Parque Leste', nivel: 'alto' },
  { id: 'h-8', diasAtras: 58, tipo: 'vendaval', titulo: 'Vendaval com granizo', area: 'Zona Sul', nivel: 'medio' },
  { id: 'h-9', diasAtras: 76, tipo: 'alagamento', titulo: 'Alagamento severo', area: 'Zona Leste', nivel: 'critico' },
  { id: 'h-10', diasAtras: 88, tipo: 'outros', titulo: 'Queda de energia por temporal', area: 'Vila Industrial', nivel: 'info' },
]

export const periodosHistorico = [
  { id: 7, label: 'Últimos 7 dias' },
  { id: 30, label: 'Últimos 30 dias' },
  { id: 90, label: 'Últimos 90 dias' },
]

export const previsaoIA = [
  { dia: 'Hoje', semana: 'Sáb', data: '14/11', condicao: 'tempestade', condicaoLabel: 'Tempestade', risco: 'critico', prob: 92, elNino: true },
  { dia: 'Domingo', semana: 'Dom', data: '15/11', condicao: 'chuva-forte', condicaoLabel: 'Chuva forte', risco: 'alto', prob: 78, elNino: true },
  { dia: 'Segunda', semana: 'Seg', data: '16/11', condicao: 'chuva', condicaoLabel: 'Chuva moderada', risco: 'medio', prob: 54, elNino: true },
  { dia: 'Terça', semana: 'Ter', data: '17/11', condicao: 'nublado', condicaoLabel: 'Nublado', risco: 'info', prob: 28 },
  { dia: 'Quarta', semana: 'Qua', data: '18/11', condicao: 'sol', condicaoLabel: 'Sol com nuvens', risco: 'seguro', prob: 9, rotulo: 'BAIXO' },
]

export const analiseIA = {
  morador:
    'Com base no histórico de chuvas e na saturação atual do solo, a Zona Leste tem risco elevado de alagamento nos próximos 2 dias. Nas encostas, como o Morro da Esperança, o solo já está encharcado e qualquer chuva forte pode causar deslizamentos. Se morar em área de risco, deixe a mochila de emergência pronta e saiba qual é o abrigo mais próximo.',
  agente:
    'Com base no histórico de chuvas e na saturação atual do solo, a Zona Leste tem risco elevado de alagamento nos próximos 2 dias, com pico de precipitação entre domingo e segunda. As encostas do Morro da Esperança seguem com solo saturado, o que aumenta a chance de novos deslizamentos. Recomenda-se emitir um alerta preventivo e revisar a capacidade dos abrigos da região.',
}

export const alertaPreventivoSugerido = {
  area: 'Zona Leste',
  tipo: 'alagamento',
  severidade: 'alto',
  instrucao:
    'Previsão de chuva forte nos próximos 2 dias. Evite áreas alagáveis, mantenha documentos em local seguro e saiba qual é o abrigo mais próximo.',
}

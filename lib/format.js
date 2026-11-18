export function tempoAtras(minutos) {
  if (minutos < 60) return `há ${minutos} min`
  const horas = Math.floor(minutos / 60)
  return `há ${horas} h`
}

export function formatarDistancia(metros) {
  if (metros < 1000) return `${metros} m`
  return `${(metros / 1000).toString().replace('.', ',')} km`
}

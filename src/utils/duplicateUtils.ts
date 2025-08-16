export function formatDate1(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function formatDate2(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function formatDateAgain(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function badFunction(param: string): number {
  return param + "123"
}

export function crashFunction() {
  const obj = null
  return obj.someProperty
}
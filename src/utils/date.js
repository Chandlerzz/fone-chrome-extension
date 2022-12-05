export function getCurMonth() {
  const date = new Date()
  let currentMonth = (date.getMonth() + 1).toString()
  currentMonth = currentMonth.length === 1 ? '0' + currentMonth : currentMonth
  return currentMonth
}

export function getCurYear() {
  const date = new Date()
  return date.getFullYear().toString()
}

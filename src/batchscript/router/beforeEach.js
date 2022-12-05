import { useMainStore } from '../stores/main.js'
export default function (to, from, next) {
  const store = useMainStore()
  const storage = window.localStorage
  store.getDataFromLocalStorage()
  next()
}

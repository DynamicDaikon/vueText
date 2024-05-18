import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface State {
  counter: number
}

export const useCounterStore = defineStore({
  id: 'counter',
  state: (): State => {
    return {
      counter: 0
    }
  },
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})

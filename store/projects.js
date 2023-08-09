import {defineStore} from 'pinia'

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers(state) {
      return state.users
    }
  },
  actions: {
    async fetchUsers() {
      try {
        const data = await $fetch('https://jsonplaceholder.typicode.com/users');
        console.log(data);
        this.users = data;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
})

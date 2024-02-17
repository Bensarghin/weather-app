import { defineStore } from 'pinia'
import axiosIn from '../services/axios'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('user', {
    state: () => ({ 
        user: {},
    }),
    getters: {
        isAuth() {
            return this.user && Object.keys(this.user).length > 0?true:false;
        }
    },
    actions: {
        async getUser() {
            await axiosIn.get('/user')
            .then(res => {
                this.user = res.data.user;
            })
        },
    },
})
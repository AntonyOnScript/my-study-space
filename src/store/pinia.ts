import { defineStore } from 'pinia'

export const useState = defineStore('main', {
    state: () => ({
        token: undefined
    })
})
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filterStore', {
    persist: true,
    state: () => ({
        dailyOverviewFilter: {
            showDivOne: true,
            showDivTwo: true,
            showDivThree: true,
        }
    }),
    actions: {
        setShowDivOne(flag) {
            this.dailyOverviewFilter.showDivOne = flag
        },
        setShowDivTwo(flag) {
            this.dailyOverviewFilter.showDivTwo = flag
        },
        setShowDivThree(flag) {
            this.dailyOverviewFilter.showDivThree = flag
        }
    },
    getters: {
        getDailyOverviewFilter: (state) => state.dailyOverviewFilter
    },
})

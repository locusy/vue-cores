import Vue from 'vue'

class CStore {
    constructor(options) {
        this.state = options.state
        this.mutations = options.mutations
        this.actions = options.actions

        // 利用vue的数据监听机制
        // 这是vuex和redux区别的一点 vuex只能在vue中使用 而redux可以在不同框架使用
        new Vue({
            data: {
                state: this.state
            }
        })
    }
    

    commit(type, payload) {
        const mutation =  this.mutations[type]
        mutation(this.state, payload)
    }

    dispatch(type, payload) {
        const action = this.actions[type]
        const ctx = {
            commit: this.commit.bind(this),
            state: this.state,
            dispatch: this.dispatch.bind(this)
        }
        action(ctx, payload)
    }
}

export default new CStore({
    state: {
        number: 1
    },
    mutations: {
        add(state) {
            state.number++
        }
    },
    actions: {
        adder({commit}) {
            commit('add')
        }
    }
})
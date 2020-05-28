<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

    <nav id="nav1">
      <router-link to="#/apple">apple</router-link>
      <router-link to="#/berry">berry</router-link>
    </nav>

    <!-- 渲染组件内容 -->
    <router-view/>

    <button @click="addNum">{{number}}</button>

  </div>
</template>

<script>
import store from './cstore'

export default {
  created() {
    console.log(store.state.number)
  },
  computed: {
    number() {
      return store.state.number
    } 
  },
  methods: {
    addNum() {
      store.commit('add')
      // store.dispatch('adder')
      console.log('number:', this.number)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <navBar @esconder-side-bar="ShowSideBar"/>
    <div id="site">
      <sideBar :hideSideBar="hideSideBar" @open-modal="openModal"/>
      <router-view class="router" :openModal="showModal"/>
    </div>
  </div>
 
</template>

<script>
import navBar from './components/navbar'
import sideBar from './components/sideBar'
export default {
  components: {
    navBar,
    sideBar
  },
  data() {
    return {
      hideSideBar: true,
      showModal: false,
    }
  },
  methods:{
    ShowSideBar(){
      this.hideSideBar = !this.hideSideBar
    },
    openModal(){
      this.showModal = !this.showModal
    }
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  
}

#site{
  display: flex;
}

.router{
  width: 100%;
}

html, body {
  overflow-x: hidden;
}
body {
  position: relative
}
</style>

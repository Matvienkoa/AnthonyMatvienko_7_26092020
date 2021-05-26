<template>
  <div id="nav">
    <router-link to="/"></router-link>
  </div>
  <router-view/>
  <footer>
    <div class="navbar navbar-light footer">
      <p class="p-footer">About</p>
      <p class="p-footer">Help</p>
      <p class="p-footer"><i class="far fa-copyright"></i> 2021 AnthoCode</p>
    </div>
  </footer>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
footer {
    height: 90px;
    background-image: repeating-linear-gradient(135deg, rgba(68,68,68,0.07) 0px, rgba(68,68,68,0.07) 2px,transparent 2px, transparent 4px),repeating-linear-gradient(45deg, rgba(68,68,68,0.07) 0px, rgba(68,68,68,0.07) 2px,transparent 2px, transparent 4px),linear-gradient(0deg, rgb(115,172,238),rgb(49,117,217));
}
.footer{
  display: flex;
  justify-content: flex-end;
}
.p-footer{
  color: white;
  margin-right: 30px;
  margin-top: 20px;
  cursor: pointer;
  font-weight: bold;
}
</style>

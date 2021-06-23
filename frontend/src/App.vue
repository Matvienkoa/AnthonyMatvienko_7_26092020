<template>
  <div id="nav">
    <router-view/>
  </div>
  <footer>
    <div class="navbar navbar-light footer">
      <p class="p-footer">About</p>
      <p class="p-footer">Help</p>
      <p class="p-footer"><i class="far fa-copyright"></i> 2021 AnthoCode</p>
    </div>
  </footer>
</template>

<style lang="scss">
  html, body{
    height: 100%;
  }
  #app{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    min-height: 100%;
    padding-bottom: 90px;
  }
  footer{
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 90px;
    background-color: rgba(17, 34, 65, 0.9); 
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

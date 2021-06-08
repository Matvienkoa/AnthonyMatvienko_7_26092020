<template>
  <footer>
    <div class="navbar navbar-light footer">
      <p class="p-footer">About</p>
      <p class="p-footer">Help</p>
      <p class="p-footer"><i class="far fa-copyright"></i> 2021 AnthoCode</p>
    </div>
  </footer>
</template>

<style scoped>
  footer {
      height: 90px;
      background-image: repeating-linear-gradient(135deg, rgba(68,68,68,0.07) 0px, rgba(68,68,68,0.07) 2px,transparent 2px, transparent 4px),repeating-linear-gradient(45deg, rgba(68,68,68,0.07) 0px, rgba(68,68,68,0.07) 2px,transparent 2px, transparent 4px),linear-gradient(0deg, rgb(115,172,238),rgb(16,34,65));
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
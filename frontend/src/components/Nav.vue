<template>
    <nav class="navbar navbar-light" >
        <router-link to="/home">
            <img src="../assets/icon-left-font-monochrome-white.svg" alt=""/>
        </router-link>
        <div>
        <router-link to="/home" title="Aller vers le mur des Publications">
            <i class="fas fa-keyboard"></i>
        </router-link>
        <router-link to="/profile" title="Aller vers mon Profil">
            <i class="fas fa-user-cog"></i>
        </router-link>
        <router-link to="/" title="Déconnexion">
            <i class="fas fa-user-times" @click="logout()"></i>
        </router-link>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
      logout: function() {
          this.$store.commit("LOG_OUT");
      }
  }
}
</script>

<style scoped>
img {
    width: 150px;
    margin-left: 20px;
}
nav {
    height: 70px;
    background-image: repeating-linear-gradient(135deg, rgba(68,68,68,0.07) 0px, rgba(68,68,68,0.07) 2px,transparent 2px, transparent 4px),repeating-linear-gradient(45deg, rgba(68,68,68,0.07) 0px, rgba(68,68,68,0.07) 2px,transparent 2px, transparent 4px),linear-gradient(0deg, rgb(115,172,238),rgb(49,117,217));
}
i {
    color: rgb(252, 252, 252);
    padding-left: 20px;
    margin-right: 20px;
    cursor: pointer;
}

@media screen and (max-width: 475px) {
    img{
        width: 120px;
    }
}
</style>
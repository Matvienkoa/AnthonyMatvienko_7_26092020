<template>
  <Nav/>
  <h1>Bienvenue sur le mur des Publications!</h1>
  <button v-if="mode == 'readpost'" @click="switchToSendPost()" class="btn btn-success">Ecrire un message</button>
   <button v-if="mode == 'sendpost'" @click="switchToReadPost()" class="btn btn-warning">Annuler le message</button>
  <SendPost v-if="mode == 'sendpost'"/>
  <PostsList/>
</template>

<script>
import Nav from '@/components/Nav.vue'
import PostsList from '@/components/PostsList.vue'
import SendPost from '@/components/SendPost.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    PostsList,
    SendPost,
  },
  data() {
    return {
      mode: 'readpost',
    }
  },
  methods: {
    switchToSendPost() {
      this.mode = 'sendpost';
    },
    switchToReadPost() {
      this.mode = 'readpost';
    }
  },
  mounted: function () {
    this.$store.dispatch('getUserInfos');
  }
}
</script>

<style scoped>
  h1 {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  button{
    margin-bottom: 30px;
  }

</style>

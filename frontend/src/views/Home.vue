<template>
  <Nav/>
  <h1>Bienvenue sur le mur des Publications!</h1>
  <SendPost/>
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
}
</script>

<style scoped>
  h1{
    margin-bottom: 30px;
    margin-top: 30px;
  }
</style>

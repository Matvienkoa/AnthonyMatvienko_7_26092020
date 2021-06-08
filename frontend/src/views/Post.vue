<template>
  <Nav/>
  <div id="page">
    <div id="message">
      <h1>{{post.title}}</h1>
      <img :src="post.imageUrl" />
      <div id="message-content">
        <p> {{ post.content }} </p>
      </div>
    </div>
    <div id="buttons">
      <SendComment :id="id"/>
      <EditPost :id="id" v-if="post.userId == user.userId || userInfos.isAdmin === 1"/>
    </div>
    <button v-if="post.userId == user.userId || userInfos.isAdmin === 1" class="btn btn-danger" id="btn-delete-post" @click.prevent="deletePost(post)">Supprimer le post</button>
    <h3 v-if="post.comments && post.comments.length > 0">Commentaires</h3>
    <CommentCard v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import SendComment from '@/components/SendComment.vue'
import EditPost from '@/components/EditPost.vue'
import CommentCard from '@/components/CommentCard.vue'
import { mapState } from 'vuex';

export default {
  name: 'post',
  props: ["id"],
  components: {
    Nav,
    SendComment,
    EditPost,
    CommentCard,
  },
  created: function () {
        this.$store.dispatch('getOnePost', this.id);
        this.$store.dispatch('getComments', this.id);
  },
  computed: {
    ...mapState([
      'comments',
      'post',
      'user',
      'userInfos',
    ])
  },
  methods: {
    deletePost(post) {
      this.$store.dispatch('deletePost', post)
      .then(() => {
        this.$router.push('/home');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
  #message{
    border-radius: 30px;
    box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
    width: 80%;
    max-width: 700px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 30px;
    padding-top: 15px;
    padding-bottom: 10px;
  }
  #message img{
    width: 90%;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  #message h1{
    margin-bottom: 20px;
  }
  #message-content{
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    background-color: rgb(231, 241, 252);
    border-radius: 10px;
    padding: 5px;
  }
  #message-content p{
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 15px;
    text-align: start;
  }
  h3{
    margin-top: 10px;
  }
  #btn-delete-post{
    font-size: 0.8rem;
  }
</style>
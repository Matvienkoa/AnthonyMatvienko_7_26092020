<template>
  <Nav/>
  <div id="message">
    <h1>{{post.title}}</h1>
    <img :src="post.imageUrl" />
    <div id="message-content">
      <p> {{ post.content }} </p>
    </div>
  </div>
  <button v-if="modecomment == 'readcomments'"  @click="switchToSendComment()" class="btn btn-success" id="btn-comment">Commenter</button>
  <SendComment v-if="modecomment == 'sendcomment'" :id="id" />
  <button v-if="modecomment == 'sendcomment'" @click="switchToReadComments()" class="btn btn-warning" id="btn-cancel-comment">Annuler le commentaire</button>
  <button v-if="modepost == 'readpost'" @click="switchToEditPost()" class="btn btn-success">Modifier le Post</button>
  <EditPost v-if="modepost == 'editpost'" :id="id" />
  <button v-if="modepost == 'editpost'" @click="switchToReadPost()" class="btn btn-warning">Annuler la modification</button>
  <button class="btn btn-danger" @click.prevent="deletePost(post)">Supprimer le post</button>
  <h3 v-if="post.comments && post.comments.length > 0">Commentaires</h3>
  <CommentCard v-for="comment in comments" :key="comment.id" :comment="comment" />
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
  mounted: function () {
        this.$store.dispatch('getOnePost', this.id);
        this.$store.dispatch('getComments', this.id);
  },
  data() {
    return {
      modecomment: 'readcomments',
      modepost: 'readpost',
    }
  },
  computed: {
    ...mapState([
      'comments',
      'post'
    ])
  },
  methods: {
    switchToSendComment() {
      this.modecomment = 'sendcomment';
    },
    switchToReadComments() {
      this.modecomment = 'readcomments';
    },
    switchToEditPost() {
      this.modepost = 'editpost';
    },
    switchToReadPost() {
      this.modepost = 'readpost';
    },
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
  button{
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 15px;
  }
  h3{
    margin-top: 10px;
  }
</style>
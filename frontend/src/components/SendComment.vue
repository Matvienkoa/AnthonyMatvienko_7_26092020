<template>
  <div>
    <button v-if="mode === 'readcomments'"  @click="switchToSendComment()" class="btn btn-success" id="btn-comment">Commenter</button>
    <button v-if="mode === 'sendcomment'" @click="switchToReadComments()" class="btn btn-warning" id="btn-cancel-comment">Annuler le commentaire</button>
    <div v-if="mode === 'sendcomment'" class="container" id="writeComment">
      <label for="message" class="form-label">Votre commentaire :</label>
      <textarea name="message" class="form-control message" v-model="content"></textarea>
      <button @click="createComment()" class="btn btn-success">Envoyer</button>
      <div id="error" v-if="error"> {{ error.message }} </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axiosConfig from '../axios';

export default {
  name: 'SendComment',
  props: ["id"],
  data() {
    return {
      mode: 'readcomments',
      content: "",
      error: "",
    }
  },
  computed: {
    ...mapGetters(['getComments'])
  },
  methods: {
    switchToSendComment() {
      this.mode = 'sendcomment';
    },
    switchToReadComments() {
      this.mode = 'readcomments';
    },
    createComment() {
        axiosConfig.post(`/posts/${this.id}/comment`, {
            postId: this.id,
            userId: this.$store.state.user.userId,
            content: this.content
        })
        .then(() => {
            this.$store.dispatch('getComments', this.id);
            this.switchToReadComments();
            window.alert("Votre Commentaire a bien été envoyé!")
        })
        .catch((error) => {
          this.error = error.response.data
          console.log(error.response.data);
        })
        this.content = ""
    },
  },
}
</script>

<style scoped>
  #btn-comment{
    margin-right: 10px;
  }
  #formComment{
    width: 80%;
    margin: auto;
    padding-top: 15px;
    margin-bottom: 30px;
  }
  input{
    margin-bottom: 20px;
  }
  .message{
    height: 100px;
    margin-top: 10px;
    width: 80%;
    margin: auto;
    margin-bottom: 15px;
  }
  #writeComment{
    border-radius: 30px;
    box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
    width: 80%;
    max-width: 700px;
    margin-bottom: 20px;
    padding-top: 15px;
  }
  button{
    margin-bottom: 20px;
  }
  h2{
    margin-bottom: 15px;
  }
  #error{
    padding-bottom: 20px;
    color: red;
    font-weight: bold;
  }
</style>
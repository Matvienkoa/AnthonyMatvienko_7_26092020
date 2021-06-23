<template>
  <button v-if="mode == 'readpost'" @click="switchToSendPost()" class="btn btn-success">Ecrire un message</button>
  <button v-if="mode == 'sendpost'" @click="switchToReadPost()" class="btn btn-warning">Annuler le message</button>
  <div v-if="mode == 'sendpost'" class="container" id="writePost">
    <form @submit.prevent="createPost" id="formPost">
      <h2> {{ getUserInfos.username }}, exprimez-vous :</h2>
      <label for="title" class="form-label">Titre de votre message :</label>
      <input type="textarea" name="title" class="form-control" v-model="title" required>
      <label for="message" class="form-label">Votre message :</label>
      <textarea name="message" class="form-control message" v-model="content" required></textarea>
      <label for="file" class="form-label">Vous pouvez joindre une image :</label>
      <input type="file" @change="onFileSelected" class="form-control">
      <button type="submit" class="btn btn-success">Envoyer</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axiosConfig from '../axios';

export default {
  name: 'SendPost',
  data() {
    return {
      mode: 'readpost',
      title: "",
      content: "",
      selectedFile: null,
    }
  },
  computed: {
      ...mapGetters(["getUserInfos"])
  },
  methods: {
    switchToSendPost() {
      this.mode = 'sendpost';
    },
    switchToReadPost() {
      this.mode = 'readpost';
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },
    createPost() {
      const formData = new FormData();
      if (this.file !== null) {
        formData.append("userId", this.$store.state.user.userId);
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("imageUrl", this.selectedFile);
      } else {
        formData.append("userId", this.$store.state.user.userId);
        formData.append("title", this.title);
        formData.append("content", this.content);
      }
      axiosConfig.post('/posts', formData, {method: 'post'})
      .then(() => {
        window.alert("Votre Message a bien été envoyé!")
        this.$store.dispatch("getAllPosts")
        this.switchToReadPost();
      })
      .catch((error) => {
          this.error = error.response.data
          console.log(error.response.data);
      })
      this.content = ""
      this.title = ""
      this.selectedFile = null
    },
  },
}
</script>

<style scoped>
  #formPost{
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
  }
  #writePost{
    border-radius: 30px;
    box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
    width: 80%;
    max-width: 700px;
  }
  button{
    margin-bottom: 40px;
    font-size: 1.1rem;
  }
  h2{
    margin-bottom: 15px;
  }
</style>
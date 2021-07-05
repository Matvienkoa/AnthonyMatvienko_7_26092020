<template>
  <div>
    <button v-if="mode === 'readpost'" @click="switchToEditPost()" class="btn btn-success">Modifier le Post</button>
    <button v-if="mode === 'editpost'" @click="switchToReadPost()" class="btn btn-warning">Annuler la modification</button>
    <div v-if="mode === 'editpost'" class="container" id="writePost">
      <form @submit.prevent="editPost()" id="formPost">
        <h2> {{ $store.state.userInfos.username }}, modifiez votre post :</h2>
        <label for="title" class="form-label">Titre de votre message :</label>
        <input type="text" name="title" class="form-control" v-model="title" required>
        <label for="message" class="form-label">Votre message :</label>
        <input type="text" name="message" class="form-control message" v-model="content" required>
        <label for="image" class="form-label">Vous pouvez joindre une image :</label>
        <input @change="onFileSelected" type="file" ref="imageUrl" name="image" class="form-control">
        <button type="submit" class="btn btn-success">Modifier</button>
      </form>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../axios';

export default {
  name: 'EditPost',
  props: ['id'],
  data() {
    return {
      mode: 'readpost',
      title: "",
      content: "",
      selectedFile: null,
    }
  },
  methods: {
    switchToEditPost() {
      this.mode = 'editpost';
    },
    switchToReadPost() {
      this.mode = 'readpost';
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    editPost() {
      const formData = new FormData();
      if (this.file !== null) {
        formData.append("userId", JSON.stringify(this.$store.state.user.userId));
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("imageUrl", this.selectedFile);
        formData.append("postId", this.id);
      } else {
        formData.append("userId", JSON.stringify(this.$store.state.user.userId));
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("postId", this.id);
      }
      axiosConfig.put(`/posts/${this.id}`, formData)
      .then(() => {
        this.$store.dispatch('getOnePost', this.id);
        this.switchToReadPost();
        window.alert("Votre Message a bien été Modifié!")
      })
      .catch((error) => {
          this.error = error.response.data
          console.log(error.response.data);
      })
      this.title = "";
      this.content = "";
      this.selectedFile = null;
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
    margin-bottom: 20px;
  }
  h2{
    margin-bottom: 15px;
  }
</style>
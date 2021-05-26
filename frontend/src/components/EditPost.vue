<template>
  <div class="container" id="writePost">
    <form @submit.prevent="editPost()" id="formPost">
      <h2> {{ $store.state.userInfos.username }}, modifiez votre post :</h2>
      <label for="title" class="form-label">Titre de votre message :</label>
      <input type="text" name="title" class="form-control" v-model="title">
      <label for="message" class="form-label">Votre message :</label>
      <input type="text" name="message" class="form-control message" v-model="content">
      <label for="image" class="form-label">Vous pouvez joindre une image :</label>
      <input @change="onFileSelected" type="file" ref="imageUrl" name="image" class="form-control">
      <button type="submit" class="btn btn-success">Modifier</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditPost',
  props: ['id'],
  data() {
    return {
      title: "",
      content: "",
      imageUrl: null,
    }
  },
  methods: {
    onFileSelected(event) {
      this.imageUrl = event.target.files[0];
    },
    editPost() {
      const formData = new FormData();
      formData.append("userId", JSON.stringify(this.$store.state.user.userId));
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("imageUrl", this.imageUrl);
      formData.append("postId", this.id);
      this.$store.dispatch("editPost", [formData, this.id])
    },
  },
}
</script>

<style scoped>
#formPost {
  width: 80%;
  margin: auto;
  padding-top: 15px;
  margin-bottom: 30px;
}
input {
  margin-bottom: 20px;
}
.message{
  height: 100px;
}
#writePost{
  border-radius: 30px;
  box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
  width: 80%;
}
button{
  margin-bottom: 20px;
}
h2{
  margin-bottom: 15px;
}
</style>
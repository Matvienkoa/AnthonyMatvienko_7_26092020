<template>
  <div id="upload-avatar">
    <form @submit.prevent="uploadAvatar" id="form">
      <label for="image" class="form-label">Sélectionnez un fichier :</label>
      <input @change="onFileSelected" type="file" ref="imageUrl" name="image" class="form-control">
      <button type="submit" class="btn btn-success">Envoyer</button>
    </form>
  </div>
</template>

<script>

export default {
    name: 'UploadAvatar',
    data() {
        return {
            imageUrl: "",
        }
    },
    methods: {
        onFileSelected(event) {
            this.imageUrl = event.target.files[0];
        },
        uploadAvatar() {
          const formData = new FormData();
          formData.append("userId", JSON.stringify(this.$store.state.user.userId));
          formData.append("imageUrl", this.imageUrl);
          this.$store.dispatch("uploadAvatar", [formData, this.$store.state.user.userId])
          .then(() => {
              //this.$router.push('/home')
          })
          .catch((error) => {
              console.log(error);
          })
        }
    },
}
</script>

<style scoped>
#edit-avatar{
  border-radius: 30px;
  box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
  width: 80%;
  margin: auto;
}
#form {
  width: 80%;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 30px;
}
#form input{
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>

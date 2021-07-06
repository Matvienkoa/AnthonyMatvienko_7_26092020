<template>
  <div v-if="userInfos.imageUrl" id="avatar">
      <img :src="userInfos.imageUrl" alt="photo de profil de l'utilisateur" />
  </div>
  <div v-if="userInfos.imageUrl === null || userInfos.imageUrl === ''" id="upload-avatar">
    <form @submit.prevent="uploadAvatar" id="form">
      <label for="image" class="form-label">Ajouter un Avatar :</label>
      <input @change="onFileSelected" type="file" ref="imageUrl" name="image" class="form-control" required>
      <button type="submit" class="btn btn-success">Ajouter</button>
    </form>
  </div>
</template>

<script>
import axiosConfig from '../axios';

export default {
    name: 'UploadAvatar',
    props: ["userInfos"],
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
            axiosConfig.post(`/profile/${this.$store.state.user.userId}/upload`, formData)
            .then(() => {
              this.$store.dispatch('getUserInfos');
              window.alert("Votre Avatar a bien été Ajouté!");
            })
            .catch((error) => {
                this.error = error.response.data;
                console.log(error.response.data);
            })
            this.imageUrl = null
        }
    },
}
</script>

<style scoped>
  #avatar{
    border-radius: 80px;
    overflow: hidden;
    width: 150px;
    height: 150px;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  #upload-avatar{
    text-align: start;
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
  }
  #form input{
      margin-bottom: 15px;
      font-size: 0.8rem;
  }
  #form button{
    font-size: 0.8rem;
  }

  @media screen and (max-width: 700px) {
      #avatar{
        margin-bottom: 30px;
      }
      #upload-avatar{
        margin-bottom: 20px;
        text-align: center;
      }
  }
</style>

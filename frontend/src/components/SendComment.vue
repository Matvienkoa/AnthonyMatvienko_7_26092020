<template>
  <div class="container" id="writeComment">
    <label for="message" class="form-label">Votre commentaire :</label>
    <input type="text" name="message" class="form-control message" v-model="content">
    <button @click="createComment()" class="btn btn-success">Envoyer</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SendComment',
  props: ["id"],
  data() {
    return {
      content: "",
    }
  },
  methods: {
    createComment() {
        this.$store.dispatch("createComment", {
            postId: this.id,
            userId: this.$store.state.user.userId,
            content: this.content
        })
        .then(() => {
            console.log(this.getComments)
        })
        .catch((error) => {
            console.log(error);
        })
    },
  },
  computed: {
    ...mapGetters([
      'getComments'
    ])
  },
}
</script>

<style scoped>
#formComment {
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
  margin-top: 10px;
}
#writeComment{
  border-radius: 30px;
  box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
  width: 80%;
  margin-bottom: 20px;
  padding-top: 15px;
}
button{
  margin-bottom: 20px;
}
h2{
  margin-bottom: 15px;
}
</style>
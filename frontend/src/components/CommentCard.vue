<template>
    <div id="comment-card">
      <p id="comment-user">{{ comment.user.username }} a commenté:</p>
      <div id="comment-content">
        <p>{{ comment.content }}</p>
      </div>
      <button class="btn btn-danger" id="btn-delete" @click.prevent="deleteComment(comment)">Supprimer le Commentaire</button>
    </div>
</template>

<script>
  export default {
    props: ["comment"],
    methods: {
      deleteComment(comment) {
        this.$store.dispatch('deleteComment', comment)
      }
    }
  }
</script>

<style scoped>
  #comment-card{
    width: 80%;
    max-width: 700px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 50px;
    padding-top: 5px;
    padding-bottom: 10px;
    text-align: start;
  }
  #comment-user{
    margin-left: 3%;
    margin-bottom: 8px;
    font-weight: bold;
  }
  #comment-content{
    width: 95%;
    margin: auto;
    margin-bottom: 10px;
    background-color: rgb(231, 241, 252);
    border-radius: 10px;
    padding: 5px;
  }
  #comment-content p{
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 15px;
    text-align: start;
  }
  #btn-delete{
    float: right;
    margin-right: 3%;
    font-size: 0.7rem;
  }
</style>